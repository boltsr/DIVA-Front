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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import formatDate from '../../utils/formatDate';

import AppBar from '../../components/AppBar';
import EnhancedTable from '../../components/EnhancedTable';
import MainContainer from '../../components/MainContainer';

import saga from './saga';
import reducer from './reducer';
import { getClients, getProjects } from './actions';
import { setLoading } from '../App/actions';
import { makeSelectGetClients, makeSelectGetProjects } from './selectors';
import { makeSelectJwt } from '../App/selectors';
import messages from './messages';

const styles = theme => ({
  tabs: {
    height: 64,
  },
  filter: {
    marginTop: theme.spacing.unit * 2,
    marginEnd: theme.spacing.unit * 3,
    minWidth: 180,
  },
});

class ProjectsPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      filter: 0,
      clients: this.props.clients ? this.props.clients : [],
      projects: this.props.projects,
      isLoading: !this.props.projects,
    };

    // get users list if not already there
    if (!this.props.clients) {
      this.props.getClients(this.props.jwt);
      this.props.setLoading(true);
    }

    // get users list if not already there
    if (!this.props.projects) {
      this.props.getProjects(this.props.jwt);
    }
  }

  handleChange = (event, index) => {
    this.setState({ index });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  rows = [
    {
      id: 'name',
      label: 'Project',
    },
    {
      id: 'client',
      label: 'Client',
    },
    {
      id: 'smNo',
      label: 'SM No.',
    },
    {
      id: 'end',
      label: 'End date',
    },
  ];

  prepareData = data => {
    const projects = [];
    if (typeof data !== 'undefined' && data !== null) {
      Object.keys(data).forEach(k => {
        if (
          this.state.filter === 0 ||
          (this.state.filter > 0 && this.state.filter === data[k].Client.id)
        ) {
          projects.push({
            id: data[k].id,
            name: data[k].name,
            smNo: data[k].smNo,
            end: formatDate(data[k].end),
            client: data[k].Client.name,
          });
        }
      });
    }
    return projects;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects !== null) {
      this.setState({
        projects: nextProps.projects,
        isLoading: false,
      });
    }
    if (nextProps.clients !== null) {
      this.setState({
        clients: nextProps.clients,
        isLoading: false,
      });
      this.props.setLoading(false);
    }
  }

  render() {
    const { index, clients } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <AppBar title={<FormattedMessage {...messages.projects} />}>
          <Tabs
            value={this.state.index}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
          >
            <Tab
              className={classes.tabs}
              label={<FormattedMessage {...messages.activeProjects} />}
            />
          </Tabs>
          <FormControl className={classes.formControl}>
            <Select
              value={this.state.filter}
              onChange={this.handleFilterChange}
              displayEmpty
              name="filter"
              className={classes.filter}
            >
              <MenuItem value={0} key="0">
                <em>
                  <FormattedMessage {...messages.allCustomers} />
                </em>
              </MenuItem>
              {clients.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AppBar>
        <MainContainer>
          {index === 0 && (
            <Paper>
              {this.state.isLoading ? <LinearProgress /> : <div />}
              <EnhancedTable
                rows={this.rows}
                data={this.prepareData(this.state.projects)}
                title={<FormattedMessage {...messages.projects} />}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                onClick={(event, id) => {
                  this.props.history.push(`/project/${id}/`);
                }}
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
  getProjects: token => {
    dispatch(getProjects(token));
  },
  getClients: token => {
    dispatch(getClients(token));
  },
  setLoading: isLoading => {
    dispatch(setLoading(isLoading));
  },
});

const mapStateToProps = createStructuredSelector({
  projects: makeSelectGetProjects(),
  clients: makeSelectGetClients(),
  jwt: makeSelectJwt(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'projects', saga });
const withReducer = injectReducer({ key: 'projects', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  withStyles(styles),
)(ProjectsPage);
