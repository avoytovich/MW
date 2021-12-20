import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EndUsersGroupsDetailsView from './EndUsersGroupsDetailsView';
import localization from '../../localization';
import parentPaths from '../../services/paths';
import api from '../../api';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import './endUsersGroupsDetailsScreen.scss';

const EndUsersGroupsDetailsScreen = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [curData, setCurData] = useState(null);
  const [initData, setInitData] = useState(null);
  const [upd, setUpdate] = useState(0);
  const [selectedLang, setSelectedLang] = useState(0);
  const [curTab, setCurTab] = useState(0);

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  useEffect(() => {
    setHasChanges(JSON.stringify(curData) !== JSON.stringify(initData));

    return () => setHasChanges(false);
  }, [curData]);

  useEffect(() => {
    setIsLoading(true);

    const request = id !== 'add' ? api.getEndUsersGroupsById(id) : Promise.resolve({
      data: {
        customerId: nxState?.selectedCustomer?.id,
      },
    });

    request
      .then(({ data }) => {
        setInitData({ ...data });
        setCurData({ ...JSON.parse(JSON.stringify(data)) });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [upd]);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={initData?.name || `${localization.t('general.new')} ${localization.t(
        'labels.endUserGroup',
      )}`}
      saveIsDisabled={!curData?.name
        || (curData?.fallbackLocale
          && (!curData?.localizedShortDesc
            || !curData?.localizedShortDesc[curData.fallbackLocale]))}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.endusergroups}
      curData={curData}
      addFunc={api.addEndUserGroup}
      updateFunc={api.updateEndUserGroup}
      beforeSend={(data) => data}
      setUpdate={setUpdate}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: ['general', 'localizedContent'],
      }}
    >
      <EndUsersGroupsDetailsView
        curData={curData}
        setCurData={setCurData}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default EndUsersGroupsDetailsScreen;
