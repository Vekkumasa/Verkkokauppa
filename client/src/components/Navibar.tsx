import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, Typography, Toolbar, AppBar, Tooltip, TextField } from '@material-ui/core/';
import { AddCircleOutline, Menu, Search, ShoppingCart, Backspace } from '@material-ui/icons/';
import { Link, Redirect } from "react-router-dom";

import AccountMenu from './AccountMenu';
import { useAppDispatch, AppDispatch } from '../store/rootReducer';
import { setFilter } from '../store/Filter/actionCreators';
import LogInModal from '../modals/LogInModal';
import AddProductModal from '../modals/AddProductModal';
import CreateUserModal from '../modals/CreateUserModal';
import { handleModal } from '../store/modal/actionCreators';

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
  user?: Credentials,
  redirect: string,
};

const Navibar = ({ user, redirect }: Props): JSX.Element => {
  const [ searchText, setSearchText ] = useState('');

  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  

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

  
  return (
    <div>
      {redirect && <Redirect to={redirect} /> }
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
            placeholder="Etsi tuotteita"
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
            <Tooltip title="Tyhjennä hakukenttä">
              <Backspace className={classes.searchIcon} />
            </Tooltip>
          </IconButton>
          <div className={classes.buttons}>
            {user?.userType === 'Admin' && (
              <IconButton onClick={() => dispatch(handleModal(true, 'AddProduct'))} color="inherit">
                <Tooltip title="Lisää tuote">
                  <AddCircleOutline className={classes.addProductIcon} />
                </Tooltip>
              </IconButton>
            )}
            <div>
              {!user && 
                <Button onClick={() => dispatch(handleModal(true, 'LogIn'))} color="inherit">
                  <Typography variant="h6" className={classes.login}>
                    Kirjaudu sisään
                  </Typography>
                </Button>
              }
            </div>  
            {!user && 
              <div>
                <Button onClick={() => dispatch(handleModal(true, 'CreateUser'))} color="inherit">
                  <Typography variant="h6" className={classes.login}>
                    Luo käyttäjätili
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
            {user &&
              <div>
                <AccountMenu redirect={redirect} />
              </div>
            }
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
