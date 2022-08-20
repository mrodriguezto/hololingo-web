import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3949AB',
    },
    secondary: {
      main: '#1A237E',
    },
    info: {
      main: '#222222',
    },
    error: {
      main: '#db1607',
    },
  },
  // components: {
  //   MuiLink: {
  //     defaultProps: {
  //       underline: 'none',
  //       color: 'secondary',
  //     },
  //   },
  //   MuiAppBar: {
  //     defaultProps: {
  //       elevation: 0,
  //       position: 'fixed',
  //     },
  //     styleOverrides: {
  //       root: {
  //         height: 60,
  //       },
  //     },
  //   },
  //   MuiTypography: {
  //     styleOverrides: {
  //       h1: {
  //         fontSize: 30,
  //         fontWeight: 700,
  //       },
  //       h2: {
  //         fontSize: 24,
  //         fontWeight: 400,
  //       },
  //       h3: {
  //         fontSize: 20,
  //         fontWeight: 400,
  //       },
  //       h4: {
  //         fontSize: 18,
  //         fontWeight: 300,
  //       },
  //       h5: {
  //         fontSize: 16,
  //         fontWeight: 300,
  //       },
  //       subtitle1: {
  //         fontSize: 16,
  //         fontWeight: 600,
  //       },
  //     },
  //   },
  //   MuiButton: {
  //     defaultProps: {
  //       variant: 'contained',
  //       size: 'small',
  //     },
  //     styleOverrides: {
  //       root: {
  //         textTransform: 'none',
  //         boxShadow: 'none',
  //         borderRadius: 10,
  //         ':hover': {
  //           transition: 'all 0.3s ease-in-out',
  //         },
  //       },
  //     },
  //   },
  //   MuiCard: {
  //     defaultProps: {
  //       elevation: 0,
  //     },
  //     styleOverrides: {
  //       root: {
  //         borderRadius: '10px',
  //       },
  //     },
  //   },
  //   MuiDrawer: {
  //     defaultProps: {
  //       elevation: 0,
  //     },
  //   },
  // },
});
