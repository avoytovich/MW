/* eslint-disable no-param-reassign */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Grid, Typography, IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';

import { filterOptions, formateProductOptions } from '../utils';
import localization from '../../../localization';

import { AutocompleteCustom, AutocompleteWithChips } from '../../../components/Inputs';
import api from '../../../api';

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
      curValue[curValue.length - 1].keyValue !== ''
      && curValue[curValue.length - 1].value.length > 0
    ) {
      const key = `${Number(curValue[curValue.length - 1].key.split('_')[0]) + 1
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
              <AutocompleteCustom
                optionLabelKey='value'
                label={labels[0]}
                onSelect={(val) => {
                  const newValue = [...curValue];
                  newValue[index].keyValue = val;
                  setCurReco({ ...curReco, [curKey]: newValue });
                }}
                selectOptions={filterOptions(
                  selectOptions,
                  curValue.map((item_) => item_.keyValue),
                  item.keyValue,
                )}
                curValue={item.keyValue}
                getAdditionalOptions={(searchValue) => Promise.allSettled([
                  api.getProducts({ filters: `&customerId=${curReco.customerId}&id=${searchValue}`, notAddParentId: true }),
                  api.getProducts({ filters: `&customerId=${curReco.customerId}&target=genericName&genericName=*${searchValue}*`, notAddParentId: true }),
                ])
                  .then(([idSearch, nameSearch]) => {
                    const res = idSearch.value?.data?.items?.length
                      ? idSearch.value?.data?.items : nameSearch.value?.data?.items;
                    return formateProductOptions(res);
                  })}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box p={2}>
              <AutocompleteWithChips
                arrayTypeValue
                label={labels[1]}
                arrayValue={item.value}
                selectOptions={selectOptions}
                onChange={(val) => {
                  const newValue = [...curValue];
                  newValue[index].value = val;
                  setCurReco({ ...curReco, [curKey]: newValue });
                }}
                getAdditionalOptions={(searchValue) => Promise.allSettled([
                  api.getProducts({ filters: `&customerId=${curReco.customerId}&id=${searchValue}`, notAddParentId: true }),
                  api.getProducts({ filters: `&customerId=${curReco.customerId}&target=genericName&genericName=*${searchValue}*`, notAddParentId: true }),
                ])
                  .then(([idSearch, nameSearch]) => {
                    const res = idSearch.value?.data?.items?.length
                      ? idSearch.value?.data?.items : nameSearch.value?.data?.items;
                    return formateProductOptions(res);
                  })}
              />
            </Box>
          </Grid>
          <Grid item xs={2} className='iconsWrapper'>
            <Box display='flex'>
              <IconButton
                color='primary'
                disabled={
                  curValue.length === 1
                  && item.keyValue === ''
                  && item.value.length === 0
                }
                onClick={() => handleRemove(index)}
                size='large'
              >
                <ClearIcon color='secondary' />
              </IconButton>
              {index === 0 && (
                <IconButton
                  color='primary'
                  onClick={handleAdd}
                  disabled={
                    curValue[curValue.length - 1].keyValue === ''
                    || curValue[curValue.length - 1].value.length === 0
                  }
                  size='large'
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
  curKey: PropTypes.string,
  labels: PropTypes.array,
  selectOptions: PropTypes.array,
  curReco: PropTypes.object,
};
