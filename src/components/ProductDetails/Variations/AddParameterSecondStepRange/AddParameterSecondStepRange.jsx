import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import { InputCustom } from '../../../Inputs';

import './addParameterSecondStepRange.scss';

const AddParameterSecondStepRange = ({ setProductData }) => (
  <Box>
    <InputCustom
      label="some"
      value=""
      onChangeInput={() => null}
      isRequired
    ></InputCustom>
    <InputCustom
      label="some"
      value=""
      onChangeInput={() => null}
      isRequired
    ></InputCustom>
    RANGE
  </Box>
);

AddParameterSecondStepRange.propTypes = {
  setProductData: PropTypes.func,
};

export default AddParameterSecondStepRange;
