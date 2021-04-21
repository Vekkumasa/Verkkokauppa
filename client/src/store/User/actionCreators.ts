import * as actionTypes from "./actionTypes";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const logIn = (data: Credentials | null) => {
  const action: LogInAction = {
    type: actionTypes.LOG_IN,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};