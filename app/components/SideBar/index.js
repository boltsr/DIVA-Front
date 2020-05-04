import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import DropDownIcon from '@material-ui/icons/ArrowDropDown';
import Card from '@material-ui/core/Card';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import BusinessIcon from '@material-ui/icons/BusinessCenter';

import { withStyles } from '@material-ui/core/styles';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  setJwt,
  setUser,
  doLogout,
  updateUserProfile,
  updateUserPassword,
  updateUserPasswordError,
} from '../../containers/App/actions';
import {
  makeSelectUser,
  makeSelectJwt,
  makeSelectLoggedOut,
  makeSelectIsLoading,
  makeSelectUserProfileError,
  makeSelectUserProfileResponse,
  makeSelectUserPasswordError,
  makeSelectUserPasswordResponse,
} from '../../containers/App/selectors';
import globalReducer from '../../containers/App/reducer';
import globalSaga from '../../containers/App/saga';

import Background from '../../containers/LoginPage/images/koeln.jpg';
import Logo from '../../images/Logo.png';
import UserIcon from '../UserIcon';
import messages from './messages';

const styles = theme => ({
  drawer: {
    width: theme.sideBarWidth,
  },
  drawerPaper: {
    width: theme.sideBarWidth,
    background: `rgba(0, 0, 0, .7) url(${Background})`,
    backgroundBlendMode: 'darken',
    color: '#fff',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  logo: {
    width: 75,
    margin: theme.spacing.unit * 3,
  },
  userIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMenu: {
    fontSize: '0.9em',
    display: 'flex',
    flexDirection: 'row',
  },
  userName: {
    color: 'white',
    width: '100%',
    marginRight: 10,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  divider: {
    backgroundColor: `rgba(255, 255, 255, .2)`,
  },
  errorCard: {
    padding: theme.spacing.unit * 2,
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  menuItem: {
    width: '80%',
    borderRadius: 4,
    '&:focus': {
      backgroundColor: 'rgba(255,255,255,0.8)',
      '& $primary, & $icon': {
        color: theme.palette.common.black,
      },
    },
  },
  primary: {
    color: theme.palette.common.white,
  },
  icon: {
    color: theme.palette.common.white,
  },
});

class SideBar extends React.PureComponent {
  state = {
    anchorEl: null,
    openProfile: false,
    openNewPassword: false,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    currentPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  };

  handleUserMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleUserMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfileOpen = () => {
    this.handleUserMenuClose();
    this.setState({ openProfile: true });
  };

  handleProfileClose = () => {
    this.setState({ openProfile: false });
  };

  handlePasswordOpen = () => {
    this.handleUserMenuClose();
    this.setState({ openNewPassword: true });
  };

  handlePasswordClose = () => {
    this.setState({ openNewPassword: false });
  };

  handleChangeProfile = () => {
    const { firstName, lastName, email } = this.state;
    this.props.updateUserProfile(this.props.jwt, {
      firstName,
      lastName,
      email,
    });
  };

  handleChangePassword = () => {
    const { currentPassword, newPassword, newPasswordRepeat } = this.state;
    if (currentPassword.length === 0) {
      this.props.updateUserPasswordError({
        message: <FormattedMessage {...messages.passwordNeeded} />,
      });
    } else if (newPassword.length < 7) {
      this.props.updateUserPasswordError({
        message: <FormattedMessage {...messages.passwordMinSize} />,
      });
    } else if (newPassword !== newPasswordRepeat) {
      this.props.updateUserPasswordError({
        message: <FormattedMessage {...messages.passwordNotMatch} />,
      });
    } else {
      this.props.updateUserPasswordError(null);
      this.props.updateUserPassword(this.props.jwt, {
        currentPassword,
        newPassword,
      });
    }
  };

  handleUserTextField = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };

  handleLogout = () => {
    this.props.doLogout(this.props.jwt);
    this.handleUserMenuClose();
  };

  isActive = value => this.props.location.pathname === value;

  // TODO: thoughts for future: logout logic might want to be handled within a
  // more strategic component such as `App`
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedOut) {
      this.props.setJwt('');
      this.props.setUser(null);
      this.props.history.push(`/`);
    }

    // close userProfile dialog when things stopped loading
    if (
      !(nextProps.userProfileError instanceof Error) &&
      nextProps.userProfileResponse !== null
    ) {
      this.props.setUser(nextProps.userProfileResponse.user);
      this.handleProfileClose();
    }

    // close all dialog when things stopped loading
    if (
      !(nextProps.userPasswordError instanceof Error) &&
      nextProps.userPasswordResponse !== null
    ) {
      this.handlePasswordClose();
    }
  }

  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Typography variant="h6" color="inherit" className={classes.title}>
          <a href="/">
            <img className={classes.logo} src={Logo} alt="Logo" />
          </a>
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.userMenu}>
          <UserIcon className={classes.userIcon} image={Background} />
          <Button
            className={classes.userName}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleUserMenuOpen}
          >
            {user.firstName} {user.lastName}
            <DropDownIcon />
          </Button>
        </div>
        <Divider className={classes.divider} />
        {/* User Menu */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleUserMenuClose}
          className={classes.userPopup}
        >
          <MenuItem onClick={this.handleProfileOpen}>
            <FormattedMessage {...messages.changeProfile} />
          </MenuItem>
          <MenuItem onClick={this.handlePasswordOpen}>
            <FormattedMessage {...messages.changePassword} />
          </MenuItem>
          <MenuItem onClick={this.handleLogout}>
            <FormattedMessage {...messages.logout} />
          </MenuItem>
        </Menu>

        {/* User Profile */}
        <Dialog
          open={this.state.openProfile}
          onClose={this.handleProfileClose}
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            <FormattedMessage {...messages.changeProfile} />
          </DialogTitle>
          <DialogContent>
            {this.props.userProfileError ? (
              <Card className={classes.errorCard}>
                {this.props.userProfileError.message}
              </Card>
            ) : (
              ''
            )}
            <TextField
              className={classes.textField}
              margin="normal"
              id="firstName"
              label={<FormattedMessage {...messages.firstName} />}
              type="text"
              value={this.state.firstName}
              onChange={this.handleUserTextField}
              disabled={this.props.isLoading}
              fullWidth
            />
            <br />
            <TextField
              className={classes.textField}
              margin="normal"
              id="lastName"
              label={<FormattedMessage {...messages.lastName} />}
              type="text"
              value={this.state.lastName}
              onChange={this.handleUserTextField}
              disabled={this.props.isLoading}
              fullWidth
            />
            <br />
            <TextField
              className={classes.textField}
              margin="normal"
              id="email"
              label={<FormattedMessage {...messages.emailAddress} />}
              type="email"
              value={this.state.email}
              onChange={this.handleUserTextField}
              disabled={this.props.isLoading}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleProfileClose} color="primary">
              <FormattedMessage {...messages.cancel} />
            </Button>
            <Button
              disabled={this.props.isLoading}
              onClick={this.handleChangeProfile}
              color="primary"
            >
              <FormattedMessage {...messages.save} />
            </Button>
          </DialogActions>
        </Dialog>

        {/* Change password */}
        <Dialog
          open={this.state.openNewPassword}
          onClose={this.handlePasswordClose}
          aria-labelledby="form-dialog-title"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            <FormattedMessage {...messages.changePassword} />
          </DialogTitle>
          <DialogContent>
            {this.props.userPasswordError ? (
              <Card className={classes.errorCard}>
                {this.props.userPasswordError.message}
              </Card>
            ) : (
              ''
            )}
            <TextField
              className={classes.textField}
              margin="normal"
              id="currentPassword"
              label={<FormattedMessage {...messages.currentPassword} />}
              type="password"
              onChange={this.handleUserTextField}
              disabled={this.props.isLoading}
              fullWidth
            />
            <br />
            <TextField
              className={classes.textField}
              margin="normal"
              id="newPassword"
              label={<FormattedMessage {...messages.newPassword} />}
              type="password"
              onChange={this.handleUserTextField}
              disabled={this.props.isLoading}
              fullWidth
            />
            <br />
            <TextField
              className={classes.textField}
              margin="normal"
              id="newPasswordRepeat"
              label={<FormattedMessage {...messages.newPasswordRepeat} />}
              type="password"
              onChange={this.handleUserTextField}
              disabled={this.props.isLoading}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePasswordClose} color="primary">
              <FormattedMessage {...messages.cancel} />
            </Button>
            <Button
              disabled={this.props.isLoading}
              onClick={this.handleChangePassword}
              color="primary"
            >
              <FormattedMessage {...messages.save} />
            </Button>
          </DialogActions>
        </Dialog>

        {/* further menu */}
        <MenuList className={classes.menuList}>
          <MenuItem
            component={Link}
            to="/dashboard"
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.icon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Dashboard"
            />
          </MenuItem>
          <MenuItem
            component={Link}
            to="/projects"
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.icon}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Projects"
            />
          </MenuItem>
          <MenuItem
            component={Link}
            to="/settings"
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.icon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Settings"
            />
          </MenuItem>
        </MenuList>
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  doLogout: PropTypes.func,
  loggedOut: PropTypes.bool,
  jwt: PropTypes.string,
  setJwt: PropTypes.func,
  setUser: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  jwt: makeSelectJwt(),
  loggedOut: makeSelectLoggedOut(),
  isLoading: makeSelectIsLoading(),
  userProfileError: makeSelectUserProfileError(),
  userProfileResponse: makeSelectUserProfileResponse(),
  userPasswordError: makeSelectUserPasswordError(),
  userPasswordResponse: makeSelectUserPasswordResponse(),
});

const mapDispatchToProps = dispatch => ({
  doLogout: token => {
    dispatch(doLogout(token));
  },
  setJwt: token => {
    dispatch(setJwt(token));
  },
  setUser: user => {
    dispatch(setUser(user));
  },
  updateUserProfile: (token, user) => {
    dispatch(updateUserProfile(token, user));
  },
  updateUserPassword: (token, password) => {
    dispatch(updateUserPassword(token, password));
  },
  updateUserPasswordError: error => {
    dispatch(updateUserPasswordError(error));
  },
});

const withGlobalReducer = injectReducer({
  key: 'global',
  reducer: globalReducer,
});

const withSaga = injectSaga({ key: 'login', saga: globalSaga });

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withGlobalReducer,
  withSaga,
  withStyles(styles),
)(SideBar);
