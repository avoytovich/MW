/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { filterOptions } from '../../utils';

import { priceCurrency } from '../../../../services/selectOptions/selectOptions';
import { SelectCustom, NumberInput } from '../../../../components/Inputs';

const AmountByCurrency = ({ curAmountCurrency, setCurAmountCurrency }) => {
  const handleRemove = (removeKey) => {
    const index = curAmountCurrency.findIndex((item) => item.key === removeKey);
    const newValue = [...curAmountCurrency];
    newValue.splice(index, 1);
    setCurAmountCurrency(newValue);
  };
  const handleAdd = () => {
    const lastValue = curAmountCurrency[curAmountCurrency.length - 1];
    if (lastValue.key !== '' && lastValue.value !== '') {
      setCurAmountCurrency([...curAmountCurrency, { key: '', value: '' }]);
    }
  };

  return curAmountCurrency.map((item, index) => (
    <Box display="flex" key={item.key}>
      <Box p={2} width="30%">
        <SelectCustom
          label="currency"
          value={item.key}
          selectOptions={filterOptions(
            priceCurrency,
            curAmountCurrency,
            item.key,
          )}
          onChangeSelect={(e) => {
            const newValue = [...curAmountCurrency];
            newValue.map((el) => {
              if (el.key === item.key) {
                el.key = e.target.value;
              }
              return el;
            });
            setCurAmountCurrency(newValue);
          }}
        />
      </Box>
      <Box p={2} width="60%">
        <NumberInput
          label="amount"
          value={item.value}
          onChangeInput={(e) => {
            const newValue = [...curAmountCurrency].map((el) => {
              if (el.key === item.key) {
                el.value = e.target.value;
              }
              return el;
            });
            setCurAmountCurrency(newValue);
          }}
          minMAx={{ min: 1 }}
        />
      </Box>
      <Box p={2} alignSelf="center" width="10%">
        {index === 0 ? (
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

export default AmountByCurrency;

AmountByCurrency.propTypes = {
  currencyObj: PropTypes.object,
  curAmountCurrency: PropTypes.array,
  amountCurrency: PropTypes.array,
  setCurAmountCurrency: PropTypes.func,
};
