import * as actionTypes from "./actionTypes";

const initialState: UserState = {
  user: null
};

const reducer = (state: UserState = initialState, action: LogInAction): UserState => {

  switch (action.type) {
    case actionTypes.LOG_IN:
      return {
        ...state,
        user: action.data
      };
  }
  
  console.log('userstate', state);
  return state;
};

export default reducer;