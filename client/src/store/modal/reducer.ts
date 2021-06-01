const initialState: ModalState = {
  createUserModal: false,
  logInModal: false,
  addProductModal: false,
  modifyUserInfoModal: false,
  modifyProductModal: false,
  modifyUserAvatarModal: false,
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
    case 'ModifyUser':
      return {
        ...state, modifyUserInfoModal: action.data
      };
    case 'ModifyProduct':
      return {
        ...state, modifyProductModal: action.data
      };
    case 'ModifyUserAvatar':
      return {
        ...state, modifyUserAvatarModal: action.data
      };
    default: 
      return state;
  }

};

export default reducer;