import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { CssBaseline, Grow } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { store } from 'store';
import { Provider } from 'react-redux';

import AuthProvider from 'context/auth/AuthProvider';
import UIProvider from 'context/ui/UIProvider';
import { customTheme } from 'themes/custom-theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
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
            <AuthProvider>
              <UIProvider>
                <CssBaseline />
                <Component {...pageProps} />
              </UIProvider>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
