import React from 'react';
import PropTypes from 'prop-types';
import General from './SubSections/General';
import EventMatching from './SubSections/EventMatching';
import Templating from './SubSections/Templating';
import SectionLayout from '../../components/SectionLayout';

const NotificationDefinitionDetailView = ({ curNotification, setCurNotification, curTab }) => (
  <>
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

NotificationDefinitionDetailView.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
  curTab: PropTypes.number,
};
export default NotificationDefinitionDetailView;
