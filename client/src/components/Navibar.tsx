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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

type UserProp = {
  user: Credentials | null
};

const Navibar: React.FC<UserProp> = (user) => {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
          {user.user === null ?
            <Button onClick={() => setModalOpen(true)} color="inherit">Login</Button>
            :
            <Button onClick={() => logOut()} color="inherit">Log Out</Button>
          }
          
        </Toolbar>
        <LogInModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </AppBar>
    </div>
  );
};

export default Navibar;
