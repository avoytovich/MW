import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import General from './SubSections/General';
import HttpHeaders from './SubSections/HttpHeaders';
import OAuthConfiguration from './SubSections/OAuthConfiguration';
import TLSconfiguration from './SubSections/TLSconfiguration';

import localization from '../../localization';

import SectionLayout from '../../components/SectionLayout';

const NotificationDetailScreenView = ({ curNotification, setCurNotification, selectOptions }) => {
  const [curTab, setCurTab] = useState(0);

  return (
    <>
      <Box my={2} position='sticky' top='90px' zIndex='2' bgcolor='#fff' pt='20px'>
        <Tabs
          data-test='tabs'
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label={localization.t('labels.general')} />
          <Tab label={localization.t('labels.httpHeaders')} disabled={curNotification.receiverType === 'email'} />
          <Tab label={localization.t('labels.oAuthConfiguration')} disabled={curNotification.receiverType === 'email'} />
          <Tab label={localization.t('labels.tlsConfiguration')} disabled={curNotification.receiverType === 'email'} />
        </Tabs>
      </Box>
      {
        curTab === 0 && curNotification && (
          <SectionLayout label='general'>
            <General
              selectOptions={selectOptions}
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 1 && curNotification && (
          <SectionLayout label='httpHeaders'>
            <HttpHeaders
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 2 && curNotification && (
          <SectionLayout label='oAuthConfiguration'>
            <OAuthConfiguration
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 3 && curNotification && (
          <SectionLayout label='tlsConfiguration'>
            <TLSconfiguration
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
    </>
  );
};

NotificationDetailScreenView.propTypes = {
  setCurNotification: PropTypes.func,
  curNotification: PropTypes.object,
  selectOptions: PropTypes.object,
};

export default NotificationDetailScreenView;
