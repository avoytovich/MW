import React from 'react';
import { useParams } from 'react-router-dom';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import api from '../../api';
import localization from '../../localization';
import useCustomerDetailData from '../../services/useData/useCustomerDetailData';
import {
  formatBeforeSanding,
  checkLabelDuplicate,
  checkExistingLabelsUrl,
} from './utils';
import parentPaths from '../../services/paths';

import CustomerDetailsView from './CustomerDetailsView';

const CustomerDetailScreen = () => {
  const { id } = useParams();

  const {
    isLoading,
    customerData,
    currentCustomer,
    setCurrentCustomer,
    hasChanges,
    setUpdate,
    selectOptions,
  } = useCustomerDetailData(id);

  const validation = () => {
    if (checkExistingLabelsUrl(currentCustomer?.assets)) {
      if (!checkLabelDuplicate(currentCustomer?.assets)) {
        return false;
      }
    }
    return true;
  };

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={customerData?.name || `${localization.t('general.new')} ${localization.t(
        'labels.customer',
      )}`}
      saveIsDisabled={validation()}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.customers}
      curData={currentCustomer}
      addFunc={api.addCustomerById}
      updateFunc={api.updateCustomerById}
      beforeSend={formatBeforeSanding}
      setUpdate={setUpdate}
    >
      <CustomerDetailsView
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
        selectOptions={selectOptions}
        id={id}
      />
    </DetailPageWrapper>
  );
};

export default CustomerDetailScreen;
