import * as actionTypes from "./actionTypes";

const initialState: NotificationState = {
  message: '',
  type: 'error',
  visible: false
};

const reducer = (state: NotificationState = initialState, action: SetNotificationAction): NotificationState => {

  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        message: action.data,
        type: action.notificationType,
        visible: true
      };
    case actionTypes.HIDE_NOTIFICATION:
      return {
        ...state,
        message: '',
        type: action.notificationType,
        visible: false
      };
  }
  
  return state;
};

export default reducer;