import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import localization from '../../localization';
import useRealmsDetails from '../../services/useData/useRealmsDetails';
import parentPaths from '../../services/paths';
import AuthenticationRealmDetailsView from './AuthenticationRealmDetailsView';

const AuthenticationRealmDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const { id } = useParams();

  const {
    isLoading,
    realms,
    setRealms,
    curRealm,
    hasChanges,
    setCurRealm,
    setUpdate,
    selectOptions,
  } = useRealmsDetails(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={`${localization.t('labels.realm')} ${curRealm?.id}`}
      saveIsDisabled={!curRealm?.id}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.realms}
      curData={curRealm}
      updateFunc={api.updateRealmsById}
      setUpdate={setUpdate}
      noTabsMargin
    >
      <AuthenticationRealmDetailsView
        currentRealm={curRealm}
        setCurrentRealm={setCurRealm}
        selectOptions={selectOptions}
        id={id}
        realms={realms}
        setRealms={setRealms}
      />
    </DetailPageWrapper>
  );
};

export default AuthenticationRealmDetailsScreen;
