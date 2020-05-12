/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import DashboardPage from 'containers/DashboardPage/Loadable';
import ProjectsPage from 'containers/ProjectsPage/Loadable';
import ProjectPage from 'containers/ProjectPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import AddActionPage from 'containers/AddActionPage/Loadable';

import indigo from '@material-ui/core/colors/indigo';

import AuthRoute from '../../utils/AuthRoute';

import SideBar from '../../components/SideBar';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: '#fff',
      contrastText: '#666',
    },
  },
  typography: {
    useNextVariants: true,
  },
  sideBarWidth: 240,
});

const NotFoundHandler = props => {
  if (props.location.pathname === '/') {
    props.history.replace('/dashboard');
  } else {
    props.history.replace('/404');
  }
  return <div />;
};

export default function NavigationProvider(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <SideBar {...props} />
      <Switch>
        <AuthRoute exact path="/dashboard" component={DashboardPage} />
        <AuthRoute exact path="/projects" component={ProjectsPage} />
        <AuthRoute exact path="/project/:id" component={ProjectPage} />
        {/* <AuthRoute
          exact
          path="/project/:id/action/add"
          component={AddActionPage}
        />
        <AuthRoute exact path="/settings" component={SettingsPage} /> */}
        <NotFoundHandler {...props} />
      </Switch>
    </MuiThemeProvider>
  );
}

NotFoundHandler.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};
