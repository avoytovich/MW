import React from 'react';
import PropTypes from 'prop-types';

import StripedDetailSection from '../../../components/StripedDetailSection';

const Details = ({ detailsData }) => (
  <StripedDetailSection
    xsValue={12}
    mdValue={4}
    sectionsData={detailsData}
  />
);

Details.propTypes = {
  detailsData: PropTypes.object,
};

export default Details;
