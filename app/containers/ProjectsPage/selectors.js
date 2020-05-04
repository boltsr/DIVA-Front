import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProjects = state => state.get('projects', initialState);

// update user password
const makeSelectGetClients = () =>
  createSelector(selectProjects, projectState => projectState.get('clients'));
const makeSelectGetProjects = () =>
  createSelector(selectProjects, projectState => projectState.get('projects'));

export { makeSelectGetClients, makeSelectGetProjects };
