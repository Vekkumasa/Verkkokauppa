
type OpenOrCloseModal = (dispatch: DispatchType) => void;

export const handleModal = (data: boolean, modal: Modal): OpenOrCloseModal => {
  const action: ModalAction = {
    type: '',
    modal,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

