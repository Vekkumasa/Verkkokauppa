
type OpenOrCloseModal = (dispatch: DispatchType) => void;

export const handleModal = (data: boolean, modal: Modal): OpenOrCloseModal => {
  const action: ModalAction = {
    type: '',
    modal,
    data
  };

  console.log('Handle modal action', action);
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

