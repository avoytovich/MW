import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useMetaRoleDetailData from '../../../services/useData/useMetaRoleDetailData';

import parentPaths from '../../../services/paths';
import MetaRolesDetailsView from './MetaRolesDetailsView';
import localization from '../../../localization';
import api from '../../../api';

import DetailPageWrapper from '../../../components/utils/DetailPageWrapper';

const MetaRoleDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    curMetaRole,
    setUpdate,
    metaRole,
    hasChanges,
    setCurMetaRole,
    selectOptions,
    isLoading,
  } = useMetaRoleDetailData(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={metaRole?.name || `${localization.t('general.new')} ${localization.t(
        'labels.metaRole',
      )}`}
      saveIsDisabled={!curMetaRole?.name}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.userroles.metaRoles}
      curData={curMetaRole}
      addFunc={api.addNewMetaRole}
      updateFunc={api.updateMetaRoleById}
      beforeSend={(data) => data}
      setUpdate={setUpdate}
    >
      <MetaRolesDetailsView
        curMetaRole={curMetaRole}
        setCurMetaRole={setCurMetaRole}
        selectOptions={selectOptions}
      />
    </DetailPageWrapper>
  );
};

export default MetaRoleDetailScreen;
