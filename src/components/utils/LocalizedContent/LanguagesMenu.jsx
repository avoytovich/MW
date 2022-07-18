import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Box, Popover, ListItem, List,
} from '@mui/material';

const LanguagesMenu = ({
  usedOptions = [],
  setNewLangValue,
  anchorEl,
  setAnchorEl,
  top,
  left,
  handleClose,
}) => {
  const languagesOptions = useSelector(({ sessionData: { languages } }) => languages);
  const handleMenuItemClick = (id) => {
    if (!usedOptions.includes(id)) {
      setAnchorEl(null);
      setNewLangValue(id);
    }
  };

  return (
    <Box p={2}>
      <Popover
        id="checkoutMenu"
        anchorReference="anchorPosition"
        anchorPosition={{ top, left }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          {languagesOptions.map((lang) => (
            <ListItem
              className='countryListItem'
              disabled={usedOptions.includes(lang.id)}
              key={lang.id}
              onClick={() => handleMenuItemClick(lang.id)}
            >
              {lang.value}
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

LanguagesMenu.propTypes = {
  usedOptions: PropTypes.array,
  setNewLangValue: PropTypes.func,
  anchorEl: PropTypes.any,
  setAnchorEl: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  handleClose: PropTypes.func,
};

export default LanguagesMenu;
