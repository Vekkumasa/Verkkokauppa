import * as actionTypes from "./actionTypes";

type SetNotification = (dispatch: DispatchType) => void;

export const setNotification = (data: string): SetNotification => {
  const action: SetNotificationAction = {
    type: actionTypes.SET_NOTIFICATION,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};