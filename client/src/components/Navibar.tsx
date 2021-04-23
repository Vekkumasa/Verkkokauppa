import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { logIn } from '../store/User/actionCreators';

import { Link } from "react-router-dom";
import LogInModal from './LogInModal';
import AddProductModal from './AddProductModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(10),
  },

  login: {

  },

  addProduct: {
    
  }

}));

type UserProp = {
  user: Credentials | null
};

const Navibar: React.FC<UserProp> = ({ user }) => {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState<boolean>(false);
  const logOut = () => {
    dispatch(logIn(null));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link to={'/'}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Verkkokauppa
          </Typography>
          {user !== null && user.userType === 'Admin' ?
            <Button className={classes.addProduct} onClick={() => setAddProductModalOpen(true)} color="inherit">
              <Typography variant="h6" className={classes.title}>
                Add Product
              </Typography>
            </Button>
          :
            null
          }
          {user === null ?
            <div>
              <Button className={classes.login} onClick={() => setLoginModalOpen(true)} color="inherit">Login</Button>
            </div>  
            :
            <div>
              <Button className={classes.login} onClick={() => logOut()} color="inherit">Log Out</Button>
            </div>
          }
          
        </Toolbar>
        <LogInModal modalOpen={loginModalOpen} setModalOpen={setLoginModalOpen} />
        <AddProductModal modalOpen={addProductModalOpen} setModalOpen={setAddProductModalOpen} />
      </AppBar>
    </div>
  );
};

export default Navibar;
