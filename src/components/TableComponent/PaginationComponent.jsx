import React from 'react';
import { Link } from 'react-router-dom';

import { Pagination, PaginationItem } from '@material-ui/lab';

const PaginationComponent = () => (
  <Pagination
    renderItem={(item) => (
      <PaginationItem
        component={Link}
        to={`/dashboard`}
        {...item}
      />
    )}
    type='first'
    count={10}
    variant='outlined'
  />
);

export default PaginationComponent;
