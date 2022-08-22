import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3949AB',
    },
    secondary: {
      main: '#0a0636',
      contrastText: 'white',
    },
    info: {
      main: '#141414',
    },
    error: {
      main: '#db1607',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: 'white',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 2,
        position: 'fixed',
        color: 'secondary',
      },
      styleOverrides: {
        root: {
          height: 60,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 700,
        },
        h2: {
          fontSize: 24,
          fontWeight: 400,
        },
        h3: {
          fontSize: 20,
          fontWeight: 400,
        },
        h4: {
          fontSize: 18,
          fontWeight: 300,
        },
        h5: {
          fontSize: 16,
          fontWeight: 300,
        },
        subtitle1: {
          fontSize: 16,
          fontWeight: 600,
        },
        body2: {
          fontSize: 12,
          color: 'grey',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 3,
          ':hover': {
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  },
});
