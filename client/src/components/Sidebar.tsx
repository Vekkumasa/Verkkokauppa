import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import { FreeBreakfast, Build, Home, AllInclusive, BarChart } from '@material-ui/icons';
import { AppDispatch, useAppDispatch, useAppSelector } from '../store/rootReducer';
import { setTag } from '../store/Filter/actionCreators';

const useStyles = makeStyles(
  createStyles({
    container: {
      position: 'relative',
    },
    appMenu: {
      width: '100%',
    },
    menuItem: {
      height: 70,
      width: 240,
    },
    menuIcon: {
      color: '#3f51b5',
    }
  }),
);

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  const tagi: Tag | undefined = useAppSelector(state => state.filterReducer.tagFilter);

  return (
    <div className={classes.container}>
      <Link to="/" style={{ textDecoration: 'none', color: 'rgb(0,0,0)' }}>
        <List className={classes.appMenu} disablePadding>
          <ListItem onClick={() => dispatch(setTag())} divider button className={classes.menuItem}>
            <ListItemIcon className={classes.menuIcon}>
              <AllInclusive />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItem>

          <ListItem onClick={() => dispatch(setTag('Kirves'))} divider button className={classes.menuItem}>
            <ListItemIcon className={classes.menuIcon}>
              <Build />
            </ListItemIcon>
            <ListItemText primary="Kirves" />
          </ListItem>

          <ListItem onClick={() => dispatch(setTag('Ruoka/Juoma'))} divider button className={classes.menuItem}>
            <ListItemIcon className={classes.menuIcon}>
              <FreeBreakfast />
            </ListItemIcon>
            <ListItemText primary="Ruoka/Juoma" />
          </ListItem>

          <ListItem onClick={() => dispatch(setTag('Mokki Essential'))} divider button className={classes.menuItem}>
            <ListItemIcon className={classes.menuIcon}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Mokki Essential" />
          </ListItem>

          <ListItem onClick={() => dispatch(setTag('muut'))} divider button className={classes.menuItem}>
            <ListItemIcon className={classes.menuIcon}>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Muut" />
          </ListItem>

        </List>
      </Link>
    </div>
  );
};

export default Sidebar;