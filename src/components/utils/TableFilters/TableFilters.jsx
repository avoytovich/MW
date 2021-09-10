import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  Typography,
  Button,
  Box,
  Paper,
  Divider,
} from '@material-ui/core';

import FilterBlock from './FilterBlock';

import { setFilters } from '../../../redux/actions/TableData';

import availableFilters from '../../../services/useData/tableMarkups/filters';
import localization from '../../../localization';

import './tableFilters.scss';

const Filters = ({ scope, onClose }) => {
  const dispatch = useDispatch();
  const [newFiltersConfig, setNewConfig] = useState({});

  const filtersConfig = useSelector(({ tableData: { filters } }) => filters[scope]);

  const updateFiltersConfig = (id, newData) => {
    const newConfig = { ...newFiltersConfig };

    newConfig[id] = newData;

    if (!newData) {
      delete newConfig[id];
    }

    setNewConfig(newConfig);
  };

  useEffect(() => {
    if (filtersConfig) {
      setNewConfig({ ...filtersConfig });
    }
  }, [filtersConfig]);

  const applyFilters = () => {
    onClose();
    dispatch(setFilters({ [scope]: newFiltersConfig }));
  };

  const clearFilters = () => setNewConfig({});

  return (
    <Paper className='filters-modal' elevation={3}>
      <Box p={3} height={1} display='flex' flexDirection='column' maxHeight='564px'>
        <Box mb='15px'>
          <Typography variant='h6'>{localization.t('general.filters')}</Typography>
        </Box>

        <Divider />

        <Box className='filters-inputs-container' display='flex' flexDirection='column' flexGrow='1' py='10px' pr='25px'>
          {availableFilters[scope].map((filter) => (
            <FilterBlock
              data={filter}
              curData={newFiltersConfig[filter.id]}
              updateConfig={updateFiltersConfig}
              key={filter.id}
            />
          ))}
        </Box>

        <Divider />

        <Box display='flex' justifyContent='space-between' alignItems='center' mt='15px'>
          <Box color='primary' style={{ cursor: 'pointer' }} onClick={clearFilters}>
            <Typography variant='h6' color='primary'>{localization.t('general.clearFilters')}</Typography>
          </Box>

          <Button variant='contained' color='primary' onClick={applyFilters}>{localization.t('forms.buttons.apply')}</Button>
        </Box>
      </Box>
    </Paper>
  );
};

Filters.propTypes = {
  scope: PropTypes.string,
  onClose: PropTypes.func,
};

export default Filters;
