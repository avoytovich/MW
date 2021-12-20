import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LicenseProviderDefinitionDetailsView from './LicenseProviderDefinitionDetailsView';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import localization from '../../localization';
import useLicenseProviderDefinitionDetail from './useLicenseProviderDefinitionDetail';
import parentPaths from '../../services/paths';

import api from '../../api';
import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';

const LicenseProviderDefinitionDetails = () => {
  const { id } = useParams();

  const [curTab, setCurTab] = useState(0);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    setUpdate,
    curLicenseProvider,
    setCurLicenseProvider,
    isLoading,
    hasChanges,
    licenseProvider,
  } = useLicenseProviderDefinitionDetail(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={licenseProvider?.name || `${localization.t('general.new')} ${localization.t(
        'general.licenseProviderDefinition',
      )}`}
      saveIsDisabled={curLicenseProvider?.name === ''}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.fulfillment.licenseProviderDefinitionsTab}
      curData={curLicenseProvider}
      addFunc={api.addLicenseProviderDefinition}
      updateFunc={api.updateLicenseProviderDefinition}
      beforeSend={removeEmptyPropsInObject}
      setUpdate={setUpdate}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: ['general', 'operationDetails', 'httpConfiguration', 'testModeHTTPConfiguration'],
      }}
    >
      <LicenseProviderDefinitionDetailsView
        curLicenseProvider={curLicenseProvider}
        setCurLicenseProvider={setCurLicenseProvider}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default LicenseProviderDefinitionDetails;
