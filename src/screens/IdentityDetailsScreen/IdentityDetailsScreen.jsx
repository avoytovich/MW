import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import localization from '../../localization';
import useIdentityDetails from '../../services/useData/useIdentityDetails';
import api from '../../api';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import IdentityDetailsView from './IdentityDetailsView';

const IdentityDetailsScreen = () => {
  const generalRef = useRef(null);
  const identificationRef = useRef(null);
  const permissionsRef = useRef(null);
  const emailsRef = useRef(null);

  const sectionRefs = [
    { section: 'general', ref: generalRef },
    { section: 'identification', ref: identificationRef },
    { section: 'permissions', ref: permissionsRef },
    { section: 'emails', ref: emailsRef },
  ];
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [selectedSection, setSelectedSection] = useState(sectionRefs[0].section);

  const {
    setUpdate,
    curIdentity,
    isLoading,
    identityType,
    setIdentityType,
    setCurIdentity,
    hasChanges,
    selectOptions,
  } = useIdentityDetails(id, nxState);

  const addSecretKey = () => {
    api.addNewSecretKeyToIdentity(id).then(() => {
      toast(localization.t('general.keyHasBeenAdded'));
      setUpdate((u) => u + 1);
    });
  };
  const removeSecretKey = (secret) => api.deleteIdentitySecretKeyById(id, secret).then(() => {
    toast(localization.t('general.keyHasBeenRemoved'));
    setUpdate((u) => u + 1);
  });
  const beforeSend = () => {
    const filterBlankKeys = { ...curIdentity };
    Object.keys(filterBlankKeys).forEach((key) => {
      if (!filterBlankKeys[key]) {
        delete filterBlankKeys[key];
      }
    });
    return filterBlankKeys;
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={curIdentity?.firstName ? `${curIdentity?.firstName} ${curIdentity?.lastName}` : `${localization.t('general.new')} ${localization.t(
        'labels.user',
      )}`}
      saveIsDisabled={!curIdentity?.email
        || (!curIdentity?.userName && !curIdentity?.clientId)}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.users}
      curData={curIdentity}
      addFunc={api.addNewIdentity}
      updateFunc={api.updateIdentityById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
      sectionRefs={sectionRefs}
      selectedSection={selectedSection}
      setSelectedSection={setSelectedSection}

    >
      <IdentityDetailsView
        selectedSection={selectedSection}
        sectionRefs={sectionRefs}
        id={id}
        curIdentity={curIdentity}
        identityType={identityType}
        setIdentityType={setIdentityType}
        setCurIdentity={setCurIdentity}
        addSecretKey={addSecretKey}
        removeSecretKey={removeSecretKey}
        selectOptions={selectOptions}
        setSelectedSection={setSelectedSection}
      />
    </DetailPageWrapper>
  );
};

export default IdentityDetailsScreen;
