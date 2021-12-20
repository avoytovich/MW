import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const NavItem = ({
  title,
  href,
  exact,
  icon: Icon,
  external,
  isMain,
}) => (
  <Box
    component={isMain ? 'div' : 'li'}
    className={isMain ? 'subheaderItem' : 'listItem'}
  >
    {external
      ? (
        <Button
          href={href}
          target='_blank'
          rel='noreferrer'
        >
          {Icon && <Icon size='20' />}

          <span className={isMain ? '' : 'linkTitle'}>{title}</span>
        </Button>
      ) : (
        <Button
          component={NavLink}
          color='secondary'
          activeClassName='active'
          exact={exact}
          to={href}
        >
          {Icon && <Icon size='20' />}

          <span className={isMain ? '' : 'linkTitle'}>{title}</span>
        </Button>
      )}
  </Box>
);

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  external: PropTypes.bool,
  isMain: PropTypes.bool,
};

export default NavItem;
