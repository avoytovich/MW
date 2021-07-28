import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Collapse, Box, ListItem } from '@material-ui/core';

import './NavItem.scss';

const CollapsableNav = ({ header, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box display='flex'>
        {Icon && <Icon size='20' />}

        <ListItem
          onClick={() => setIsOpen((c) => !c)}
          className='linkTitle'
        >
          <span className='linkTitle'>{header}</span>
        </ListItem>
      </Box>

      <Collapse in={isOpen}>
        {children}
      </Collapse>
    </>
  );
};

CollapsableNav.propTypes = {
  header: PropTypes.string,
  children: PropTypes.func,
  icon: PropTypes.any,
};

export default CollapsableNav;
