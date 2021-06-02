import * as actionTypes from './actionTypes';
import { setTagActionCheck } from '../../typeGuards';

const initialState: FilterState = {
  productFilter: '',
  tagFilter: undefined,
};

const reducer = (state: FilterState = initialState, action: FilterActions): FilterState => {
  if (setTagActionCheck(action)) {
    return {
      ...state,
      tagFilter: action.data
    };
  }

  switch(action.type) {
    case actionTypes.SET_FILTER:
      return {
        ...state,
        productFilter: action.data
      };
  }
  return state;
};

export default reducer;