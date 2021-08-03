import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  LinearProgress,
  Tabs,
  Tab,
  Button,
  Zoom,
  Box,
  Typography,
} from '@material-ui/core';
import General from './SubSections/General';
import HTTPConfiguration from './SubSections/HTTPConfiguration';
import TestModeHTTPConfiguration from './SubSections/TestModeHTTPConfiguration';
import OperationDetails from './SubSections/OperationDetails';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';
import localization from '../../localization';
import useLicenseProviderDefinitionDetail from './useLicenseProviderDefinitionDetail';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';
import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';
import SectionLayout from '../../components/SectionLayout';

const LicenseProviderDefinitionDetails = () => {
  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);
  const { id } = useParams();
  const history = useHistory();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    setUpdate,
    curLicenseProvider,
    setCurLicenseProvider,
    isLoading,
    hasChanges,
    licenseProvider,
  } = useLicenseProviderDefinitionDetail(id, nxState);

  const handleSave = () => {
    const formattedData = removeEmptyPropsInObject(curLicenseProvider);
    if (id === 'add') {
      api.addLicenseProviderDefinition(formattedData).then((res) => {
        const location = res.headers.location.split('/');
        const newId = location[location.length - 1];
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push(`/overview/fulfillment-packages/licenseProviderDefinitions/${newId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateLicenseProviderDefinition(id, formattedData).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        setUpdate((u) => u + 1);
      });
    }
  };

  if (isLoading) return <LinearProgress />;

  if (id === 'add' && !nxState.selectedCustomer?.id) {
    return <SelectCustomerNotification />;
  }

  return (
    <>
      {id !== 'add' && (
        <Box mx={2}>
          <CustomBreadcrumbs
            url='/settings/licenseProviderDefinitions'
            section={localization.t('general.licenseProviderDefinition')}
            id={licenseProvider.id}
          />
        </Box>
      )}
      <Box
        display='flex'
        flexDirection='row'
        m={2}
        justifyContent='space-between'
      >
        <Box alignSelf='center'>
          <Typography data-test='notificationName' gutterBottom variant='h3'>
            {id !== 'add'
              ? licenseProvider.name
              : `${localization.t('general.new')} ${localization.t(
                'general.licenseProviderDefinition',
              )}`}
          </Typography>
        </Box>
        <Zoom in={hasChanges}>
          <Button
            disabled={curLicenseProvider.name === ''}
            id='save-notification-button'
            color='primary'
            size='large'
            type='submit'
            variant='contained'
            onClick={handleSave}
          >
            {localization.t('general.save')}
          </Button>
        </Zoom>
      </Box>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label={localization.t('labels.general')} />
          <Tab label={localization.t('labels.operationDetails')} />
          <Tab label={localization.t('labels.httpConfiguration')} />
          <Tab label={localization.t('labels.testModeHTTPConfiguration')} disabled={curLicenseProvider.status !== 'TestMode'} />
        </Tabs>
      </Box>
      {
        curTab === 0 && curLicenseProvider && (
          <SectionLayout label='general'>
            <General
              curLicenseProvider={curLicenseProvider}
              setCurLicenseProvider={setCurLicenseProvider}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 1 && curLicenseProvider && (
          <SectionLayout label='operationDetails'>
            <OperationDetails
              curLicenseProvider={curLicenseProvider}
              setCurLicenseProvider={setCurLicenseProvider}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 2 && curLicenseProvider && (
          <SectionLayout label='httpConfiguration'>
            <HTTPConfiguration
              curLicenseProvider={curLicenseProvider}
              setCurLicenseProvider={setCurLicenseProvider}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 3 && curLicenseProvider && (
          <SectionLayout label='testModeHTTPConfiguration'>
            <TestModeHTTPConfiguration
              curLicenseProvider={curLicenseProvider}
              setCurLicenseProvider={setCurLicenseProvider}
            />
          </SectionLayout>
        )
      }
    </>
  );
};

export default LicenseProviderDefinitionDetails;
