import * as actionTypes from "./actionTypes";
import { notificationTypeCheck } from '../../typeGuards';

type SetNotification = (dispatch: DispatchType) => void;

export const setNotification = (data: string, notificationType: NotificationType): SetNotification => {
  if (notificationTypeCheck(notificationType)) {
    const action: SetNotificationAction = {
      type: actionTypes.SET_NOTIFICATION,
      notificationType: notificationType,
      data,
    };
  
    return (dispatch: DispatchType) => {
      dispatch(action);
    };
  }
  else {
    const action: SetNotificationAction = {
      type: actionTypes.SET_NOTIFICATION,
      notificationType: 'error',
      data,
    };
  
    return (dispatch: DispatchType) => {
      dispatch(action);
    };
  }
};

export const hideNotification = (): SetNotification => {
    const action: SetNotificationAction = {
      type: actionTypes.HIDE_NOTIFICATION,
      notificationType: 'error',
      data: '',
    };
  
    return (dispatch: DispatchType) => {
      dispatch(action);
    };
};