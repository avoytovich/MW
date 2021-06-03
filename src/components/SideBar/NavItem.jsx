import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';

import './NavItem.scss';

const NavItem = ({
  title,
  href,
  exact,
  icon: Icon,
  external,
}) => (
  <ListItem
    disableGutters
    className='listItem'
  >
    {external
      ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className='listItemButton'
        >
          {Icon && <Icon size="20" className='apiLink' />}
          {title}
        </a>
      )
      : (
        <NavLink
          className='listItemButton'
          color='secondary'
          activeClassName='active'
          exact={exact}
          to={href}
        >
          {Icon && <Icon size="20" />}

          <span
            className='linkTitle'
          >
            {title}
          </span>
        </NavLink>
      )}
  </ListItem>
);

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  external: PropTypes.bool,
};

export default NavItem;
