import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import productReducer from './Product/reducer';
import userReducer from './User/reducer';
import notificationReducer from './Notification/reducer';
import shoppingCartReducer from './ShoppingCart/reducer';
import modalReducer from './modal/reducer';
import filterReducer from './Filter/reducer';

const rootReducer = combineReducers({
  productReducer,
  userReducer,
  notificationReducer,
  shoppingCartReducer,
  modalReducer,
  filterReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch  => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;