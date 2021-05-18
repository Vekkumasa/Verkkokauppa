import * as actionTypes from './actionTypes';

const initialState: FilterState = {
  productFilter: ''
};

const reducer = (state: FilterState = initialState, action: SetFilterAction): FilterState => {
  switch(action.type) {
    case actionTypes.SET_FILTER:
      return {
        productFilter: action.data
      };
  }
  return state;
};

export default reducer;