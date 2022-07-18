// ToDo: consider making a common layout for such type of settings screens
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

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
    return removeEmptyPropsInObject(res);
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={discount?.name || `${localization.t('general.new')} ${localization.t(
        'general.discount',
      )}`}
      saveIsDisabled={!curDiscount?.name || (curDiscount?.codes.length > 1 && curDiscount?.codes[0].value === '')
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
        tabLabels: tabsLabels,
        curTab,
        setCurTab,
      }}
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
      />
    </DetailPageWrapper>
  );
};

export default DiscountDetailsScreen;
