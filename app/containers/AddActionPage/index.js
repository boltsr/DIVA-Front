import React from 'react';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '../../components/AppBar';
import MainContainer from '../../components/MainContainer';

import { setLoading } from '../App/actions';
import globalReducer from '../App/reducer';
import { makeSelectJwt } from '../App/selectors';

import saga from './saga';
import reducer from './reducer';
import { getActionTypes } from './actions';
import { makeSelectActionTypes } from './selectors';
import messages from './messages';

const styles = theme => ({
  menu: {
    marginEnd: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

class ProjectPage extends React.PureComponent {
  constructor(props) {
    super(props);

    // get users list if not already there
    if (!this.props.actionTypes) {
      this.props.getActionTypes(this.props.jwt);
    }

    this.state = {
      actionTypes: this.props.actionTypes,
    };
  }

  filterProject = data => {
    const { id } = this.props.match.params;
    let project = null;
    if (typeof data !== 'undefined' && data !== null) {
      Object.keys(data).forEach(k => {
        if (id > 0 && parseInt(id, 0) === data[k].id) {
          project = data[k];
        }
      });
    }
    return project;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.actionTypes !== null) {
      this.setState({
        actionTypes: nextProps.actionTypes,
      });
    }
  }

  render() {
    const { actionTypes } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <AppBar title={<FormattedMessage {...messages.title} />} />
        <MainContainer>
          <div className={classes.container}>
            <Paper className={classes.menu}>
              <MenuList>
                <MenuItem selected>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Paper>
          </div>
        </MainContainer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getActionTypes: token => {
    dispatch(getActionTypes(token));
  },
  setLoading: isLoading => {
    dispatch(setLoading(isLoading));
  },
});

const mapStateToProps = createStructuredSelector({
  jwt: makeSelectJwt(),
  actionTypes: makeSelectActionTypes(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'addAction', saga });
const withReducer = injectReducer({ key: 'addAction', reducer });
const withGlobalReducer = injectReducer({
  key: 'global',
  reducer: globalReducer,
});

export default compose(
  withSaga,
  withReducer,
  withGlobalReducer,
  withConnect,
  withStyles(styles),
)(ProjectPage);
