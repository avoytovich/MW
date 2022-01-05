import React from 'react';
import PropTypes from 'prop-types';

import General from './SubSections/General';
import Emails from './SubSections/Emails';
import Orders from './SubSections/Orders';

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
  curTab,
}) => (
  <>
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

    {curTab === 1 && curEndUser && <Emails emails={emails} />}

    {curTab === 2 && curEndUser && <Orders orders={orders} />}
  </>
);

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
  curTab: PropTypes.number,

};

export default EndUserDetailView;
