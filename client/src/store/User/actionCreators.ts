import * as actionTypes from "./actionTypes";

export const logIn = (data: Credentials | null) => {
  const action: LogInAction = {
    type: actionTypes.LOG_IN,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};