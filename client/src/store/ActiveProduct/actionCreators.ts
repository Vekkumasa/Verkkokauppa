import * as actionTypes from './actionTypes';

type SetActiveProduct = (dispatch: DispatchType) => void;

export const setActiveProduct = (data: Product): SetActiveProduct => {
  const action: SetActiveProductAction = {
    type: actionTypes.SET_ACTIVE_PRODUCT,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};