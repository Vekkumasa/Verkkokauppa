import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";

import { logIn } from '../store/User/actionCreators';
import { useAppDispatch, AppDispatch, useAppSelector } from '../store/rootReducer';
import { setNotification } from '../store/Notification/actionCreators';
import LogInModal from '../modals/LogInModal';
import AddProductModal from '../modals/AddProductModal';
import CreateUserModal from '../modals/CreateUserModal';
import { clearShoppingCart } from '../store/ShoppingCart/actionCreators';
import { handleModal } from '../store/modal/actionCreators';
import shoppingCartService from '../services/shoppingCartService';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(10),
  },
  buttons: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: -12,
    fontSize: 15
  },
  login: {
    margin: theme.spacing(2),
    fontSize: 15,
  },
  addProductIcon: {
    height: 30,
    width: 30,
  },
  shoppingCart: {
    color: 'white',
    fontSize: 30
  }
}));

type Props = {
  user?: Credentials
};

const Navibar = ({ user }: Props): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  const cartId = useAppSelector(state => state.shoppingCartReducer.cartId);
  console.log('navibar:', cartId);
  
  const logOut = () => {
    void shoppingCartService.setShoppingCartActivity(cartId, false);
    dispatch(logIn());
    dispatch(clearShoppingCart());
    dispatch(setNotification("Have a nice day", 'success'));
  };

  const loggedIn = !!user;

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Verkkokauppa
          </Typography>
          <div className={classes.buttons}>
            {user?.userType === 'Admin' && (
              <IconButton onClick={() => dispatch(handleModal(true, 'AddProduct'))} color="inherit">
                <Tooltip title="Add product">
                  <AddCircleOutlineIcon className={classes.addProductIcon} />
                </Tooltip>
              </IconButton>
            )}
            <div>
              <Button onClick={() => loggedIn ? logOut() : dispatch(handleModal(true, 'LogIn'))} color="inherit">
                <Typography variant="h6" className={classes.login}>
                  {loggedIn ? 'Log out' : 'Login'}
                </Typography>
              </Button>
            </div>  
            {user && 
              <div>
                <Button onClick={() => dispatch(handleModal(true, 'CreateUser'))} color="inherit">
                  <Typography variant="h6" className={classes.login}>
                    Create User
                  </Typography>
                </Button>
              </div>  
            }
            <div>
              <Link to="/shoppingCart">
                <IconButton className={classes.shoppingCart} >
                  <ShoppingCartIcon style={{ fontSize: 30, marginTop: 5}}/>
                </IconButton>
              </Link>
            </div>
          </div>
        </Toolbar>
        <LogInModal />
        <AddProductModal />
        <CreateUserModal />
      </AppBar>
    </div>
  );
};

export {Navibar};
