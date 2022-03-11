import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import CloseIcon from '@mui/icons-material/Close';
import localization from '../../localization';

import './SideBar.scss';

const HandleSearchSection = ({ handleUpdateValue, inputValue }) => (
  <Box
    width="100%"
    p="0 3px"
    display="flex"
    alignItems="end"
    py={1}
  >
    <Box><SearchIcon color="primary" /></Box>
    <Box
      className="searchSection-handling"
      width='100%'
      pl='8px'
    >
      <TextField
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();
          }
        }}
        value={inputValue}
        fullWidth
        label={localization.t('labels.searchSection')}
        type='text'
        InputProps={{
          form: { autocomplete: 'off' },
          endAdornment:
            inputValue ? (
              <InputAdornment position='end'>
                <CloseIcon
                  className='cancelInputCustomIcon'
                  fontSize='small'
                  color='primary'
                  onClick={() => handleUpdateValue('')}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                />
              </InputAdornment>
            ) : <></>,
        }}
        onChange={(e) => {
          handleUpdateValue(e.target.value.trimStart());
        }}
        variant='standard'
      />
    </Box>
  </Box>

);

HandleSearchSection.propTypes = {
  handleUpdateValue: PropTypes.func,
  inputValue: PropTypes.string,
};

export default HandleSearchSection;
