  
import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, Store, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import productReducer from "./store/Product/reducer";
import userReducer from "./store/User/reducer";

const reducer = combineReducers<AppState>({
  products: productReducer,
  user: userReducer
});

const store: Store & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);