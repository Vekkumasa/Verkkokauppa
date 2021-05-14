

const initialState: ModalState = {
  createUserModal: false,
  logInModal: false,
  addProductModal: false,
};

const reducer = (state: ModalState = initialState, action: ModalAction): ModalState => {
  switch (action.modal) {
    case 'AddProduct':
      return {
        ...state, addProductModal: action.data
      };
    case 'CreateUser':
      return {
        ...state, createUserModal: action.data
      };
    case 'LogIn':
      return {
        ...state, logInModal: action.data
      };
    default: 
      return state;
  }

};

export default reducer;