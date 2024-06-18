import * as React from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@material-ui/core';
import { deepmerge } from '@mui/utils';

import { ZTSIntlProvider } from './contexts/ZTSIntContext';
import ZTSRouter from './config/router';
import { ColorModeContext } from './contexts/ColorModeContext';
import { getDesignTokens, getThemedComponents } from './config/themes/theme';
import store from './config/redux/store';

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  let newTheme = React.useMemo(
    () => createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode],
  );

  return (
    <ZTSIntlProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={newTheme}>
          <Provider store={store}>
            <CssBaseline />
            <ZTSRouter />
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ZTSIntlProvider>
  );
}
