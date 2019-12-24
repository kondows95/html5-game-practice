import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../theme';
import Page from '../containers/Page';

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Page />
    </MuiThemeProvider>
  );
}
