/* eslint-disable no-param-reassign */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';

import { filterOptions } from '../utils';
import localization from '../../../localization';

import { SelectCustom, SelectWithChip } from '../../../components/Inputs';

const SelectModeInputs = ({
  curValue,
  setCurReco,
  selectOptions,
  labels,
  curKey,
  curReco,
}) => {
  const handleRemove = (index) => {
    if (index === 0 && curValue.length === 1) {
      setCurReco({
        ...curReco,
        [curKey]: [
          {
            key: `0_${curKey}`,
            keyValue: '',
            value: [],
          },
        ],
      });
    } else {
      const newValue = [...curValue];
      newValue.splice(index, 1);
      setCurReco({ ...curReco, [curKey]: newValue });
    }
  };

  const handleAdd = () => {
    if (
      curValue[curValue.length - 1].keyValue !== '' &&
      curValue[curValue.length - 1].value.length > 0
    ) {
      const key = `${
        Number(curValue[curValue.length - 1].key.split('_')[0]) + 1
      }_${curKey}`;

      setCurReco({
        ...curReco,
        [curKey]: [...curValue, { key, keyValue: '', value: [] }],
      });
    }
  };
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
          <Grid item xs={6}>
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
          <Grid item xs={2} className='iconsWrapper'>
            <Box display='flex'>
              <IconButton
                color='primary'
                disabled={
                  curValue.length === 1 &&
                  item.keyValue === '' &&
                  item.value.length === 0
                }
                onClick={() => handleRemove(index)}
              >
                <ClearIcon color='secondary' />
              </IconButton>
              {index === 0 && (
                <IconButton
                  color='primary'
                  onClick={handleAdd}
                  disabled={
                    curValue[curValue.length - 1].keyValue === '' ||
                    curValue[curValue.length - 1].value.length === 0
                  }
                >
                  <AddCircleIcon />
                </IconButton>
              )}
            </Box>
          </Grid>
          {item.value.find((el) => el === item.keyValue) && (
            <Grid item xs={12}>
              <Box px={2} pb={2}>
                <Typography color='error'>
                  {localization.t(
                    'errorNotifications.sourceProductIsAmongstItsOwnRecommendations',
                  )}
                </Typography>
              </Box>
            </Grid>
          )}
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
