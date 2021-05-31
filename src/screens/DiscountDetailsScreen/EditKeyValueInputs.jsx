/* eslint-disable no-param-reassign */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';

import { filterOptions } from './utils';

import {
  SelectCustom,
  NumberInput,
  InputCustom,
} from '../../components/Inputs';
import './discountDetailsScreen.scss';

const EditKeyValueInputs = ({
  curValue,
  setCurValue,
  selectOptions,
  additionalOption,
  labels,
}) => {
  const optionsArray = [...selectOptions];
  if (additionalOption) {
    optionsArray.push(additionalOption);
  }
  const handleRemove = (removeKey) => {
    const index = curValue.findIndex((item) => item.key === removeKey);
    const newValue = [...curValue];
    newValue.splice(index, 1);
    setCurValue(newValue);
  };
  const handleAdd = () => {
    const lastValue = curValue[curValue.length - 1];
    if (!lastValue || (lastValue.key !== '' && lastValue.value !== '')) {
      setCurValue([...curValue, { key: '', value: '' }]);
    }
  };

  return (
    <Grid container alignItems="center">
      {curValue.length !== 0 ? (
        curValue.map((item, index) => (
          <Fragment key={item.key}>
            <Grid item xs={4}>
              <Box py={2} pl={2}>
                <SelectCustom
                  isDisabled={additionalOption?.id === item.key}
                  label={labels[0]}
                  value={item.key}
                  selectOptions={filterOptions(
                    optionsArray,
                    curValue,
                    item.key,
                  )}
                  onChangeSelect={(e) => {
                    const newValue = [...curValue];
                    newValue.map((el) => {
                      if (el.key === item.key) {
                        el.key = e.target.value;
                      }
                      return el;
                    });
                    setCurValue(newValue);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box p={2}>
                {labels[1] === 'amount' ? (
                  <NumberInput
                    label={labels[1]}
                    value={item.value}
                    onChangeInput={(e) => {
                      const newValue = [...curValue].map((el) => {
                        if (el.key === item.key) {
                          el.value = Number(e.target.value);
                        }
                        return el;
                      });
                      setCurValue(newValue);
                    }}
                    minMAx={{ min: 1, step: 1 }}
                  />
                ) : (
                  <InputCustom
                    label={labels[1]}
                    value={item.value}
                    onChangeInput={(e) => {
                      const newValue = [...curValue];
                      newValue.map((el) => {
                        if (el.key === item.key) {
                          el.value = e.target.value;
                        }
                        return el;
                      });
                      setCurValue(newValue);
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={1} className="iconsWrapper">
              {index === 0 ? (
                <AddCircleIcon color="primary" onClick={handleAdd} />
              ) : (
                <ClearIcon
                  color="secondary"
                  onClick={() => handleRemove(item.key)}
                />
              )}
            </Grid>
          </Fragment>
        ))
      ) : (
        <Box display="flex">
          <Box p={2}>
            <AddCircleIcon data-test='addNewInputsIcon' color="primary" onClick={handleAdd} />
          </Box>
          <Box p={2}>
            <Typography data-test='addNewInputsText'>Add new value</Typography>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default EditKeyValueInputs;

EditKeyValueInputs.propTypes = {
  curValue: PropTypes.array,
  setCurValue: PropTypes.func,
  additionalOption: PropTypes.object,
  labels: PropTypes.array,
  selectOptions: PropTypes.array,
};
