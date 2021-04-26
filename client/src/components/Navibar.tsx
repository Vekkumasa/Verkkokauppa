import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import { logIn } from '../store/User/actionCreators';
import { useAppDispatch, AppDispatch } from '../store/rootReducer';
import LogInModal from './modals/LogInModal';
import AddProductModal from './modals/AddProductModal';
import CreateUserModal from './modals/CreateUserModal';

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
  }
}));

type UserProp = {
  user: Credentials | null
};

const Navibar: React.FC<UserProp> = ({ user }) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [createUserModalOpen, setCreateUserModalOpen] = useState<boolean>(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState<boolean>(false);

  const logOut = () => {
    dispatch(logIn(null));
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Verkkokauppa
          </Typography>
          <div className={classes.buttons}>
            {user !== null && user.userType === 'Admin' ?
              <IconButton onClick={() => setAddProductModalOpen(true)} color="inherit">
                <Tooltip title="Add product">
                  <AddCircleOutlineIcon className={classes.addProductIcon} />
                </Tooltip>
              </IconButton>
            :
              null
            }
            {user === null ?
              <div>
                <Button onClick={() => setLoginModalOpen(true)} color="inherit">
                  <Typography variant="h6" className={classes.login}>
                    Login
                  </Typography>
                </Button>
              </div>  
              :
              <div>
                <Button  onClick={() => logOut()} color="inherit">
                  <Typography variant="h6" className={classes.login}>
                    Log out
                  </Typography>
                </Button>
              </div>
            }
            {user === null ?
              <div>
                <Button onClick={() => setCreateUserModalOpen(true)} color="inherit">
                  <Typography variant="h6" className={classes.login}>
                    Create User
                  </Typography>
                </Button>
              </div>  
              :
              null
            }
          </div>
        </Toolbar>
        <LogInModal modalOpen={loginModalOpen} setModalOpen={setLoginModalOpen} />
        <AddProductModal modalOpen={addProductModalOpen} setModalOpen={setAddProductModalOpen} />
        <CreateUserModal modalOpen={createUserModalOpen} setModalOpen={setCreateUserModalOpen} />
      </AppBar>
    </div>
  );
};

export default Navibar;
