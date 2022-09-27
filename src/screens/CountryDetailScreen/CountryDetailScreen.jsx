/* eslint-disable no-confusing-arrow */

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import localization from '../../localization';
import useCountryDetail from './useCountryDetail';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import CountryDetailScreenView from './CountryDetailScreenView';
import api from '../../api';

const CountryDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    isLoading,
    countryData,
    curCountry,
    setCurCountry,
    hasChanges,
    setUpdate,
  } = useCountryDetail(id, nxState);

  const validate = () => curCountry ? Object.keys(curCountry).find((it) => curCountry[it] === '') : false;

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={countryData?.name || `${localization.t('general.new')} ${localization.t(
        'labels.country',
      )}`}
      saveIsDisabled={validate()}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.referentials.countriesTab}
      curData={curCountry}
      addFunc={api.addCountry}
      updateFunc={api.updateCountryById}
      setUpdate={setUpdate}
    >
      <CountryDetailScreenView
        curCountry={curCountry}
        setCurCountry={setCurCountry}
      />
    </DetailPageWrapper>
  );
};

export default CountryDetailScreen;
