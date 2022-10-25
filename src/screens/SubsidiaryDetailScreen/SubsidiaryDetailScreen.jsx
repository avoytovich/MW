/* eslint-disable no-confusing-arrow */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import localization from '../../localization';
import useSubsidiaryDetail from './useSubsidiaryDetail';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import SubsidiaryDetailScreenView from './SubsidiaryDetailScreenView';
import api from '../../api';
import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';

const SubsidiaryDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    isLoading,
    subsidiaryData,
    curSubsidiary,
    setCurSubsidiary,
    hasChanges,
    setUpdate,
  } = useSubsidiaryDetail(id, nxState);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={subsidiaryData?.name || `${localization.t('general.new')} ${localization.t(
        'labels.subsidiary',
      )}`}
      saveIsDisabled={!curSubsidiary?.name || curSubsidiary?.subsidiaryId === ''
        || !curSubsidiary?.legalName}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.subsidiaryManager.subsidiariesTab}
      curData={curSubsidiary}
      beforeSend={removeEmptyPropsInObject}
      addFunc={api.addSubsidiary}
      updateFunc={api.updateSubsidiaryById}
      setUpdate={setUpdate}
    >
      <SubsidiaryDetailScreenView
        curSubsidiary={curSubsidiary}
        setCurSubsidiary={setCurSubsidiary}
      />
    </DetailPageWrapper>
  );
};

export default SubsidiaryDetailScreen;
