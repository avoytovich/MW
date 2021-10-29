// ToDo: consider making a common layout for such type of settings screens
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fromArrayToObject } from './utils';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import localization from '../../localization';
import useDiscountDetails from '../../services/useData/useDiscountDetails';
import parentPaths from '../../services/paths';
import DiscountDetailsView from './DiscountDetailsView';

const DiscountDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const { id } = useParams();

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
    const res = { ...curDiscount };
    res.thresholds = fromArrayToObject(curDiscount.thresholds, 'key');
    res.localizedLabels = fromArrayToObject(curDiscount.localizedLabels, 'key');
    if (amountType === 'byCurrency') {
      res.amountByCurrency = fromArrayToObject(curDiscount.amountByCurrency, 'key');
      delete res.discountRate;
    } else {
      res.discountRate = curDiscount.discountRate / 100;
      delete res.amountByCurrency;
    }
    if (curDiscount.model === 'COUPON') {
      res.codes = fromArrayToObject(curDiscount.codes);
    } else {
      delete res.codes;
    }
    return res;
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={discount?.name || `${localization.t('general.new')} ${localization.t(
        'general.discount',
      )}`}
      saveIsDisabled={!curDiscount?.name}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.discountrules}
      curData={curDiscount}
      addFunc={api.addNewDiscount}
      updateFunc={api.updateDiscountById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
    >
      <DiscountDetailsView
        curDiscount={curDiscount}
        setCurDiscount={setCurDiscount}
        discount={discount}
        setAmountType={setAmountType}
        amountType={amountType}
        selectOptions={selectOptions}
      />
    </DetailPageWrapper>
  );
};

export default DiscountDetailsScreen;
