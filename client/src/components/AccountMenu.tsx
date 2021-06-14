import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import { IconButton, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { Person, ShoppingBasket, AccountCircle, ExitToApp } from '@material-ui/icons';
import { AppDispatch, useAppDispatch, useAppSelector } from '../store/rootReducer';
import { setNotification } from '../store/Notification/actionCreators';
import { clearShoppingCart } from '../store/ShoppingCart/actionCreators';
import { logIn } from '../store/User/actionCreators';
import shoppingCartService from '../services/shoppingCartService';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface Props {
  redirect: string,
  setRedirect: React.Dispatch<React.SetStateAction<string>>
};

const AccountMenu = ({ redirect, setRedirect }: Props): JSX.Element => {
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

  const dispatch: AppDispatch = useAppDispatch();

  const cartId = useAppSelector(state => state.shoppingCartReducer.cartId);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    void shoppingCartService.setShoppingCartActivity(cartId, false);
    dispatch(logIn());
    dispatch(clearShoppingCart());
    dispatch(setNotification("Have a nice day", 'success'));
    window.localStorage.removeItem('loggedUser');
    setRedirect('/');
  };

  // TODO: FIXAA REDIRECTI (Toimi navibarissa)
  return (
    <div>
      {redirect && <Redirect to={redirect} /> }
      <IconButton style={{ color: 'white'}} onClick={handleClick}>
        <AccountCircle style={{ fontSize: 30, marginTop: 5}}/>
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/account" style={{ textDecoration: 'none', color: 'black' }}>
          <StyledMenuItem>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
            <ListItemText primary="Käyttäjätiedot" />
          </StyledMenuItem>
        </Link>
        <Link to="/pastOrders" style={{ textDecoration: 'none', color: 'black' }}>
          <StyledMenuItem>
            <ListItemIcon>
              <ShoppingBasket fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Aikaisemmat tilaukset" />
          </StyledMenuItem>
        </Link>
        <StyledMenuItem onClick={() => logOut()}>
            <ListItemIcon>
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Kirjaudu ulos" />
          </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default AccountMenu;