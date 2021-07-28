import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Box,
  Drawer,
  List,
  Typography,
} from '@material-ui/core';

import NavItem from './NavItem';
import CollapsableNav from './CollapsableNav';
import navConfig from './config';

import CustomerHandling from '../CustomerHandling';

import './SideBar.scss';

const NavItems = ({ config }) => config.items.map((item) => <NavItem key={item.id} {...item} />);

const SideBar = ({ open }) => (
  <Drawer
    anchor="left"
    open={open}
    variant="persistent"
    className='side-bar'
  >
    <Box height="100%" display="flex" flexDirection="column">
      {process?.env?.BUILT_AT && (
        <Box
          display='flex'
          flexDirection='column'
          bgcolor='primary.main'
          color='#fff'
          p={2}
          className={`bar-style-${process?.env?.ENV_MODE}`}
          height={64}
          mb={-3}
        >
          <Typography variant='h6'>Built at:</Typography>
          <Typography variant='h5'>{moment(process.env.BUILT_AT).format('lll')}</Typography>
        </Box>
      )}

      <Box
        height="inherit"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        className='side-nav'
      >
        <Box
          display="flex"
          flexDirection="column"
          p={3}
          width={260}
        >
          <Box p={2}>
            {navConfig.map((config) => (
              <List key={config.subheader || config?.items[0]?.id}>
                {config.subheader ? (
                  <CollapsableNav header={config.subheader} icon={config.subheaderIcon}>
                    <NavItems config={config} />
                  </CollapsableNav>
                ) : <NavItems config={config} />}
              </List>
            ))}
          </Box>
        </Box>

        <Box m="0 2px">
          <CustomerHandling />
        </Box>
      </Box>
    </Box>
  </Drawer>
);

SideBar.propTypes = {
  open: PropTypes.bool,
};

export default SideBar;
