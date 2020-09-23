import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const MainLayout = ({ children }) => {
  const [drawerOpen, setDrawer] = useState(true);

  return (
    <Grid container>
      <SideBar open={drawerOpen} />

      <Grid container item style={{ paddingLeft: drawerOpen ? 240 : 0 }}>
        <TopBar toggleDrawer={() => setDrawer((d) => !d)} />
        <Grid item>{children}</Grid>
      </Grid>
    </Grid>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any,
};

export default MainLayout;
