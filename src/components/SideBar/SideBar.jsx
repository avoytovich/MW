import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Box,
  Drawer,
  List,
  ListSubheader,
  Typography,
} from '@material-ui/core';

import NavItem from './NavItem';
import navConfig from './config';

import CustomerHandling from '../CustomerHandling';

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
          height={64}
          mb={-3}
        >
          <Typography variant='h6'>Built at:</Typography>
          <Typography variant='h5'>{moment(process.env.BUILT_AT).format('lll')}</Typography>
        </Box>
      )}

      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        p={3}
        width={260}
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
      <Box m="0 2px">
        <CustomerHandling />
      </Box>
    </Box>
  </Drawer>
);

SideBar.propTypes = {
  open: PropTypes.bool,
};

export default SideBar;
