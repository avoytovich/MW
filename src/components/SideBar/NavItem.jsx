import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ListItem,
} from '@material-ui/core';
import './NavItem.scss';

const NavItem = ({
  title,
  href,
  icon: Icon,
}) => (
  <ListItem
    disableGutters
    className='listItem'
  >
    <NavLink
      className='listItemButton'
      color='secondary'
      activeClassName='active'
      // component={NavLink}
      exact
      to={href}
    >
      {Icon && <Icon size="20" />}

      <span
        className='linkTitle'
      >
        {title}
      </span>
    </NavLink>
  </ListItem>
);

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default NavItem;
