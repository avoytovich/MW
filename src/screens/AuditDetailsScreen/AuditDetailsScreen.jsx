/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import localization from '../../localization';
import useAuditDetail from './useAuditDetail';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import AuditDetailsScreenView from './AuditDetailsScreenView';

const AuditDetailsScreen = () => {
  const { id } = useParams();
  const [curTab, setCurTab] = useState(0);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    isLoading,
    audit,
    details,
  } = useAuditDetail(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={`${localization.t('labels.audit')} ${audit?.id}`}
      isLoading={isLoading}
      curParentPath={parentPaths.audits}
      curData={audit}
      addFunc={null}
      updateFunc={null}
      beforeSend={null}
      setUpdate={null}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: ['general', 'details', 'delta'],
      }}
    >
      <AuditDetailsScreenView
        audit={audit}
        details={details}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default AuditDetailsScreen;
