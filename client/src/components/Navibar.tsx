import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from "react-router-dom";

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

interface Props {
  setModalOpen: (values: boolean) => void;
}

const Navibar: React.FC<Props> = ({ setModalOpen }) => {
  const classes = useStyles();



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
          <Button onClick={() => setModalOpen(true)} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navibar;
