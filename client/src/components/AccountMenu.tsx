import React from 'react';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import { IconButton, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { Person, ShoppingBasket, AccountCircle } from '@material-ui/icons';

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

const AccountMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <Link to="/account" style={{ textDecoration: 'none' }}>
          <StyledMenuItem>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
            <ListItemText primary="Personal info" />
          </StyledMenuItem>
        </Link>
        <StyledMenuItem onClick={() => alert('Not ready yet')}>
          <ListItemIcon>
            <ShoppingBasket fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Past orders" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default AccountMenu;