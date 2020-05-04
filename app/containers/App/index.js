/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NavigationProvider from 'containers/NavigationProvider/Loadable';

import CssBaseline from '@material-ui/core/CssBaseline';

import GlobalStyle from '../../global-styles';
import AuthRoute from '../../utils/AuthRoute';

export default function App() {
  return (
    <CssBaseline>
      <Switch>
        <Route exact path="/404" component={NotFoundPage} />
        <Route exact path="/forgot-password" component={NotFoundPage} />
        <AuthRoute exact path="/**" component={NavigationProvider} />
      </Switch>
      <GlobalStyle />
    </CssBaseline>
  );
}
