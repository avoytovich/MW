/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { filterOptions } from '../../utils';

import { availableLocales } from '../../../../services/selectOptions/selectOptions';
import { SelectCustom, InputCustom } from '../../../../components/Inputs';

const DiscountLabels = ({ curDiscountLabels, setCurDiscountLabels }) => {
  const handleRemove = (removeKey) => {
    const index = curDiscountLabels.findIndex((item) => item.key === removeKey);
    const newValue = [...curDiscountLabels];
    newValue.splice(index, 1);
    setCurDiscountLabels(newValue);
  };
  const handleAdd = () => {
    const lastValue = curDiscountLabels[curDiscountLabels.length - 1];
    if (lastValue.key !== '' && lastValue.value !== '') {
      setCurDiscountLabels([...curDiscountLabels, { key: '', value: '' }]);
    }
  };

  return curDiscountLabels.map((item) => (
    <Box display="flex" key={item.key}>
      <Box p={2} width="30%">
        <SelectCustom
          label="language"
          value={item.key}
          selectOptions={filterOptions(
            [...availableLocales, { value: 'neutral', id: 'neutral' }],
            curDiscountLabels,
            item.key,
          )}
          onChangeSelect={(e) => {
            const newValue = [...curDiscountLabels];
            newValue.map((el) => {
              if (el.key === item.key) {
                el.key = e.target.value;
              }
              return el;
            });
            setCurDiscountLabels(newValue);
          }}
        />
      </Box>
      <Box p={2} width="60%">
        <InputCustom
          idDisabled={item.key === ''}
          label="discountLabel"
          value={item.value}
          onChangeInput={(e) => {
            const newValue = [...curDiscountLabels];
            newValue.map((el) => {
              if (el.key === item.key) {
                el.value = e.target.value;
              }
              return el;
            });
            setCurDiscountLabels(newValue);
          }}
        />
      </Box>
      <Box p={2} alignSelf="center" width="10%">
        {item.key === 'neutral' ? (
          <AddCircleIcon color="secondary" onClick={handleAdd} />
        ) : (
          <CancelIcon
            color="secondary"
            onClick={() => handleRemove(item.key)}
          />
        )}
      </Box>
    </Box>
  ));
};

export default DiscountLabels;

DiscountLabels.propTypes = {
  curDiscountLabels: PropTypes.array,
  setCurDiscountLabels: PropTypes.func,
};
