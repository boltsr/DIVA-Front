import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProjects = state => state.get('project', initialState);

const makeSelectActions = () =>
  createSelector(selectProjects, projectState => projectState.get('actions'));

const makeSelectHeaderCollapsed = () =>
  createSelector(selectProjects, projectState =>
    projectState.get('headerCollapsed'),
  );

export { makeSelectActions, makeSelectHeaderCollapsed };
