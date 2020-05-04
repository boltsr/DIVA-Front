/*
 * LoginPage
 *
 * This is the first thing users see at the '/' route
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import indigo from '@material-ui/core/colors/indigo';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import globalSaga from '../App/saga';
import globalReducer from '../App/reducer';
import { setJwt, setUser, doLogin, refreshToken } from '../App/actions';
import {
  makeSelectJwt,
  makeSelectLoggedIn,
  makeSelectLoginError,
  makeSelectRefreshError,
  makeSelectLoginResponse,
} from '../App/selectors';

import Background from './images/koeln.jpg';
import messages from './messages';

const styles = theme => ({
  container: {
    height: '100%',
    overflow: 'hidden',
  },
  bgImage: {
    backgroundImage: `url(${Background})`,
    filter: 'brightness(70%)/* blur(5px) */',
    margin: '-10px -10px -10px -10px',
    height: '102%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'block', // Fix IE 11 issue.
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  paper: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  title: {
    margin: `${theme.spacing.unit * 2}px`,
  },
  nop: {
    display: 'contents',
  },
  textField: {
    width: '70%',
  },
  button: {
    margin: `${theme.spacing.unit * 3}px`,
    padding: `${theme.spacing.unit * 2}px`,
    width: '70%',
  },
  forgotButton: {
    width: '70%',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
  typography: {
    useNextVariants: true,
  },
});

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, // shows loading spinner when true
      isError: false, // indicate error when true
    };
    this.username = null;
    this.password = null;
  }

  // proceed with login event
  checkLogin() {
    this.setState({
      isLoading: true, // show loading spinner
    });
    // kick off '/login' request
    this.props.doLogin(this.username, this.password);
  }

  componentDidMount() {
    // if we have already a JWT go to dashboard
    if (this.props.jwt.length > 0) {
      this.props.history.push(`/dashboard`);
    }
  }

  // when we get shit back from redux
  // TODO: thoughts for future: login logic might want to be handled within a
  // more strategic component such as `App`
  componentWillReceiveProps(nextProps) {
    // ok, are logged in?
    if (nextProps.loggedIn) {
      // so clear loading and error messages
      this.setState({
        isLoading: false,
        isError: false,
      });

      // save the login answers permanently
      this.props.setUser(nextProps.loginResponse.user);
      this.props.setJwt(nextProps.loginResponse.token);

      // and get us to dashboard
      this.props.history.push(`/dashboard`);
    }

    // not loggedin - got error?
    else if (nextProps.loginError) {
      // yes, we did :-/ .. so, clear loading and show the error
      this.setState({
        isLoading: false,
        isError: true,
      });
      // no login -> no jwt
      this.props.setJwt('');
    }

    // not loggedin - got efresh error?
    else if (nextProps.refreshError) {
      // yes .. so, clear loading BUT do not show error
      this.setState({
        isLoading: false,
        isError: false,
      });
      // again, no login no jwt
      this.props.setJwt('');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.container}>
          <div className={classes.bgImage} />
          <main className={classes.main}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" className={classes.title}>
                <FormattedMessage {...messages.login} />
              </Typography>
              {this.props.jwt.length === 0 ? (
                <div className={classes.nop}>
                  <TextField
                    id="outlined-name"
                    error={this.state.isError}
                    label={<FormattedMessage {...messages.email} />}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    type="email"
                    disabled={this.state.isLoading}
                    autoComplete="email"
                    onChange={e => {
                      this.username = e.target.value;
                      this.setState({
                        isError: false,
                        isLoading: false,
                      });
                    }}
                  />
                  <TextField
                    id="outlined-name"
                    error={this.state.isError}
                    label={<FormattedMessage {...messages.password} />}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    type="password"
                    disabled={this.state.isLoading}
                    onChange={e => {
                      this.password = e.target.value;
                      this.setState({
                        isError: false,
                        isLoading: false,
                      });
                    }}
                  />
                </div>
              ) : (
                <div />
              )}
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.isLoading}
                className={classes.button}
                onClick={() => this.checkLogin()}
              >
                {this.state.isLoading ? (
                  <CircularProgress
                    className={classes.progress}
                    color="secondary"
                  />
                ) : (
                  <FormattedMessage {...messages.signIn} />
                )}
              </Button>
              {this.props.jwt.length === 0 ? (
                <Button
                  className={classes.forgotButton}
                  component={Link}
                  to="/forgot-password"
                >
                  <FormattedMessage {...messages.forgotPassword} />
                </Button>
              ) : (
                <div className={classes.nop} />
              )}
            </Paper>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doLogin: (user, pass) => {
    dispatch(doLogin(user, pass));
  },
  refreshToken: oldToken => {
    dispatch(refreshToken(oldToken));
  },
  setJwt: token => {
    dispatch(setJwt(token));
  },
  setUser: user => {
    dispatch(setUser(user));
  },
});

const mapStateToProps = createStructuredSelector({
  loginError: makeSelectLoginError(),
  loggedIn: makeSelectLoggedIn(),
  loginResponse: makeSelectLoginResponse(),
  jwt: makeSelectJwt(),
  refreshError: makeSelectRefreshError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'global', saga: globalSaga });
const withReducer = injectReducer({ key: 'global', reducer: globalReducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  withStyles(styles),
)(LoginPage);
