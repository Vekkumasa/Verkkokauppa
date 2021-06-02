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

export const setTag = (data?: Tag): SetFilter => {
  const action: SetTagAction = {
    type: actionTypes.SET_TAG,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};