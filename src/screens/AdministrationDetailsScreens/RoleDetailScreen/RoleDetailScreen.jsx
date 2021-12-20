import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  formattingForSending,
} from './utils';
import parentPaths from '../../../services/paths';
import useRoleDetailsData from '../../../services/useData/useRoleDetailsData';
import localization from '../../../localization';

import api from '../../../api';
import RoleDetailView from './RoleDetailView';
import DetailPageWrapper from '../../../components/utils/DetailPageWrapper';

const RoleDetailScreen = () => {
  const { id } = useParams();
  const [curTab, setCurTab] = useState(0);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    hasChanges,
    setUpdate,
    curRole,
    setCurRole,
    selectOptions,
    role,
    isLoading,
  } = useRoleDetailsData(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={role?.name || `${localization.t('general.new')} ${localization.t(
        'labels.role',
      )}`}
      saveIsDisabled={!curRole?.name}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.userroles.roles}
      curData={curRole}
      addFunc={api.addNewRole}
      updateFunc={api.updateRoleById}
      beforeSend={formattingForSending}
      setUpdate={setUpdate}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: ['general', 'clearances'],
      }}
    >
      <RoleDetailView
        curRole={curRole}
        setCurRole={setCurRole}
        selectOptions={selectOptions}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default RoleDetailScreen;
