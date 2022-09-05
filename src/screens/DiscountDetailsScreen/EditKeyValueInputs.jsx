/* eslint-disable no-param-reassign */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Grid, IconButton, FormHelperText,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';

import { filterOptions } from './utils';
import localization from '../../localization';

import {
  SelectCustom,
  NumberInput,
  InputCustom,
  AutocompleteCustom,
} from '../../components/Inputs';
import './discountDetailsScreen.scss';

const EditKeyValueInputs = ({
  curValue,
  setCurValue,
  selectOptions,
  additionalOption,
  labels,
  helperText,
  hasError,
  tooltip,
  firstCanBeDeleted,
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
    <Grid container>
      {curValue.length !== 0 ? (
        curValue.map((item, index) => (
          <Fragment key={item.key}>
            <Grid item xs={4}>
              <Box py={2} pl={2}>
                <AutocompleteCustom
                  isDisabled={additionalOption?.id === item.key}
                  uniqueOptionValue={(option) => option.value}
                  optionLabelKey='value'
                  label={labels[0]}
                  onSelect={(newValue) => {
                    const newArrayValue = [...curValue];
                    newArrayValue.map((el) => {
                      if (el.key === item.key) {
                        el.key = newValue;
                      }
                      return el;
                    });
                    setCurValue(newArrayValue);
                  }}
                  selectOptions={filterOptions(
                    optionsArray,
                    curValue,
                    item.key,
                  )}
                  curValue={item.key || ''}
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box py={2} pl={2}>
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
                  <>
                    <InputCustom
                      id="component-helper-text"
                      helperText={hasError && index === 0 ? helperText : ''}
                      hasError={hasError}
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
                    {tooltip && (
                      <FormHelperText id="component-helper-text">
                        {localization.t(`tooltips.${tooltip}`)}
                      </FormHelperText>
                    )}
                  </>
                )}
              </Box>
            </Grid>
            <Grid item xs={1}>
              {firstCanBeDeleted && index === 0
                ? (
                  <Box display='flex' pt={3}>
                    <IconButton
                      onClick={() => handleRemove(item.key)}
                      color='secondary'
                    >
                      <ClearIcon />
                    </IconButton>
                    <IconButton
                      disabled={hasError}
                      onClick={handleAdd}
                      color='primary'
                    >
                      <AddCircleIcon />
                    </IconButton>

                  </Box>
                )
                : (
                  <Box pt={3}>
                    {index === 0 ? (
                      <IconButton
                        disabled={hasError}
                        onClick={handleAdd}
                        color='primary'
                      >
                        <AddCircleIcon />
                      </IconButton>

                    ) : (
                      <IconButton
                        onClick={() => handleRemove(item.key)}
                        color='secondary'
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                  </Box>
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
            <Typography data-test='addNewInputsText'>{localization.t('labels.addAmountValueAndCurrency')}</Typography>
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
  helperText: PropTypes.string,
  hasError: PropTypes.bool,
  tooltip: PropTypes.string,
  firstCanBeDeleted: PropTypes.bool,
};
