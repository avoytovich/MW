import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';

import General from './SubSections/General';
import EventMatching from './SubSections/EventMatching';
import Templating from './SubSections/Templating';
import SectionLayout from '../../components/SectionLayout';
import localization from '../../localization';

const NotificationDefinitionDetailView = ({ curNotification, setCurNotification }) => {
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
          <Tab label={localization.t('labels.templating')} />
        </Tabs>
      </Box>
      {
        curTab === 0 && curNotification && (
          <>
            <SectionLayout label='general'>
              <General
                curNotification={curNotification}
                setCurNotification={setCurNotification}
              />
            </SectionLayout>
            <SectionLayout label='eventMatching'>
              <EventMatching
                data={curNotification?.eventMatcher}
                curNotification={curNotification}
                setCurNotification={setCurNotification}
              />
            </SectionLayout>
          </>
        )
      }
      {
        curTab === 1 && curNotification && (
          <SectionLayout label='templating'>
            <Templating
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
    </>
  );
};

NotificationDefinitionDetailView.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
};
export default NotificationDefinitionDetailView;
