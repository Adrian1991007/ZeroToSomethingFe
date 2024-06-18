import { amber, grey } from '@mui/material/colors';

const palette = {
  light: {
    primary: {
      main: '#333996',
      light: '#3c44b126',
      dark: grey[800],
    },
  },

  _yellow: '#FFBA38',
  _darkerYellow: '#c98724',
  _hoverYellow: '#FFE973',
  _darkThemeWhite: '#91969e',
  _white: '#ced4e0',
  _blue: '#0F2043',
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...palette,
    ...(mode === 'light'
      ? {
          primary: palette.light.primary,
          divider: amber[200],
          layout: palette._white,
          header: palette._blue,
          background: {
            default: palette._white,
            paper: 'white',
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: grey,
          divider: amber[200],
          layout: palette._darkThemeWhite,
          header: palette._blue,
          background: {
            default: palette._darkThemeWhite,
            paper: '#a0a5ad',
          },
          text: {
            primary: '#000',
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: ['Oswald', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    body: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
  },
});

export const getThemedComponents = (mode) => ({
  components: {
    ...(mode === 'light'
      ? {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: '#6b6b6b #2b2b2b',
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                  backgroundColor: '#ced4e0',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                  borderRadius: 7,
                  backgroundColor: grey[800],
                  minHeight: 24,
                  border: '3px solid #191d26',
                },
                '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                  backgroundColor: '#959595',
                },
                '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                  backgroundColor: '#959595',
                },
                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#959595',
                },
                '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                  backgroundColor: '#2b2b2b',
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: palette._blue,
              },
            },
          },
          MuiLink: {
            variant: 'h3',
          },

          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: 'background 0.8s ease',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#4375e8', // Culoare hover la toate iconitele
                },
              },
            },
            variants: [
              {
                props: { variant: 'blackButtons' },
                style: {
                  color: 'black',
                },
              },
            ],
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                textAlign: 'center',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              },
            },
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  minWidth: '6.5rem',
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                  '&:hover': {
                    backgroundColor: palette._yellow,
                  },
                },
              },
              {
                props: { variant: 'reset' },
                style: {
                  fontSize: 12,
                  color: 'black',
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
              {
                props: { variant: 'navbarButtons' },
                style: {
                  color: palette._yellow,
                  backgroundColor: palette._blue,
                  fontSize: 18,

                  '&:hover': {
                    color: palette._blue,
                    backgroundColor: palette._yellow,
                  },
                },
              },
              {
                props: { variant: 'selectedNavbarButtons' },
                style: {
                  color: palette._blue,
                  backgroundColor: palette._yellow,
                  fontSize: 18,

                  '&:hover': {
                    color: palette._blue,
                    backgroundColor: palette._yellow,
                  },
                },
              },
              {
                props: { variant: 'staffButtons' },
                style: {
                  color: palette._yellow,
                  fontSize: 14,

                  '&:hover': {
                    color: palette._blue,
                    backgroundColor: palette._yellow,
                  },
                },
              },
              {
                props: { variant: 'selectedStaffButtons' },
                style: {
                  fontSize: 14,
                  color: palette._yellow,
                },
              },
            ],
          },

          MuiTypography: {
            variants: [
              {
                props: { variant: 'playerLabel' },
                style: {
                  color: 'white',
                  fontSize: 14,
                },
              },
            ],
          },
          MuiTable: {
            styleOverrides: {
              root: {
                marginTop: 3,
                '& thead th': {
                  fontWeight: '600',
                  color: palette.light.primary.main,
                  backgroundColor: palette.light.primary.light,
                },
                '& tbody td': {
                  fontWeight: '300',
                },
                '& tbody tr:hover': {
                  backgroundColor: '#fffbf2',
                  cursor: 'pointer',
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                color: 'red',
                alignItems: 'stretch',
                fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
            variants: [
              {
                props: { variant: 'selectVariant' },
              },
            ],
          },
          MuiList: {
            styleOverrides: {
              root: {
                color: palette._blue,
                alignItems: 'stretch',
                fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                alignItems: 'stretch',
                fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                color: 'yellow',
                fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
        }
      : {
          /// DE AICI E DARK THEME
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: '#6b6b6b #2b2b2b',
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                  backgroundColor: '#676b70', //palette._darkThemeWhite,
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                  borderRadius: 7,
                  backgroundColor: grey[800],
                  minHeight: 24,
                  border: '3px solid #191d26',
                },
                '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                  backgroundColor: '#959595',
                },
                '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                  backgroundColor: '#959595',
                },
                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#959595',
                },
                '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                  backgroundColor: '#2b2b2b',
                },
              },
            },
          },
          /// AICI E PROBLEMA UNDEVA E UN SHADER CARE DESCHIDE PUTIN CULOAREA.
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: palette._blue,
              },
            },
          },
          MuiLink: {
            variant: 'h3',
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: 'background 0.8s ease',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#4375e8', // Culoare hover la toate iconitele
                },
              },
            },
          },
          /// dE AICI TOATE BUTOANELE
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              },
            },
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  backgroundColor: palette._blue,
                  color: palette._white,
                  minWidth: '6.5rem',
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                  '&:hover': {
                    backgroundColor: palette._darkerYellow,
                  },
                },
              },
              {
                props: { variant: 'reset' },
                style: {
                  fontSize: 12,
                  color: 'black',
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
              {
                props: { variant: 'navbarButtons' },
                style: {
                  color: palette._yellow,
                  backgroundColor: palette._blue,
                  fontSize: 18,

                  '&:hover': {
                    color: palette._blue,
                    backgroundColor: palette._yellow,
                  },
                },
              },
              {
                props: { variant: 'selectedNavbarButtons' },
                style: {
                  color: palette._blue,
                  backgroundColor: palette._yellow,
                  fontSize: 18,

                  '&:hover': {
                    color: palette._blue,
                    backgroundColor: palette._yellow,
                  },
                },
              },
              {
                props: { variant: 'staffButtons' },
                style: {
                  color: palette._yellow,
                  fontSize: 14,

                  '&:hover': {
                    color: palette._blue,
                    backgroundColor: palette._yellow,
                  },
                },
              },
              {
                props: { variant: 'selectedStaffButtons' },
                style: {
                  fontSize: 14,
                  color: palette._yellow,
                },
              },
            ],
          },
          MuiTable: {
            styleOverrides: {
              root: {
                marginTop: 3,
                '& thead th': {
                  fontWeight: '600',
                  color: palette.light.primary.main,
                  backgroundColor: palette.light.primary.light,
                },
                '& tbody td': {
                  fontWeight: '300',
                },
                '& tbody tr:hover': {
                  backgroundColor: '#fffbf2',
                  cursor: 'pointer',
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                color: 'red',
                alignItems: 'stretch',
                fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
        }),
  },
});
