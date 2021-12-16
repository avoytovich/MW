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
  const [jsonIsValid, setJsonIsValid] = useState(true);

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
        setLayoutData({ ...data, data: JSON.stringify(data.data, 0, 4) });
        setCurrentLayout({ ...data, data: JSON.stringify(data.data, 0, 4) });
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

  const beforeSend = (curData) => {
    const data = JSON.parse(curData.data);
    return ({ ...curData, data });
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={layoutData?.name || `${localization.t('general.new')} ${localization.t(
        'general.layout',
      )}`}
      saveIsDisabled={!jsonIsValid}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.checkoutpagebuilder.layoutsTab}
      curData={currentLayout}
      addFunc={api.addNewLayout}
      updateFunc={api.updateLayoutById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
    >
      <JsonEditorLayout
        customer={currentCustomer}
        currentData={currentLayout}
        setCurrentData={setCurrentLayout}
        staticData={layoutData}
        title='Layout Data'
        jsonKey='data'
        jsonIsValid={jsonIsValid}
        setJsonIsValid={setJsonIsValid}
        additionalFields
      />
    </DetailPageWrapper>
  );
};

export default LayoutDetailsScreen;
