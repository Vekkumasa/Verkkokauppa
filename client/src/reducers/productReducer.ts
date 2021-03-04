import productService from '../services/products';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;

    default: 
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await productService.getAllProducts();
    dispatch({
      type: 'INIT',
      data
    });
  };
};

export default reducer;