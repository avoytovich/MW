import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const DetailLayout = ({ leftComponent, rightComponent, bottomComponent }) => (
  <Grid container direction="row">
    <Grid item sm={12}>
      <Grid container justify="space-around" alignItems="center">
        <Grid sm={7} item>
          {leftComponent}
        </Grid>
        <Grid sm={5} item>
          {rightComponent}
        </Grid>
      </Grid>
    </Grid>
    <Grid sm={12} item>
      {bottomComponent}
    </Grid>
  </Grid>
);
DetailLayout.propTypes = {
  leftComponent: PropTypes.element,
  rightComponent: PropTypes.element,
  bottomComponent: PropTypes.element,
};

export default DetailLayout;
