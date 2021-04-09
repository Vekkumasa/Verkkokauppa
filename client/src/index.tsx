  
import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import reducer from "./store/reducer";

const store: Store<ProductState, Actions> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk));

console.log('store', store.getState());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);