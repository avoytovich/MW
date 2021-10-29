import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import localization from '../../localization';
import api from '../../api';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import FontLayout from './FontLayout';

const initData = {
  data: { font: '', fontFamily: '' },
  name: '',
};

const FontDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const { id } = useParams();
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [update, setUpdate] = useState(0);
  const [hasChanges, setChanges] = useState(false);

  const [fontData, setFontData] = useState(null);
  const [currentFont, setCurrentFont] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const fetchData = id !== 'add'
      ? api.getFontById(id)
      : Promise.resolve({
        data: {
          ...initData,
          customerId: nxState?.selectedCustomer?.id,
        },
      });

    fetchData.then(({ data }) => {
      if (!isCancelled) {
        setFontData(data);
        setCurrentFont(data);
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
    setChanges(JSON.stringify(currentFont) !== JSON.stringify(fontData));

    return () => setChanges(false);
  }, [currentFont, fontData]);

  return (
    <DetailPageWrapper
      isLoading={isLoading}
      saveIsDisabled={currentFont?.data?.font === ''
        || currentFont?.data?.fontFamily === ''
        || currentFont?.name === ''}
      hasChanges={hasChanges}
      nxState={nxState}
      id={id}
      name={fontData?.name || `${localization.t('general.new')} ${localization.t(
        'general.font',
      )}`}
      curParentPath={parentPaths.checkoutpagebuilder.fontsTab}
      curData={currentFont}
      addFunc={api.addNewFont}
      updateFunc={api.updateFontById}
      beforeSend={(data) => data}
      setUpdate={setUpdate}
    >
      <FontLayout
        customer={currentCustomer}
        currentFont={currentFont}
        setCurrentFont={setCurrentFont}
      />
    </DetailPageWrapper>
  );
};

export default FontDetailsScreen;
