import { fromJS } from 'immutable';

import {
  GET_ACTION_SUCCESS,
  GET_ACTION_ERROR,
  HEADER_COLLAPSED,
} from './constants';

import { loadState, saveState } from '../../utils/localState';

// load permanent states from session
const permState = loadState(
  {
    headerCollapsed: false,
  },
  'project',
);

export const initialState = fromJS({
  actions: null,
  getActionsError: null,
  ...permState,
});

function settingsReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    // permanent
    case HEADER_COLLAPSED:
      newState = state.set('headerCollapsed', action.collapsed);
      break;

    // volatile
    case GET_ACTION_SUCCESS:
      return state.set('actions', action.actions);
    case GET_ACTION_ERROR:
      return state.set('getActionsError', action.error);
    default:
      return state;
  }

  // save current state to localStorage
  if (newState !== state) {
    saveState(
      {
        headerCollapsed: newState.get('headerCollapsed'),
      },
      'project',
    );
  }

  return newState;
}

export default settingsReducer;
