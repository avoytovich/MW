import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import JsonEditorLayout from '../../layouts/JsonEditorLayout';

import localization from '../../localization';
import api from '../../api';
import parentPaths from '../../services/paths';

const TranslationDetailScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [hasChanges, setChanges] = useState(false);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [update, setUpdate] = useState(0);

  const [translationData, setTranslationData] = useState(null);

  const [currentTranslation, setCurrentTranslation] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [jsonIsValid, setJsonIsValid] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const fetchData = id !== 'add'
      ? api.getTranslationById(id)
      : Promise.resolve({
        data: {
          name: '',
          data: {},
          customerId: nxState?.selectedCustomer?.id,
        },
      });
    fetchData.then(({ data }) => {
      if (!isCancelled) {
        setTranslationData({ ...data, data: JSON.stringify(data.data, 0, 4) });
        setCurrentTranslation({ ...data, data: JSON.stringify(data.data, 0, 4) });
        setLoading(false);
      }
      Promise.allSettled([api.getCustomerById(data.customerId)]).then(([customer]) => {
        setCurrentCustomer(customer?.value?.data?.name || '');
      });
    }).catch(() => setLoading(false));

    return () => {
      isCancelled = true;
    };
  }, [update]);

  useEffect(() => {
    setChanges(JSON.stringify(currentTranslation) !== JSON.stringify(translationData));

    return () => setChanges(false);
  }, [currentTranslation, translationData]);

  const beforeSend = (curData) => {
    const data = JSON.parse(curData.data);
    return ({ ...curData, data });
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={translationData?.name || `${localization.t('general.new')} ${localization.t(
        'general.translation',
      )}`}
      saveIsDisabled={!jsonIsValid}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.localization.translationsTab}
      curData={currentTranslation}
      addFunc={api.addNewTranslation}
      updateFunc={api.updateTranslationById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
      noTabsMargin
    >
      <JsonEditorLayout
        customer={currentCustomer}
        hasChanges={hasChanges}
        currentData={currentTranslation}
        setCurrentData={setCurrentTranslation}
        staticData={translationData}
        title='Translations JSON'
        jsonKey='data'
        jsonIsValid={jsonIsValid}
        setJsonIsValid={setJsonIsValid}
      />
    </DetailPageWrapper>
  );
};

export default TranslationDetailScreen;
