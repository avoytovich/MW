import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Zoom, Button, Box, Typography, Tabs, Tab, LinearProgress,
} from '@material-ui/core';

import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';

import General from './SubSections/General';
import LocalizedContent from './SubSections/LocalizedContent';

import parentPaths from '../../services/paths';
import api from '../../api';

import './endUsersGroupsDetailsScreen.scss';

const EndUsersGroupsDetailsScreen = () => {
  const history = useHistory();
  const { id } = useParams();
  const [curTab, setCurTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [curData, setCurData] = useState(null);
  const [initData, setInitData] = useState(null);
  const [upd, setUpdate] = useState(0);
  const [selectedLang, setSelectedLang] = useState(0);

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const saveData = () => {
    if (id === 'add') {
      api.addEndUserGroup(curData).then((res) => {
        const location = res.headers.location.split('/');
        const newId = location[location.length - 1];
        toast(localization.t('general.updatesHaveBeenSaved'));
        history.push(`${parentPaths.endusergroups}/${newId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api
        .updateEndUserGroup(id, curData)
        .then(() => {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setUpdate((u) => u + 1);
        });
    }
  };

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
      });
  }, [upd]);

  if (id === 'add' && !nxState.selectedCustomer?.id) {
    return <SelectCustomerNotification />;
  }

  if (isLoading) return <LinearProgress />;

  return (
    <>
      {id !== 'add' && (
        <Box mx={2} data-test='breadcrumbs'>
          <CustomBreadcrumbs
            url={`${parentPaths.endusergroups}`}
            section={localization.t('labels.endUserGroups')}
            id={curData?.id}
          />
        </Box>
      )}

      <Box display='flex' flexDirection='row' m={2} justifyContent='space-between'>
        <Box alignSelf='center'>
          <Typography data-test='notificationName' gutterBottom variant='h3'>
            {id !== 'add'
              ? `${localization.t('labels.endUserGroup')} ${initData?.name}`
              : `${localization.t('general.new')} ${localization.t('labels.endUserGroup')}`}
          </Typography>
        </Box>

        <Zoom in={hasChanges}>
          <Box mb={1} mr={1}>
            <Button
              disabled={!curData?.name
                || (curData?.fallbackLocale
                  && (!curData?.localizedShortDesc
                    || !curData.localizedShortDesc[curData.fallbackLocale]))}
              id='save-detail-button'
              color='primary'
              size='large'
              type='submit'
              variant='contained'
              onClick={saveData}
            >
              {localization.t('general.save')}
            </Button>
          </Box>
        </Zoom>
      </Box>

      <Box my={2} bgcolor='#fff' display='flex'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(e, tab) => setCurTab(tab)}
        >
          <Tab label={localization.t('labels.general')} value={0} />
          <Tab label={localization.t('labels.localizedContent')} value={1} />
        </Tabs>
      </Box>

      <Box display='flex'>
        {curTab === 0 && (
          <SectionLayout label='general'>
            <General data={curData} setData={setCurData} />
          </SectionLayout>
        )}

        {curTab === 1 && (
          <SectionLayout label='localizedContent'>
            <LocalizedContent
              data={curData}
              setData={setCurData}
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
            />
          </SectionLayout>
        )}
      </Box>
    </>
  );
};

export default EndUsersGroupsDetailsScreen;
