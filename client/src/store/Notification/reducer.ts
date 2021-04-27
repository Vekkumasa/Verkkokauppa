import * as actionTypes from "./actionTypes";

const initialState: NotificationState = {
  notification: '',
  visible: false
};

const reducer = (state: NotificationState = initialState, action: SetNotificationAction): NotificationState => {

  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.data
      };
  }
  
  console.log('notificationstate', state);
  return state;
};

export default reducer;