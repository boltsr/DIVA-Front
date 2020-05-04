import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProjects = state => state.get('addAction', initialState);

const makeSelectActionTypes = () =>
  createSelector(selectProjects, projectState =>
    projectState.get('actionTypes'),
  );

export { makeSelectActionTypes };
