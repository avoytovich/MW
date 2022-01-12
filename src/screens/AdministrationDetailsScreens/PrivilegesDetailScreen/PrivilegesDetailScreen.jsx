import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PrivilegesDetailsView from './PrivilegesDetailsView';
import DetailPageWrapper from '../../../components/utils/DetailPageWrapper';
import parentPaths from '../../../services/paths';
import usePrivilegeDetailsData from './usePrivilegeDetailsData';
import localization from '../../../localization';

const PrivilegesDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    hasChanges,
    setUpdate,
    curPrivilege,
    setCurPrivilege,
    privilege,
    isLoading,
  } = usePrivilegeDetailsData(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={privilege?.serviceName || `${localization.t('general.new')} ${localization.t(
        'labels.privilege',
      )}`}
      saveIsDisabled={!curPrivilege?.serviceName}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.userroles.privileges}
      curData={curPrivilege}
      updateFunc={null}
      beforeSend={(data) => data}
      setUpdate={setUpdate}
      noTabsMargin
    >
      <PrivilegesDetailsView
        curPrivilege={curPrivilege}
        privilegeData={privilege}
        id={id}
        setCurPrivilege={setCurPrivilege}
      />
    </DetailPageWrapper>
  );
};

export default PrivilegesDetailScreen;
