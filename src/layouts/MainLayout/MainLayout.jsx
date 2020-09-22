import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import SideBar from '../../components/SideBar';

const MainLayout = ({ children }) => (
  <Grid container>
    <Grid item><SideBar /></Grid>

    <Grid container item style={{ paddingLeft: 240 }}>
      <Grid item>{children}</Grid>
    </Grid>
  </Grid>
);

MainLayout.propTypes = {
  children: PropTypes.any,
};

export default MainLayout;
