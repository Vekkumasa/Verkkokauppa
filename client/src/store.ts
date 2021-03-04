import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productReducer from './reducers/productReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  products: productReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));