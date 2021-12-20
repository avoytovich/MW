import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';

import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

import './MainLayout.scss';

const MainLayout = ({ children }) => {
  const [drawerOpen, setDrawer] = useState(true);

  return (
    <Grid
      className="mainLayout"
      container
      style={{
        height: process?.env?.ENV_MODE === 'production' ? '100%' : 'calc(100% - 25px)',
      }}
    >
      <SideBar toggleDrawer={() => setDrawer((d) => !d)} open={drawerOpen} />

      <Grid
        container
        item
        style={{ paddingLeft: drawerOpen ? 260 : 0 }}
      >
        <TopBar toggleDrawer={() => setDrawer((d) => !d)} drawerOpen={drawerOpen} />
        <Grid className="tableWrapper">
          <Grid
            className="table"
            item
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any,
};

export default MainLayout;
