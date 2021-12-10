/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import localization from '../../localization';
import useInvoiceTranslationsDetail from './useInvoiceTranslationsDetail';

import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import InvoiceTranslationsView from './InvoiceTranslationsView';

const InvoiceTranslationsDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [jsonIsValid, setJsonIsValid] = useState(true);

  const {
    setUpdate,
    curInvoiceTranslation,
    setCurInvoiceTranslation,
    isLoading,
    hasChanges,
    invoiceTranslation,
    customerName,
  } = useInvoiceTranslationsDetail(id, nxState);

  const beforeSend = (curData) => {
    const data = JSON.parse(curData.data);
    return ({ ...curData, data });
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={invoiceTranslation?.name || `${localization.t('general.new')} ${localization.t(
        'labels.invoiceTranslation',
      )}`}
      saveIsDisabled={!curInvoiceTranslation?.name || !jsonIsValid}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.localization.invoiceTranslationsTab}
      curData={curInvoiceTranslation}
      addFunc={api.addInvoiceTranslation}
      updateFunc={api.updateInvoiceTranslationById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
    >
      <InvoiceTranslationsView
        customerName={customerName}
        curInvoiceTranslation={curInvoiceTranslation}
        setCurInvoiceTranslation={setCurInvoiceTranslation}
        jsonIsValid={jsonIsValid}
        setJsonIsValid={setJsonIsValid}
      />
    </DetailPageWrapper>
  );
};

export default InvoiceTranslationsDetailScreen;
