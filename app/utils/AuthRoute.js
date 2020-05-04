import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LoginPage from 'containers/LoginPage/Loadable';
import { makeSelectJwt } from 'containers/App/selectors';

const authRoute = ({ component: Component, ...rest }) => {
  // load the requested component if we have a token
  if (rest.token.length > 0) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  // otherwise dig up the LoginPage
  return <Route {...rest} render={props => <LoginPage {...props} />} />;
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectJwt(),
});

export default connect(mapStateToProps)(authRoute);
