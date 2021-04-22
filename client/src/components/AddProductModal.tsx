import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ProductForm from './forms/product/AddProduct';

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
  root: {

  },

  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },

  paper: {
      position: 'absolute',
      width: 450,
      height: 170,
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
    padding: '0 30px',
  },
}));

interface props {
  modalOpen: boolean
  setModalOpen: (values: boolean) => void;
}

const AddProductModal: React.FC<props> = (modalOpen, setModalOpen) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProductForm />
    </div>
  );
};

export default AddProductModal;  