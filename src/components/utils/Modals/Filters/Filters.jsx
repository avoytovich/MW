import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Grid,
  Box,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import DateSubFilter from './DateSubFilter';
import TextSubFilter from './TextSubFilter';
import SelectSubFilter from './SelectSubFilter';

import { setFilters } from '../../../../redux/actions/TableData';
import availableFilters from '../../../../services/useData/tableMarkups/filters';
import localization from '../../../../localization';

const Filters = ({ scope, hide }) => {
  const dispatch = useDispatch();
  const [activeFilters, setActiveFilter] = useState({});
  const [filtersConfig, setFiltersConfig] = useState({});
  const reduxFilters = useSelector(({ tableData: { filters } }) => filters);

  useEffect(() => {
    const newActiveFilters = {};
    const newFiltersConfig = {};

    if (reduxFilters.length) {
      reduxFilters.forEach((f) => {
        Object.entries(f).forEach(([key, val]) => {
          newActiveFilters[key] = true;
          newFiltersConfig[key] = val;
        });
      });
    }

    setActiveFilter(newActiveFilters);
    setFiltersConfig(newFiltersConfig);

    return () => { setActiveFilter({}); setFiltersConfig({}); };
  }, [reduxFilters]);

  if (!availableFilters[scope].length) {
    return <DialogTitle id='filters-dialog-title'>{localization.t('forms.headers.noFilters')}</DialogTitle>;
  }

  const handleChange = (e, id) => setActiveFilter({ ...activeFilters, [id]: e.target.checked });

  const renderSubFilter = (filter) => {
    switch (filter.type) {
      case 'text': return <TextSubFilter filter={filter} config={filtersConfig} setConfig={setFiltersConfig} />;
      case 'date': return <DateSubFilter filter={filter} config={filtersConfig} setConfig={setFiltersConfig} />;
      case 'select': return <SelectSubFilter filter={filter} config={filtersConfig} setConfig={setFiltersConfig} />;

      default: return null;
    }
  };

  const applyFilters = () => {
    const validFilters = Object.keys(filtersConfig).filter((key) => !!activeFilters[key]);
    const filters = validFilters.map((v) => ({ [v]: filtersConfig[v] }));

    dispatch(setFilters(filters));
    hide();
  };

  return (
    <>
      <DialogTitle id='filters-dialog-title' disableTypography>
        <Typography variant='h4'>{localization.t('forms.headers.tableFilters')}</Typography>
      </DialogTitle>

      <DialogContent dividers>
        <FormGroup style={{ flexWrap: 'nowrap' }}>
          {
            availableFilters[scope].map((filter) => (
              <Box p={1} my={1} boxShadow={activeFilters[filter.id] ? 1 : 0} key={filter.id}>
                <Grid container>
                  <Grid container item xs={6} alignItems='center'>
                    <FormControlLabel
                      control={(
                        <>
                          <Switch
                            color='primary'
                            checked={!!activeFilters[filter.id]}
                            onChange={(e) => handleChange(e, filter.id)}
                            name={filter.label}
                          />

                          {filter.type === 'text' && (
                            <SearchIcon
                              color={activeFilters[filter.id] ? 'primary' : 'secondary'}
                              fontSize='small'
                              style={{ marginRight: 10 }}
                            />
                          )}
                        </>
                      )}
                      label={filter.label}
                    />
                  </Grid>

                  <Grid container item xs={6} justify='flex-end' alignItems='center'>
                    {!!activeFilters[filter.id] && renderSubFilter(filter)}
                  </Grid>
                </Grid>
              </Box>
            ))
          }
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <Button color='secondary' onClick={() => { setActiveFilter({}); setFiltersConfig({}); }}>
          {localization.t('forms.buttons.reset')}
        </Button>

        <Button color='primary' onClick={applyFilters}>
          {localization.t('forms.buttons.apply')}
        </Button>
      </DialogActions>
    </>
  );
};

Filters.propTypes = {
  scope: PropTypes.string,
  hide: PropTypes.func,
};

export default Filters;
