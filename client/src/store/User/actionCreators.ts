import * as actionTypes from "./actionTypes";

type Login = (dispatch: DispatchType) => void;

export const logIn = (data?: Credentials): Login => {
  const action: LogInAction = {
    type: actionTypes.LOG_IN,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};