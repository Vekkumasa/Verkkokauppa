import React from 'react';
import { Box, Grid, Typography, IconButton, Tooltip, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, Edit } from '@material-ui/icons/';

import { AppDispatch, useAppDispatch } from '../store/rootReducer';
import { handleModal } from '../store/modal/actionCreators';
import ModifyUserInfoModal from '../modals/ModifyUserInfoModal';
import ModifyUserAvatarModal from '../modals/ModifyUserAvatarModal';
import { parseDate } from '../utils/DateParser';
import { arrayBufferToBase64 } from '../utils/ArrayBufferToBase64';

const useStyles = makeStyles({
  nameAndIcon: {
    width: '50%',
    margin: '0 auto',
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: 'white',
    marginLeft: 15,
    width: 120,
    height: 120,
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    height: 20,
    color: 'white',
    borderRadius: '15%',
    backgroundColor: '#2525b8',
  },
});
interface AccountProps {
  user: Credentials | undefined  
}

interface HeaderProps {
  text: string
}

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
};

const Account = ({user}: AccountProps): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  if (!user) return <div></div>;

  const Header = ({text}: HeaderProps): JSX.Element => {
    return (
      <Typography className={`${classes.header}`}>{text}</Typography>
    );
  };

  const dates: string[] = [];
  const platformInfo: string[] = [];

  let counter = 0;
  for (let i = user.recentActivity.length -1; i >= 0; i--) {
    dates.push(parseDate(user.recentActivity[i]));
    platformInfo.push(user.platformInfo[i]);
    counter++;
    if (counter === 4) break;
  }

  let image;
  if (user?.avatar?.data) {
    const buffer = Buffer.from(user.avatar.data);
    image = arrayBufferToBase64(buffer);
  }

  

  return (
    <div>
      {user &&
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={3}>
            <Box borderRight={1} borderColor="primary.main" style={{ height: 270 }} {...defaultProps}>
              <div className={classes.nameAndIcon}>
                {image ?
                  <Avatar 
                    onClick={() => dispatch(handleModal(true, 'ModifyUserAvatar'))}
                    src={image}
                    className={classes.avatar}
                  />
                :
                  <Avatar
                    onClick={() => dispatch(handleModal(true, 'ModifyUserAvatar'))}
                    className={classes.avatar}
                  >
                    <AccountCircle style={{ color: '#094ebd', width: 120, height: 120 }}/>
                  </Avatar>
                }
                <Typography style={{ marginLeft: 5 }} variant='h6'>
                  {user.firstName} &nbsp; {user.lastName}
                </Typography>
              </div>
            </Box>
          </Grid>
          <div className={classes.column}>
            <Grid item xs={12}>
              <Box borderBottom={1} borderColor="primary.main" style={{ height: 120, width: 600 }} {...defaultProps}>
                <Header text="User info" />
                <Typography variant='subtitle1'>
                  Email: {user.email} <br/>
                  Firstname: {user.firstName} <br/>
                  Lastname: {user.lastName} 
                  <IconButton onClick={() => dispatch(handleModal(true, 'ModifyUser'))} style={{ position: 'relative',  left: 10, marginTop: -10 }}> 
                    <Tooltip title="Modify user info">
                      <Edit />
                    </Tooltip>
                  </IconButton><br/>
                </Typography>
               
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box borderBottom={1} borderColor="primary.main" style={{ height: 120, width: 600 }} {...defaultProps}>
              <Header text="Recent activity" />
              {dates.map((date, index) => (
                <Typography key={index}>{date}: {platformInfo[index]}</Typography>
              ))}
              </Box>
            </Grid>
          </div>
        </Grid>
      }
      <ModifyUserInfoModal />
      <ModifyUserAvatarModal />
    </div>
  );
};

export default Account;