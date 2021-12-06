/* eslint-disable consistent-return */
import React from 'react';
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

  const {
    setUpdate,
    cuInvoiceTranslation,
    setCurInvoiceTranslation,
    isLoading,
    hasChanges,
    invoiceTranslation,
    customerName,
  } = useInvoiceTranslationsDetail(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={invoiceTranslation?.name || `${localization.t('general.new')} ${localization.t(
        'labels.invoiceTranslation',
      )}`}
      saveIsDisabled={!cuInvoiceTranslation?.name}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.localization.invoiceTranslationsTab}
      curData={cuInvoiceTranslation}
      addFunc={api.addInvoiceTranslation}
      updateFunc={api.updateInvoiceTranslationById}
      beforeSend={null}
      setUpdate={setUpdate}
    >
      <InvoiceTranslationsView
        customerName={customerName}
        cuInvoiceTranslation={cuInvoiceTranslation}
        setCurInvoiceTranslation={setCurInvoiceTranslation}
      />
    </DetailPageWrapper>
  );
};

export default InvoiceTranslationsDetailScreen;
