import * as actionTypes from './actionTypes';

type SetFilter = (dispatch: DispatchType) => void;

export const setFilter = (data: string): SetFilter => {
  const action: SetFilterAction = {
    type: actionTypes.SET_FILTER,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};