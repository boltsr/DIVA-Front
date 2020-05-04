import React from 'react';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import EnhancedTable from '../../components/EnhancedTable';
import AppBar from '../../components/AppBar';
import MainContainer from '../../components/MainContainer';

import formatDate from '../../utils/formatDate';

import projectsSaga from '../ProjectsPage/saga';
import projectReducer from '../ProjectsPage/reducer';
import { getProjects } from '../ProjectsPage/actions';
import { makeSelectGetProjects } from '../ProjectsPage/selectors';

import { setLoading } from '../App/actions';
import { makeSelectJwt } from '../App/selectors';

import saga from './saga';
import reducer from './reducer';
import { setHeaderCollapsed, getActions } from './actions';
import { makeSelectHeaderCollapsed, makeSelectActions } from './selectors';
import messages from './messages';

const styles = theme => ({
  details: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detail: {
    margin: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  description: {
    flexGrow: 7,
  },
  expander: {
    marginBottom: theme.spacing.unit * 3,
  },
});

class ProjectPage extends React.PureComponent {
  constructor(props) {
    super(props);

    let loadinActions = false;

    // get users list if not already there
    if (!this.props.projects) {
      this.props.getProjects(this.props.jwt);
      this.props.setLoading(true);
    }

    // get users list if not already there
    if (!this.props.actions) {
      this.props.getActions(this.props.jwt, this.props.match.params.id);
      loadinActions = true;
    }

    this.state = {
      projects: this.props.projects,
      actions: this.props.actions,
      loadinActions,
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

  rows = [
    {
      id: 'name',
      label: 'Action',
    },
    {
      id: 'state',
      label: 'Status',
    },
  ];

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects !== null) {
      this.setState({
        projects: nextProps.projects,
      });
      this.props.setLoading(false);
    }
    if (nextProps.actions !== null) {
      this.setState({
        actions: nextProps.actions,
        loadinActions: false,
      });
    }
  }

  render() {
    const project = this.filterProject(this.state.projects);
    const { classes } = this.props;
    return (
      <div>
        <AppBar title={project ? project.name : ''} />
        <MainContainer>
          <ExpansionPanel
            expanded={!this.props.headerCollapsed}
            classes={{ root: classes.expander }}
            onChange={() => {
              this.props.setHeaderCollapsed(!this.props.headerCollapsed);
            }}
          >
            <ExpansionPanelSummary
              classes={{ content: classes.details }}
              expandIcon={<ExpandMoreIcon />}
            >
              <FormControl className={classes.detail}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.client} />
                </FormLabel>
                {project ? project.Client.name : ''}
              </FormControl>
              <FormControl className={classes.detail}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.contactPerson} />
                </FormLabel>
                {project ? project.contactPerson : ''}
              </FormControl>
              <FormControl className={classes.detail}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.projectLeader} />
                </FormLabel>
                {project ? project.projectLeader : ''}
              </FormControl>
              <FormControl className={classes.detail}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.smNo} />
                </FormLabel>
                {project ? project.smNo : ''}
              </FormControl>
              <FormControl className={classes.detail}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.internalNo} />
                </FormLabel>
                {project ? project.internalNo : ''}
              </FormControl>
              <FormControl className={classes.detail}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.city} />
                </FormLabel>
                {project ? project.city : ''}
              </FormControl>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <FormControl className={[classes.detail, classes.description]}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.description} />
                </FormLabel>
                {project ? project.description : ''}
              </FormControl>
              <FormControl className={classes.detail}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.begin} />
                </FormLabel>
                {formatDate(project ? project.begin : 0)}
              </FormControl>
              <FormControl className={classes.detail}>
                <FormLabel className={classes.label}>
                  <FormattedMessage {...messages.end} />
                </FormLabel>
                {formatDate(project ? project.end : 0)}
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Paper>
            {this.state.loadinActions ? <LinearProgress /> : <div />}
            <EnhancedTable
              title={<FormattedMessage {...messages.actions} />}
              rows={this.rows}
              data={this.state.actions}
              onClick={() => {
                console.log('click');
              }}
              onDelete={() => {
                console.log('delete');
              }}
              onAdd={() => {
                this.props.history.push(
                  `/project/${this.props.match.params.id}/action/add`,
                );
              }}
            />
          </Paper>
        </MainContainer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getActions: (token, projectId) => {
    dispatch(getActions(token, projectId));
  },
  getProjects: token => {
    dispatch(getProjects(token));
  },
  setLoading: isLoading => {
    dispatch(setLoading(isLoading));
  },
  setHeaderCollapsed: collapsed => {
    dispatch(setHeaderCollapsed(collapsed));
  },
});

const mapStateToProps = createStructuredSelector({
  jwt: makeSelectJwt(),
  projects: makeSelectGetProjects(),
  headerCollapsed: makeSelectHeaderCollapsed(),
  actions: makeSelectActions(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withProjectsSaga = injectSaga({ key: 'projects', saga: projectsSaga });
const withProjectsReducer = injectReducer({
  key: 'projects',
  reducer: projectReducer,
});

const withSaga = injectSaga({ key: 'project', saga });
const withReducer = injectReducer({ key: 'project', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  withProjectsSaga,
  withProjectsReducer,
  withStyles(styles),
)(ProjectPage);
