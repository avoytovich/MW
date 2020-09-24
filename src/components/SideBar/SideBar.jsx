import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  List,
  ListSubheader,
} from '@material-ui/core';
import NavItem from './NavItem';
import navConfig from './config';

const SideBar = ({ open }) => (
  <Drawer
    anchor="left"
    open={open}
    variant="persistent"
  >
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      style={{ width: 240, padding: 15 }}
    >
      <Box p={2}>
        {navConfig.map((config) => (
          <List
            key={config.subheader}
            subheader={(
              <ListSubheader
                disableGutters
                disableSticky
              >
                {config.subheader}
              </ListSubheader>
            )}
          >
            {config.items.map((item) => <NavItem key={item.id} {...item} />)}
          </List>
        ))}
      </Box>
    </Box>
  </Drawer>
);

SideBar.propTypes = {
  open: PropTypes.bool,
};

export default SideBar;
