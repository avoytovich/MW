import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListSubheader,
} from '@material-ui/core';
import NavItem from './NavItem';
import navConfig from './config';

const SideBar = () => (
  <Drawer
    anchor="left"
    open
    variant="persistent"
  >
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
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

export default SideBar;