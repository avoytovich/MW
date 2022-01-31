import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EndUsersGroupsDetailsView from './EndUsersGroupsDetailsView';
import localization from '../../localization';
import parentPaths from '../../services/paths';
import api from '../../api';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import { generateLocals, defaultEndUserGroup, beforeSend } from './utils';

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
  const [errors, setErrors] = useState({});
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
        ...defaultEndUserGroup,
      },
    });

    request
      .then(({ data }) => {
        const newData = {
          ...data,
          localizedContent: generateLocals(data.localizedLongDesc, data.localizedShortDesc),
        };
        setInitData({ ...newData });
        setCurData({ ...JSON.parse(JSON.stringify(newData)) });
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
      saveIsDisabled={!curData?.name || Object.keys(errors).length > 0
        || (curData?.fallbackLocale
          && (!curData?.localizedShortDesc
            || !curData?.localizedContent[curData.fallbackLocale]?.localizedShortDesc))}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.endusergroups}
      curData={curData}
      addFunc={api.addEndUserGroup}
      updateFunc={api.updateEndUserGroup}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: ['general', 'localizedContent'],
      }}
    >
      <EndUsersGroupsDetailsView
        errors={errors}
        setErrors={setErrors}
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
