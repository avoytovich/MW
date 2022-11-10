// ToDo: consider making a common layout for such type of settings screens
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useValidation from '../../services/useValidation/useValidation';

import { fromArrayToObject, tabsLabels, formatCodesToObject } from './utils';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import localization from '../../localization';
import useDiscountDetails from '../../services/useData/useDiscountDetails';
import parentPaths from '../../services/paths';
import DiscountDetailsView from './DiscountDetailsView';
import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';

const DiscountDetailsScreen = () => {
  const [curTab, setCurTab] = useState(0);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const { id } = useParams();
  const [localizedErrors, setLocalizedErrors] = useState({});

  const {
    isLoading,
    discount,
    curDiscount,
    hasChanges,
    amountType,
    setCurDiscount,
    setAmountType,
    selectOptions,
    setUpdate,
  } = useDiscountDetails(id, nxState);

  const {
    errors,
    handleSetErrors,
    setErrors,
  } = useValidation(curTab, tabsLabels, curDiscount, 'discountrules');

  const beforeSend = () => {
    const localizedLabels = {};

    Object.keys(curDiscount.localizedLabels)?.forEach((lab) => {
      localizedLabels[lab] = curDiscount.localizedLabels[lab].discountLabel;
    });
    const res = { ...curDiscount, localizedLabels };
    res.thresholds = fromArrayToObject(curDiscount.thresholds, 'key');
    if (amountType === 'byCurrency') {
      res.amountByCurrency = fromArrayToObject(curDiscount.amountByCurrency, 'key');
      delete res.discountRate;
    } else {
      res.discountRate = curDiscount.discountRate / 100;
      delete res.amountByCurrency;
    }
    if (curDiscount.model === 'COUPON') {
      res.codes = formatCodesToObject(curDiscount.codes);
    } else {
      delete res.codes;
    }
    if (curDiscount.endDate) {
      res.endDate = moment.utc(curDiscount.endDate).utc().format();
    }
    if (res.productIds.length) {
      res.productIds = [...curDiscount.productIds]
        .map((item) => item.id);
    }
    if (res.parentProductIds.length) {
      res.parentProductIds = [...curDiscount.parentProductIds]
        .map((item) => item.id);
    }
    if (res.publisherRefIds.length) {
      res.publisherRefIds = [...curDiscount.publisherRefIds]
        .map((item) => item.id);
    }
    if (res.subscriptionSubSources == 'RENEWAL' || res.subscriptionSubSources == 'TRIAL_CONVERSION') {
      delete res.subscriptionId;
    }
    if (!res.sources.includes('SUBSCRIPTION')) {
      delete res.subscriptionSubSources;
      delete res.subscriptionId;
    }
    if (res.subscriptionId) {
      res.subscriptionSubSources = [];
    }
    return removeEmptyPropsInObject(res);
  };
  useEffect(() => {
    if (curDiscount?.model === 'SINGLE_USE_CODE' && !curDiscount?.maxUsages) {
      setErrors({
        ...errors, cappingAndLimits: ['maxUsages'],
      });
    } else if (errors.cappingAndLimits?.includes('maxUsages')) {
      const newErrors = { ...errors };
      const cappingAndLimits = errors?.cappingAndLimits.filter((it) => it !== 'maxUsages');
      if (!cappingAndLimits.length) {
        delete newErrors.cappingAndLimits;
      } else {
        newErrors.cappingAndLimits = cappingAndLimits;
      }
      setErrors(newErrors)
    }
  }, [curDiscount])

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={discount?.name || `${localization.t('general.new')} ${localization.t(
        'general.discount',
      )}`}
      saveIsDisabled={!curDiscount?.name
        || (!curDiscount?.subscriptionId && curDiscount?.subscriptionSubSources?.includes('SUBSCRIPTIONID') && curDiscount.sources?.includes('SUBSCRIPTION'))
        || (curDiscount?.codes.length > 1 && curDiscount?.codes[0].value === '')
        || (curDiscount?.model === 'SINGLE_USE_CODE' && !curDiscount?.maxUsages)
        || Object.keys(localizedErrors).length}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.discountrules}
      curData={curDiscount}
      addFunc={api.addNewDiscount}
      updateFunc={api.updateDiscountById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
      noTabsMargin
      tabs={{
        scope: 'discountrules',
        tabLabels: tabsLabels,
        curTab,
        setCurTab,
      }}
      errors={errors}
    >
      <DiscountDetailsView
        localizedErrors={localizedErrors}
        setLocalizedErrors={setLocalizedErrors}
        curDiscount={curDiscount}
        setCurDiscount={setCurDiscount}
        discount={discount}
        setAmountType={setAmountType}
        amountType={amountType}
        selectOptions={selectOptions}
        curTab={curTab}
        errors={errors}
        setErrors={handleSetErrors}
      />
    </DetailPageWrapper>
  );
};

export default DiscountDetailsScreen;
