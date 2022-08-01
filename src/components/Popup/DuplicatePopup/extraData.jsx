import React from 'react';
import {
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { InputCustom } from '../../Inputs';

const getExtraData = (scope, data, onChange, inputValues) => {
  switch (scope) {
    case 'productlist':
      return (
        <Products
          data={data}
          onChange={onChange}
          inputValues={inputValues}
        />
      );
    default: return null;
  }
};

const Products = ({
  onChange, inputValues,
}) => (
  <Box py={2}>
    <InputCustom
      isRequired
      tooltip={localization.t('tooltips.publisherRefId')}
      label='publisherRefId'
      value={inputValues?.publisherRefId || ''}
      onChangeInput={(e) => onChange({
        publisherRefId: e.target.value,
      })}
    />
  </Box>
);

Products.propTypes = {
  inputValues: PropTypes.object,
  onChange: PropTypes.func,
};

export default getExtraData;
