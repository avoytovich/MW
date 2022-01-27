import React from 'react';
import PropTypes from 'prop-types';
import General from './SubSections/General';
import Batches from './SubSections/Batches';
import SectionLayout from '../../components/SectionLayout';

const ManualFulfillmentDetailView = ({
  curFulfillment,
  setCurFulfillment,
  curTab,
  selectOptions,
  setUpdate,
}) => (
  <>
    {
      curTab === 0 && curFulfillment && (
        <>
          <SectionLayout label='general'>
            <General
              selectOptions={selectOptions}
              curFulfillment={curFulfillment}
              setCurFulfillment={setCurFulfillment}
            />
          </SectionLayout>
        </>
      )
    }
    {
      curTab === 1 && curFulfillment && (
        <SectionLayout label='batches'>
          <Batches
            setUpdate={setUpdate}
            curFulfillment={curFulfillment}
          />
        </SectionLayout>
      )
    }
  </>
);

ManualFulfillmentDetailView.propTypes = {
  curFulfillment: PropTypes.object,
  setCurFulfillment: PropTypes.func,
  curTab: PropTypes.number,
  selectOptions: PropTypes.object,
  setUpdate: PropTypes.func,
};
export default ManualFulfillmentDetailView;
