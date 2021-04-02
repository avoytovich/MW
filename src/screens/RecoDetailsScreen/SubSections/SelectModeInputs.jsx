/* eslint-disable no-param-reassign */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';

import { filterOptions } from '../utils';

import { SelectCustom, SelectWithChip } from '../../../components/Inputs';

const SelectModeInputs = ({
  curValue,
  setCurReco,
  selectOptions,
  labels,
  curKey,
  curReco,
}) => {
  const handleRemove = (removeKey) => {};
  const handleAdd = () => {};

  return (
    <Grid container alignItems='center'>
      {curValue.map((item, index) => (
        <Fragment key={item.key}>
          <Grid item xs={4}>
            <Box py={2} pl={2}>
              <SelectCustom
                label={labels[0]}
                value={item.keyValue}
                selectOptions={filterOptions(
                  selectOptions,
                  curValue.map((item) => item.keyValue),
                  item.keyValue,
                )}
                onChangeSelect={(e) => {
                  const newValue = [...curValue];
                  newValue[index].keyValue = e.target.value;
                  setCurReco({ ...curReco, [curKey]: newValue });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box p={2}>
              <SelectWithChip
                label={labels[1]}
                value={item.value}
                selectOptions={selectOptions}
                onChangeSelect={(e) => {
                  const newValue = [...curValue];
                  newValue[index].value = e.target.value;
                  setCurReco({ ...curReco, [curKey]: newValue });
                }}
                onClickDelIcon={(chip) => {
                  const newValue = [...curValue];

                  const newArray = [...item.value].filter(
                    (val) => val !== chip,
                  );
                  newValue[index].value = newArray;
                  setCurReco({
                    ...curReco,
                    [curKey]: newValue,
                  });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={1} className='iconsWrapper'>
            {index === 0 ? (
              <AddCircleIcon color='primary' onClick={handleAdd} />
            ) : (
              <ClearIcon
                color='secondary'
                onClick={() => handleRemove(item.key)}
              />
            )}
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
};

export default SelectModeInputs;

SelectModeInputs.propTypes = {
  curValue: PropTypes.array,
  setCurReco: PropTypes.func,
  additionalOption: PropTypes.object,
  labels: PropTypes.array,
  selectOptions: PropTypes.array,
  curReco: PropTypes.object,
};
