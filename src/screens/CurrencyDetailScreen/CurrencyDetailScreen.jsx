/* eslint-disable no-confusing-arrow */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import localization from '../../localization';
import useCurrencyDetail from './useCurrencyDetail';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import CurrencyDetailScreenView from './CurrencyDetailScreenView';
import api from '../../api';

const CurrencyDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    isLoading,
    currencyData,
    curCurrency,
    setCurCurrency,
    hasChanges,
    setUpdate,
  } = useCurrencyDetail(id, nxState);

  const validate = () => curCurrency ? Object.keys(curCurrency).find((it) => curCurrency[it] === '') : false;

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={currencyData?.name || `${localization.t('general.new')} ${localization.t(
        'labels.currency',
      )}`}
      saveIsDisabled={validate()}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.referentials.currenciesTab}
      curData={curCurrency}
      addFunc={api.addCurrency}
      updateFunc={api.updateCurrencyById}
      setUpdate={setUpdate}
    >
      <CurrencyDetailScreenView
        curCurrency={curCurrency}
        setCurCurrency={setCurCurrency}
      />
    </DetailPageWrapper>
  );
};

export default CurrencyDetailScreen;
