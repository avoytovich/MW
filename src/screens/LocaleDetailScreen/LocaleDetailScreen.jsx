/* eslint-disable no-confusing-arrow */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import localization from '../../localization';
import useLocaleDetail from './useLocaleDetail';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import LocaleDetailScreenView from './LocaleDetailScreenView';
import api from '../../api';

const LocaleDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    isLoading,
    localeData,
    curLocale,
    setCurLocale,
    hasChanges,
    setUpdate,
  } = useLocaleDetail(id, nxState);

  const validate = () => curLocale ? Object.keys(curLocale).find((it) => curLocale[it] === '') : false;

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={localeData?.label || `${localization.t('general.new')} ${localization.t(
        'labels.locale',
      )}`}
      saveIsDisabled={validate()}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.referentialManager.localesTab}
      curData={curLocale}
      addFunc={api.addLocale}
      updateFunc={api.updateLocaleById}
      setUpdate={setUpdate}
    >
      <LocaleDetailScreenView
        curLocale={curLocale}
        setCurLocale={setCurLocale}
      />
    </DetailPageWrapper>
  );
};

export default LocaleDetailScreen;
