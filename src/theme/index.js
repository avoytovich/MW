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
    MuiFormLabel: { root: { color: colors.textPrimaryGray } },
    MuiCheckbox: { root: { color: colors.textPrimaryGray } },

    MuiTableRow: {
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: colors.tablesOddRow,
        },
        '&$hover:hover': {
          // backgroundColor: 'green',
        },
      },
    },
  },
  palette: {
    type: 'light',
    action: {
      active: MuiColors.blueGrey[600],
      hover: colors.buttonPrimary,
    },
    background: {
      default: colors.mainBackground,
      paper: colors.mainBackground,
    },
    primary: {
      main: colors.buttonPrimary,
    },
    secondary: { main: colors.textPrimaryGray },
    text: {
      primary: colors.textPrimaryDark,
      secondary: colors.mainBackground,
    },
    error: {
      main: colors.errorText,
    },
  },
  shadows: softShadows,
  spacing: 6,
};

const theme = createMuiTheme({ ...baseConfig, ...themeConfig });

export default theme;
