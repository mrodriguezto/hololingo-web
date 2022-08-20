import { CssBaseline, Grow } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { customTheme } from 'themes/custom-theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={2000}
        TransitionComponent={Grow}
      >
        <CssBaseline />
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
