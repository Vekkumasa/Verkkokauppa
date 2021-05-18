import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, Typography, Toolbar, AppBar, Tooltip, TextField } from '@material-ui/core/';
import { AddCircleOutline, Menu, Search, ShoppingCart, Backspace, AccountCircle } from '@material-ui/icons/';
import { Link } from "react-router-dom";

import { logIn } from '../store/User/actionCreators';
import { useAppDispatch, AppDispatch, useAppSelector } from '../store/rootReducer';
import { setNotification } from '../store/Notification/actionCreators';
import { setFilter } from '../store/Filter/actionCreators';
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
    flexDirection: 'column'
  },
  addProductIcon: {
    height: 30,
    width: 30,
  },
  whiteIcon: {
    color: 'white',
    fontSize: 30
  },
  searchIcon: {
    color: 'white',
  }
}));

type Props = {
  user?: Credentials
};

const Navibar = ({ user }: Props): JSX.Element => {
  const [ searchText, setSearchText ] = useState('');
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  const cartId = useAppSelector(state => state.shoppingCartReducer.cartId);
  
  const logOut = () => {
    void shoppingCartService.setShoppingCartActivity(cartId, false);
    dispatch(logIn());
    dispatch(clearShoppingCart());
    dispatch(setNotification("Have a nice day", 'success'));
  };

  const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };

  const filterProducts = () => {
    dispatch(setFilter(searchText));
  };

  const clearFilter = () => {
    setSearchText('');
    dispatch(setFilter(''));
  };

  const loggedIn = !!user;

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Verkkokauppa
          </Typography>
          <TextField 
            placeholder="Search products"
            onChange={handleSearchText}
            style={{ backgroundColor: '#dae1f0'}}
            size="small"
            variant="outlined"
            value={searchText}
          />
          <IconButton onClick={() => filterProducts()}>
            <Search className={classes.searchIcon}/>
          </IconButton>
          <IconButton onClick={() => clearFilter()}>
            <Tooltip title="Clear searchbar">
              <Backspace className={classes.searchIcon} />
            </Tooltip>
          </IconButton>
          <div className={classes.buttons}>
            {user?.userType === 'Admin' && (
              <IconButton onClick={() => dispatch(handleModal(true, 'AddProduct'))} color="inherit">
                <Tooltip title="Add product">
                  <AddCircleOutline className={classes.addProductIcon} />
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
            {!user && 
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
                <IconButton className={classes.whiteIcon} >
                  <ShoppingCart style={{ fontSize: 30, marginTop: 5}}/>
                </IconButton>
              </Link>
            </div>
            <div>
              <Link to="/account">
                <IconButton className={classes.whiteIcon}>
                  <AccountCircle style={{ fontSize: 30, marginTop: 5}}/>
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

export { Navibar };
