import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import General from './SubSections/General';
import Emails from './SubSections/Emails';
import Orders from './SubSections/Orders';
import localization from '../../localization';
import SectionLayout from '../../components/SectionLayout';

const EndUserDetailView = ({
  scope,
  curEndUser,
  setInvalidVatNumber,
  invalidVatNumber,
  setCurEndUser,
  selectOptions,
  consent,
  orders,
  emails,
}) => {
  const [curTab, setCurTab] = useState(0);
  return (
    <>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label={localization.t('labels.general')} />
          <Tab label={localization.t('labels.emails')} />
          <Tab label={localization.t('labels.orders')} />
        </Tabs>
      </Box>
      {
        curTab === 0 && curEndUser && (
          <SectionLayout label='general'>
            <General
              scope={scope}
              setInvalidVatNumber={setInvalidVatNumber}
              invalidVatNumber={invalidVatNumber}
              curEndUser={curEndUser}
              setCurEndUser={setCurEndUser}
              selectOptions={selectOptions}
              consent={consent}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 1 && curEndUser && (
          <SectionLayout label='emails'>
            <Emails
              emails={emails}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 2 && curEndUser && (
          <SectionLayout label='orders'>
            <Orders
              orders={orders}
            />
          </SectionLayout>
        )
      }
    </>
  );
};

EndUserDetailView.propTypes = {
  scope: PropTypes.string,
  curEndUser: PropTypes.object,
  setInvalidVatNumber: PropTypes.func,
  invalidVatNumber: PropTypes.string,
  setCurEndUser: PropTypes.func,
  selectOptions: PropTypes.object,
  emails: PropTypes.object,
  orders: PropTypes.object,
  consent: PropTypes.array,

};

export default EndUserDetailView;
