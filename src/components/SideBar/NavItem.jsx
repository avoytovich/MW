import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
} from '@material-ui/core';

const NavItem = ({
  title,
  href,
  icon: Icon,
}) => (
  <ListItem disableGutters>
    <Button
      activeClassName='active'
      component={NavLink}
      exact
      to={href}
    >
      {Icon && <Icon size="20" />}

      <span>{title}</span>
    </Button>
  </ListItem>
);

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default NavItem;
