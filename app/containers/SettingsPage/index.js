import React from 'react';
import { FormattedMessage } from 'react-intl';
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import EnhancedTable from '../../components/EnhancedTable';
import MainContainer from '../../components/MainContainer';

import saga from './saga';
import reducer from './reducer';
import { getUsers } from './actions';
import { makeSelectGetUsers } from './selectors';
import messages from './messages';

import { makeSelectJwt } from '../App/selectors';

const styles = () => ({
  tabs: {
    height: 64,
  },
});

class SettingsPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      users: this.props.users,
      isLoading: !this.props.users,
    };

    // get users list if not already there
    if (!this.props.users) {
      this.props.getUsers(this.props.jwt);
    }
  }

  handleChange = (event, index) => {
    this.setState({ index });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.users !== null) {
      this.setState({
        users: nextProps.users,
        isLoading: false,
      });
    }
  }

  rows = [
    {
      id: 'firstName',
      label: 'First name',
    },
    {
      id: 'lastName',
      label: 'Last name',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'isAdmin',
      boolean: true,
      numeric: true,
      label: 'Admin',
    },
  ];

  render() {
    const { index } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <AppBar title="Settings">
          <Tabs
            value={this.state.index}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
          >
            <Tab
              className={classes.tabs}
              label={<FormattedMessage {...messages.userManagement} />}
            />
            <Tab
              className={classes.tabs}
              label={<FormattedMessage {...messages.appManagement} />}
            />
          </Tabs>
        </AppBar>
        <MainContainer>
          {index === 0 && (
            <Paper>
              {this.state.isLoading ? <LinearProgress /> : <div />}
              <EnhancedTable
                rows={this.rows}
                data={this.state.users}
                title={<FormattedMessage {...messages.userList} />}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </Paper>
          )}
          {index === 1 && <div>App</div>}
        </MainContainer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: token => {
    dispatch(getUsers(token));
  },
});

const mapStateToProps = createStructuredSelector({
  users: makeSelectGetUsers(),
  jwt: makeSelectJwt(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'settings', saga });
const withReducer = injectReducer({ key: 'settings', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  withStyles(styles),
)(SettingsPage);
