import React from 'react';
import {
  Box, Typography, Zoom, Button, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import localization from '../../localization';

import './FontLayout.scss';

const FontLayout = ({
  hasChanges,
  saveFont,
  currentFont,
  setCurrentFont,
  disabled,
  customer,
}) => (
  <Box className="font-screen">
    <Zoom in={hasChanges}>
      <Button
        disabled={disabled}
        id="save-font-button"
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        onClick={saveFont}
      >
        {localization.t('forms.buttons.save')}
      </Button>
    </Zoom>
    {currentFont.id && (
      <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
        <Box pr={4} pt="7px" pl="4px">
          <Typography color="secondary">
            {localization.t('labels.id')}
          </Typography>
        </Box>
        <Box pr={4} pt="7px" pl="4px">
          <Typography>{currentFont.id}</Typography>
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
        value={currentFont.name}
        onChange={(e) => setCurrentFont({ ...currentFont, name: e.target.value })}
        variant="outlined"
      />
    </Box>
    <Box py={5} pb={2} width="50%">
      <TextField
        fullWidth
        label={localization.t('labels.fontFamily')}
        name="lastName"
        type="text"
        value={currentFont.data.fontFamily}
        onChange={(e) => setCurrentFont({
          ...currentFont,
          data: { ...currentFont.data, fontFamily: e.target.value },
        })}
        variant="outlined"
      />
    </Box>
    <Box py={5} pb={2} width="50%">
      <TextField
        fullWidth
        label={localization.t('labels.importCssRule')}
        name="lastName"
        type="text"
        value={currentFont.data.font}
        onChange={(e) => setCurrentFont({
          ...currentFont,
          data: { ...currentFont.data, font: e.target.value },
        })}
        variant="outlined"
      />
    </Box>
  </Box>
);

FontLayout.propTypes = {
  hasChanges: PropTypes.bool,
  saveFont: PropTypes.func,
  currentFont: PropTypes.object,
  setCurrentFont: PropTypes.func,
  disabled: PropTypes.bool,
  customer: PropTypes.string,
};
export default FontLayout;
