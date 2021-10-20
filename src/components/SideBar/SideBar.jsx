import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Drawer,
  List,
  ListItem,
} from '@material-ui/core';

import NavItem from './NavItem';
import CollapsableNav from './CollapsableNav';

import CustomerHandling from '../CustomerHandling';
import LogoHome from '../utils/LogoHome';
import navConfig from './config';
import './SideBar.scss';

const NavItems = ({ config }) => config.items.map((item) => <NavItem key={item.id} {...item} />);

const SideBar = ({ open }) => (
  <Drawer
    anchor="left"
    open={open}
    variant="persistent"
    className='side-bar'
    PaperProps={{
      style: {
        marginTop: process?.env?.ENV_MODE === 'production' ? 0 : '25px',
      },
    }}
  >
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        height="inherit"
        display="flex"
        flexDirection="column"
        className='side-nav'
        px={2}
      >
        <LogoHome wrapperHeight={64} height={32} width={107} />

        <Box
          display="flex"
          flexDirection="column"
          height={1}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            width={236}
            className='side-nav-block'
          >
            <List>
              {navConfig.map((config) => (
                <ListItem key={config.subheader || config?.items[0]?.id} disableGutters>
                  {config.subheader ? (
                    <CollapsableNav header={config.subheader} icon={config.subheaderIcon}>
                      <NavItems config={config} />
                    </CollapsableNav>
                  ) : <NavItems config={config} />}
                </ListItem>
              ))}
            </List>
          </Box>

          <Box mx='-5px' mt='50px'><CustomerHandling /></Box>
        </Box>
      </Box>
    </Box>
  </Drawer>
);

SideBar.propTypes = {
  open: PropTypes.bool,
};

export default SideBar;
