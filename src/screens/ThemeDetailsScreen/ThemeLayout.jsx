import React from 'react';
import {
  Box, Typography, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CodeEditor from '../../components/CodeEditor';
import localization from '../../localization';

import './ThemeLayout.scss';

const ThemeLayout = ({
  currentTheme,
  setCurrentTheme,
  customer,
}) => (
  <Box className="theme-screen">
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
      <CodeEditor
        editorName='cssEditor'
        mode='css'
        onChangeHandler={(newVal) => setCurrentTheme({ ...currentTheme, data: newVal })}
        value={currentTheme?.data}
      />
    </Box>
  </Box>
);

ThemeLayout.propTypes = {
  currentTheme: PropTypes.object,
  setCurrentTheme: PropTypes.func,
  customer: PropTypes.string,
};
export default ThemeLayout;
