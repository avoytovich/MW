import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Collapse, Box, List, Button,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CollapsableNav = ({
  header, icon: Icon, children, openAllSections,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box display='flex' flexDirection='column' className='collapsable-nav'>
      <Button onClick={() => setIsOpen((c) => !c)}>
        {Icon && <Icon size='20' />}

        <span className='subheaderItem'>{header}</span>

        <Box className={isOpen ? 'icon-collapsed' : 'icon-not-collapsed'}>
          <KeyboardArrowDownIcon className='chevron-icon' />
        </Box>
      </Button>

      <Collapse in={isOpen || openAllSections}>
        <List>
          {children}
        </List>
      </Collapse>
    </Box>
  );
};

CollapsableNav.propTypes = {
  header: PropTypes.string,
  children: PropTypes.any,
  icon: PropTypes.any,
  openAllSections: PropTypes.bool,
};

export default CollapsableNav;
