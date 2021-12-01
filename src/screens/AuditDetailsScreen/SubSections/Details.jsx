import React from 'react';
import PropTypes from 'prop-types';
import { emptyValue } from '../utils';
import StripedDetailSection from '../../../components/StripedDetailSection';

const Details = ({ detailsData }) => (
  <StripedDetailSection
    xsValue={12}
    mdValue={4}
    sectionsData={detailsData}
    emptyValue={emptyValue}
  />
);

Details.propTypes = {
  detailsData: PropTypes.object,
};

export default Details;
