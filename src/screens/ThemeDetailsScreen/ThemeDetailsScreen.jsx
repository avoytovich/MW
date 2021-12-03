import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ThemeLayout from './ThemeLayout';
import localization from '../../localization';
import api from '../../api';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

const initData = {
  data: '',
  name: '',
};

const ThemeDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const { id } = useParams();
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setChanges] = useState(false);

  const [themeData, setThemeData] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const fetchData = id !== 'add'
      ? api.getThemeById(id)
      : Promise.resolve({
        data: {
          ...initData,
          customerId: nxState?.selectedCustomer?.id,
        },
      });

    fetchData.then(({ data }) => {
      if (!isCancelled) {
        setThemeData(data);
        setCurrentTheme(data);
      }
      Promise.allSettled([
        api.getCustomerById(data.customerId),
      ]).then(([customer]) => {
        setCurrentCustomer(customer?.value?.data.name || '');
      });
    }).finally(() => setLoading(false));

    return () => {
      isCancelled = true;
    };
  }, [update]);

  useEffect(() => {
    setChanges(JSON.stringify(currentTheme) !== JSON.stringify(themeData));

    return () => setChanges(false);
  }, [currentTheme, themeData]);

  return (
    <DetailPageWrapper
      isLoading={isLoading}
      saveIsDisabled={!currentTheme?.name || !currentTheme?.data}
      hasChanges={hasChanges}
      nxState={nxState}
      id={id}
      name={themeData?.name || `${localization.t('general.new')} ${localization.t(
        'general.theme',
      )}`}
      curParentPath={parentPaths.checkoutpagebuilder.themesTab}
      curData={currentTheme}
      addFunc={api.addNewTheme}
      updateFunc={api.updateThemeById}
      beforeSend={(data) => data}
      setUpdate={setUpdate}
    >
      <ThemeLayout
        customer={nxState?.selectedCustomer?.name}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
    </DetailPageWrapper>
  );
};

export default ThemeDetailsScreen;
