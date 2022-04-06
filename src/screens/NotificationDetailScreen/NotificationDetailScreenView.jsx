import React from 'react';
import PropTypes from 'prop-types';

import General from './SubSections/General';
import HttpHeaders from './SubSections/HttpHeaders';
import OAuthConfiguration from './SubSections/OAuthConfiguration';
import TLSconfiguration from './SubSections/TLSconfiguration';

import SectionLayout from '../../components/SectionLayout';

const NotificationDetailScreenView = ({
  curNotification,
  curTab,
  setCurNotification,
  selectOptions,
  errorMessages,
  setErrorMessages,
}) => (
  <>
    {
      curTab === 0 && curNotification && (
        <SectionLayout label='general'>
          <General
            errorMessages={errorMessages}
            setErrorMessages={setErrorMessages}
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

NotificationDetailScreenView.propTypes = {
  setCurNotification: PropTypes.func,
  curNotification: PropTypes.object,
  selectOptions: PropTypes.object,
  curTab: PropTypes.bool,
  errorMessages: PropTypes.object,
  setErrorMessages: PropTypes.func,
};

export default NotificationDetailScreenView;
