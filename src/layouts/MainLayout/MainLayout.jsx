import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import './MainLayout.scss';

import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const MainLayout = ({ children }) => {
  const [drawerOpen, setDrawer] = useState(true);

  return (
    <Grid className="mainLayout" container>
      <SideBar open={drawerOpen} />

      <Grid container item style={{ paddingLeft: drawerOpen ? 260 : 0 }}>
        <TopBar toggleDrawer={() => setDrawer((d) => !d)} />
        <Grid className="table">
          <Grid
            className="tableBorder"
            item
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
