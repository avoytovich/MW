import { colors as MuiColors } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import typography from './typography';
import softShadows from './shadows';
import colors from './colors';

const baseConfig = {
  direction: 'ltr',
  typography,
};

const themeConfig = {
  name: 'DARK',
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: auto;
        }

        body {
          font-size: 0.875rem;
          line-height: 1.43;
          letter-spacing: 0.01071em;
        }
      `,
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          border: '3px solid transparent',
          '&:hover': {
            borderRadius: '10px',
            border: '3px solid white',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: colors.textPrimaryGray,
          '&.Mui-disabled': {
            opacity: 0.6,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: colors.textPrimaryGray,
          '&.Mui-disabled': {
            opacity: 0.6,
          },
        },
      },
    },
    MuiDropzoneArea: {
      styleOverrides: {
        root: {
          width: '198px',
          height: '139px',
          minWidth: '198px',
          minHeight: '139px',
          borderRadius: '2px',
          border: 'solid 1px #c7c7c7',
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.6,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colors.radioButton,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.textPrimaryGray,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { color: colors.textPrimaryGray },
        contained: { margin: '5px', marginLeft: '5px', marginRight: '5px' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: 'auto',
          padding: 18,
          letterSpacing: 'unset',
          color: colors.textPrimaryGray,

          '&.Mui-disabled': {
            opacity: 0.5,
          },

          '& .localization-label': {
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: colors.buttonDisabled,
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: colors.buttonDisabled,
          },
          '&.MuiTab-root': {
            flexDirection: 'row',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: colors.mainBackground,
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: colors.textPrimaryGray,
          fontSize: '12px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: colors.mainBackground,

          '& .MuiDataGrid-row': {
            maxHeight: 'unset !important',

            '& .MuiDataGrid-cell': {
              maxHeight: 'unset !important',

              '&:not([data-field="actions"]):not(.flex-cell).MuiDataGrid-cell--withRenderer': {
                display: 'unset',
              },
            },
            '&:not(.Mui-selected)': {
              '&:hover': {
                color: '#fff',

                '& .MuiIconButton-root': {
                  opacity: 1,
                },
              },
              '& .MuiIconButton-root': {
                color: colors.textPrimaryGray,
                opacity: 0,

                '&:hover': {
                  color: 'inherit',
                },
              },
            },
          },
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
    secondary: { main: colors.textPrimaryGray, dark: colors.textPrimaryDark },
    text: {
      primary: colors.textPrimaryDark,
      secondary: colors.mainBackground,
    },
    error: {
      main: colors.errorText,
    },
    default: {
      main: colors.defaultLight,
    },
  },
  shadows: softShadows,
  spacing: 6,
};

const theme = createTheme({ ...baseConfig, ...themeConfig });

theme.palette.loginBtns = theme.palette.augmentColor({
  color: {
    main: '#19a6ff',
    dark: '#0971b3',
  },
});

export default theme;
