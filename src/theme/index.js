import { colors as MuiColors, createMuiTheme } from '@material-ui/core';
import typography from './typography';
import softShadows from './shadows';
import colors from './colors';

const baseConfig = {
  direction: 'ltr',
  typography,
};

const themeConfig = {
  name: 'DARK',
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiInputBase: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: MuiColors.blueGrey[600],
        },
      },
    },
  },
  palette: {
    type: 'dark',
    action: {
      active: MuiColors.blueGrey[600],
    },
    background: {
      default: colors.mainBackground,
      paper: colors.mainBackground,
    },
    primary: {
      main: MuiColors.indigo[600],
    },
    secondary: {
      main: '#5850EC',
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textsSecondary,
    },
    error: {
      main: colors.errorText,
    },
  },
  shadows: softShadows,
};

const theme = createMuiTheme({ ...baseConfig, ...themeConfig });

export default theme;
