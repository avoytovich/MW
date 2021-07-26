import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';

import { InputCustom } from '../../../components/Inputs';

import localization from '../../../localization';

const EventMatching = ({ setCurNotification, curNotification, data }) => {
  const updateValue = (key, val) => {
    setCurNotification({
      ...curNotification,
      eventMatcher: { ...curNotification.eventMatcher, [key]: val },
    });
  };

  const updateFilters = ({ key, val }, ind) => {
    const filters = [...data.filters];

    filters[ind][key] = val;

    setCurNotification({
      ...curNotification,
      eventMatcher: { ...curNotification.eventMatcher, filters },
    });
  };

  const removeFilter = (ind) => {
    if (data?.filters?.length === 1) {
      const curMatcher = { ...curNotification.eventMatcher };
      delete curMatcher.filters;

      setCurNotification({ ...curNotification, eventMatcher: { ...curMatcher } });
    } else {
      const curMatcher = { ...curNotification.eventMatcher };
      curMatcher.filters.splice(ind, 1);

      setCurNotification({ ...curNotification, eventMatcher: { ...curMatcher } });
    }
  };

  const addFilter = () => {
    const curMatcher = { ...curNotification.eventMatcher };

    if (curMatcher.filters) {
      curMatcher.filters.push({ filterJsonPath: '', filterRegex: '' });
    } else {
      curMatcher.filters = [{ filterJsonPath: '', filterRegex: '' }];
    }

    setCurNotification({ ...curNotification, eventMatcher: { ...curMatcher } });
  };

  return (
    <Grid container>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <InputCustom
            label='subject'
            value={data?.subject}
            onChangeInput={(e) => updateValue('subject', e.target.value)}
            isRequired
          />
        </Box>
      </Grid>

      <Grid item md={6} sm={12}>
        <Box p={2}>
          <InputCustom
            label='fact'
            value={data?.fact}
            onChangeInput={(e) => updateValue('fact', e.target.value)}
            isRequired
          />
        </Box>
      </Grid>

      <Grid item md={12} sm={12}>
        <Box p={2}>
          <InputCustom
            label='mainIdJsonPath'
            value={data?.mainIdJsonPath}
            onChangeInput={(e) => updateValue('mainIdJsonPath', e.target.value)}
            isRequired
          />
        </Box>
      </Grid>

      <Grid item md={12} sm={12}>
        <Box p={2}>
          <Typography gutterBottom variant='h5'>{localization.t('labels.filters')}</Typography>
        </Box>

        <Grid container alignItems='center'>
          {data?.filters?.length ? data?.filters?.map((item, index) => (
            <>
              <Grid item xs={5}>
                <Box py={2} pl={2}>
                  <InputCustom
                    label='jsonPath'
                    value={item.filterJsonPath}
                    onChangeInput={(e) => updateFilters({ key: 'filterJsonPath', val: e.target.value }, index)}
                    isRequired
                  />
                </Box>
              </Grid>

              <Grid item xs={5}>
                <Box p={2}>
                  <InputCustom
                    label='matchingRegex'
                    value={item.filterRegex}
                    onChangeInput={(e) => updateFilters({ key: 'filterRegex', val: e.target.value }, index)}
                    isRequired
                  />
                </Box>
              </Grid>

              <Grid item xs={2} className='iconsWrapper'>
                <Box display='flex'>
                  <IconButton
                    color='primary'
                    onClick={() => removeFilter(index)}
                  >
                    <ClearIcon color='secondary' />
                  </IconButton>

                  {index === (data.filters.length - 1) && (
                    <IconButton
                      color='primary'
                      onClick={addFilter}
                      disabled={
                        data?.filters[data?.filters?.length - 1].filterJsonPath === ''
                        || data?.filters[data?.filters?.length - 1].filterRegex === ''
                      }
                    >
                      <AddCircleIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </>
          )) : (
            <>
              <Grid item xs={2} className='iconsWrapper'>
                <Box px={2}>
                  <Box display='flex'>
                    <Button color='primary' onClick={addFilter}>
                      <AddCircleIcon />

                      <Box mx={2}>
                        <Typography>{localization.t('labels.addFilter')}</Typography>
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

EventMatching.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
  data: PropTypes.object,
};

export default EventMatching;
