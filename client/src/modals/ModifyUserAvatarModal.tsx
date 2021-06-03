import React, { useState } from "react";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, AppDispatch, useAppDispatch } from '../store/rootReducer';
import { handleModal } from '../store/modal/actionCreators';
import ModifyUserAvatar from "../forms/User/ModifyAvatar";

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    position: 'absolute',
    width: 650,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  header: {
    background: 'linear-gradient(45deg, #124eb0 70%, #501573 90%)',
    border: 0,
    borderRadius: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    textAlign: 'center',
    height: 30,
    marginTop: 5,
    padding: 10,
    marginBottom: 30
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <h2 className={classes.header}> Vaihda kuvake </h2>
  );
};

const ModifyUserAvatarModal: React.FC = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const modalOpen = useAppSelector(state => state.modalReducer);
  const dispatch: AppDispatch = useAppDispatch();
  
  const handleClose = () => {
    dispatch(handleModal(!modalOpen.modifyUserAvatarModal, 'ModifyUserAvatar'));
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={modalOpen.modifyUserAvatarModal}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <Header />
        <ModifyUserAvatar />
      </div>
    </Modal>
  );
};

export default ModifyUserAvatarModal;