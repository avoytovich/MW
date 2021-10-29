import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import parentPaths from '../../services/paths';

import JsonEditorLayout from '../../layouts/JsonEditorLayout';

import localization from '../../localization';
import api from '../../api';

const initData = {
  name: '',
  data: {
    layouts: {},
    pages: [],
    steps: [],
  },
};
const LayoutDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [hasChanges, setChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  const [layoutData, setLayoutData] = useState(null);

  const [currentLayout, setCurrentLayout] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const fetchData = id !== 'add'
      ? api.getLayoutById(id)
      : Promise.resolve({
        data: {
          ...initData,
          customerId: nxState?.selectedCustomer?.id,
        },
      });

    fetchData.then(({ data }) => {
      if (!isCancelled) {
        setLayoutData(data);
        setCurrentLayout(data);
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
    setChanges(JSON.stringify(currentLayout) !== JSON.stringify(layoutData));

    return () => setChanges(false);
  }, [currentLayout, layoutData]);


  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={layoutData?.name || `${localization.t('general.new')} ${localization.t(
        'general.layout',
      )}`}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.checkoutpagebuilder.layoutsTab}
      curData={currentLayout}
      addFunc={api.addNewLayout}
      updateFunc={api.updateLayoutById}
      beforeSend={(data) => data}
      setUpdate={setUpdate}
    >
      <JsonEditorLayout
        customer={currentCustomer}
        currentData={currentLayout}
        setCurrentData={setCurrentLayout}
        staticData={layoutData}
        title='Layout Data'
      />
    </DetailPageWrapper>
  );
};

export default LayoutDetailsScreen;
