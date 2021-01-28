import React from 'react';
import {
  Box, Typography, Zoom, Button, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import localization from '../../localization';

import './ThemeLayout.scss';

const ThemeLayout = ({
  hasChanges,
  saveTheme,
  currentTheme,
  setCurrentTheme,
  disabled,
  customer,
}) => (
  <Box className="theme-screen">
    <Zoom in={hasChanges}>
      <Button
        disabled={disabled}
        id="save-theme-button"
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        onClick={saveTheme}
      >
        {localization.t('forms.buttons.save')}
      </Button>
    </Zoom>
    {currentTheme.id && (
      <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
        <Box pr={4} pt="7px" pl="4px">
          <Typography color="secondary">
            {localization.t('labels.id')}
          </Typography>
        </Box>
        <Box pr={4} pt="7px" pl="4px">
          <Typography>{currentTheme.id}</Typography>
        </Box>
      </Box>
    )}
    <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
      <Box pr={4} pt="7px" pl="4px">
        <Typography color="secondary">
          {localization.t('labels.customer')}
        </Typography>
      </Box>
      <Box pr={4} pt="7px" pl="4px">
        <Typography>{customer}</Typography>
      </Box>
    </Box>
    <Box py={5} pb={2} width="50%">
      <TextField
        fullWidth
        label={localization.t('labels.name')}
        name="firstName"
        type="text"
        value={currentTheme.name}
        onChange={(e) => setCurrentTheme({ ...currentTheme, name: e.target.value })}
        variant="outlined"
      />
    </Box>
    <Box>
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        label={localization.t('labels.css')}
        multiline
        rows={20}
        value={currentTheme.data}
        onChange={(e) => setCurrentTheme({ ...currentTheme, data: e.target.value })}
        variant="outlined"
      />
    </Box>
  </Box>
);

ThemeLayout.propTypes = {
  hasChanges: PropTypes.bool,
  saveTheme: PropTypes.func,
  currentTheme: PropTypes.object,
  setCurrentTheme: PropTypes.func,
  disabled: PropTypes.bool,
  customer: PropTypes.string,
};
export default ThemeLayout;
