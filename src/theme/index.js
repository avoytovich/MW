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
    MuiCardActionArea: {
      root: {
        boxSizing: 'border-box',
        border: '3px solid transparent',
        '&:hover': {
          borderRadius: '10px',
          border: '3px solid white',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: colors.textPrimaryGray,
        '&.Mui-disabled': {
          opacity: 0.6,
        },
      },
    },
    MuiFormControlLabel: {
      root: {
        color: colors.textPrimaryGray,
        '&.Mui-disabled': {
          opacity: 0.6,
        },
      },
    },
    MuiInputBase: {
      root: {
        '&.Mui-disabled': {
          opacity: 0.6,
        },
      },
    },
    MuiRadio: {
      root: {
        color: colors.radioButton,
      },
    },
    MuiCheckbox: { root: { color: colors.textPrimaryGray } },
    MuiFormHelperText: {
      root: { color: colors.textPrimaryGray },
      contained: { margin: '5px', marginLeft: '5px', marginRight: '5px' },
    },
    MuiTab: {
      root: {
        '&.MuiTab-root': {
          textTransform: 'none',
          minWidth: 'auto',
          padding: 18,
          letterSpacing: 'unset',
        },
        '&.MuiTab-textColorPrimary': {
          color: colors.textPrimaryGray,
        },
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      },
    },
    MuiIconButton: {
      root: {
        '&.Mui-disabled': {
          color: colors.buttonDisabled,
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: colors.mainBackground,
      },
    },
    MuiListSubheader: {
      root: {
        color: colors.textPrimaryGray,
        fontSize: '12px',
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
    secondary: { main: colors.textPrimaryGray, dark: colors.textPrimaryDark },
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
