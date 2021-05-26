import * as actionTypes from './actionTypes';

const initialState: ActiveProductState = {
  product: undefined
};

const reducer = (state: ActiveProductState = initialState, action: SetActiveProductAction): ActiveProductState => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_PRODUCT:
      return {
        product: action.data
      };
  }
  return state;
};

export default reducer;