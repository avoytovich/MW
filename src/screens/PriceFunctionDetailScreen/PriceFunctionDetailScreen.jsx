/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import localization from '../../localization';
import usePriceFunctionDetail from './usePriceFunctionDetail';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import PriceFunctionView from './PriceFunctionView';
import api from '../../api';
import { beforeSend } from './utils';

const PriceFunctionDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [errorMessages, setErrorMessages] = useState({});

  const {
    setUpdate,
    curPriceFunction,
    setCurPriceFunction,
    isLoading,
    hasChanges,
    priceFunction,
    curParameters,
    setCurParameters,
  } = usePriceFunctionDetail(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={priceFunction?.name || `${localization.t('general.new')} ${localization.t(
        'labels.priceFunction',
      )}`}
      saveIsDisabled={!curPriceFunction?.name
        || Object.keys(errorMessages).length > 0
        || !curPriceFunction?.expression}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.pricemodels.pricefunctionsTab}
      curData={curPriceFunction}
      addFunc={api.addPriceFunction}
      updateFunc={api.updatePriceFunction}
      beforeSend={(data) => beforeSend(data, curParameters)}
      setUpdate={setUpdate}
    >
      <PriceFunctionView
        priceFunction={priceFunction}
        setCurPriceFunction={setCurPriceFunction}
        curPriceFunction={curPriceFunction}
        setCurParameters={setCurParameters}
        curParameters={curParameters}
        errorMessages={errorMessages}
        setErrorMessages={setErrorMessages}
      />
    </DetailPageWrapper>
  );
};

export default PriceFunctionDetailScreen;
