import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { setFilters } from '../../../redux/actions/TableData';

const FiltersChips = ({ filters }) => {
  const dispatch = useDispatch();

  const removeFilter = (filter) => {
    const newFilters = filters.filter((f) => Object.keys(f)[0] !== filter);

    dispatch(setFilters(newFilters));
  };

  return (
    <Box px={2} pb={2}>
      <Grid container>
        {filters.map((filter) => {
          const [id] = Object.keys(filter);
          const [data] = Object.values(filter);

          return (
            <Chip
              color='primary'
              key={id}
              label={data.label}
              style={{ textTransform: 'capitalize', margin: 5 }}
              onDelete={() => removeFilter(id)}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

FiltersChips.propTypes = {
  filters: PropTypes.array,
};

export default FiltersChips;
