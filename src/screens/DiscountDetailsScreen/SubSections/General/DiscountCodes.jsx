/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { filterOptions } from '../../utils';

import { availableLocales } from '../../../../services/selectOptions/selectOptions';
import { SelectCustom, InputCustom } from '../../../../components/Inputs';

const DiscountCodes = ({ curDiscountCodes, setCurDiscountCodes }) => {
  const handleRemove = (removeKey) => {
    const index = curDiscountCodes.findIndex((item) => item.key === removeKey);
    const newValue = [...curDiscountCodes];
    newValue.splice(index, 1);
    setCurDiscountCodes(newValue);
  };
  const handleAdd = () => {
    const lastValue = curDiscountCodes[curDiscountCodes.length - 1];
    if (lastValue.key !== '' && lastValue.value !== '') {
      setCurDiscountCodes([...curDiscountCodes, { key: '', value: '' }]);
    }
  };

  return curDiscountCodes.map((item) => (
    <Box display="flex" key={item.key}>
      <Box p={2} width="30%">
        <SelectCustom
          label="language"
          value={item.key}
          selectOptions={filterOptions(
            [...availableLocales, { value: 'default', id: 'default' }],
            curDiscountCodes,
            item.key,
          )}
          onChangeSelect={(e) => {
            const newValue = [...curDiscountCodes];
            newValue.map((el) => {
              if (el.key === item.key) {
                el.key = e.target.value;
              }
              return el;
            });
            setCurDiscountCodes(newValue);
          }}
        />
      </Box>
      <Box p={2} width="60%">
        <InputCustom
          idDisabled={item.key === ''}
          label="discountLabel"
          value={item.value}
          onChangeInput={(e) => {
            const newValue = [...curDiscountCodes];
            newValue.map((el) => {
              if (el.key === item.key) {
                el.value = e.target.value;
              }
              return el;
            });
            setCurDiscountCodes(newValue);
          }}
        />
      </Box>
      <Box p={2} alignSelf="center" width="10%">
        {item.key === 'default' ? (
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

export default DiscountCodes;

DiscountCodes.propTypes = {
  curDiscountCodes: PropTypes.array,
  setCurDiscountCodes: PropTypes.func,
};
