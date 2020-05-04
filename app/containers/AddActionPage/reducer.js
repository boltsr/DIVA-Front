import { fromJS } from 'immutable';

import { GET_ACTION_TYPES_SUCCESS, GET_ACTION_TYPES_ERROR } from './constants';

export const initialState = fromJS({
  actionTypes: null,
  getActionTypesError: null,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTION_TYPES_SUCCESS:
      return state.set('actionTypes', action.actionTypes);
    case GET_ACTION_TYPES_ERROR:
      return state.set('getActionTypesError', action.error);
    default:
      return state;
  }
}

export default reducer;
