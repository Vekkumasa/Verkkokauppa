import React from 'react';
import { Box, Grid, Typography, IconButton, Tooltip, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, Edit } from '@material-ui/icons/';

import { AppDispatch, useAppDispatch } from '../store/rootReducer';
import { handleModal } from '../store/modal/actionCreators';
import ModifyUserInfoModal from '../modals/ModifyUserInfoModal';

const useStyles = makeStyles({
  nameAndIcon: {
    width: '50%',
    margin: '0 auto',
    flexGrow: 1
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

  const parseDate = (date: Date):string => {
    const d = new Date(date);
    const day = d.getDate().toString();
    const month = `${d.getMonth() + 1}`;
    const year = d.getFullYear().toString();
    const hour = d.getHours().toString();
    const minutes = d.getMinutes().toString();
    return day + '.' + month + '.' + year + '  ' + hour + ':' + minutes;
  };

  const dates: string[] = [];
  let counter = 0;
  for (let i = user.recentActivity.length -1; i >= 0; i--) {
    dates.push(parseDate(user.recentActivity[i]));
    counter++;
    if (counter === 4) break;
  }

  console.log(dates);
  return (
    <div>
      {user &&
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={3}>
            <Box borderRight={1} borderColor="primary.main" style={{ height: 270 }} {...defaultProps}>
              <div className={classes.nameAndIcon}>
                {user.avatar ?
                <Avatar style={{ backgroundColor: 'white', marginLeft: 15, width: 120, height: 120 }} src={user.avatar} />
                :
                <Avatar style={{ backgroundColor: 'white', marginLeft: 15, width: 120, height: 120 }}>
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
                <Typography key={index}>{date}</Typography>
              ))}
              </Box>
            </Grid>
          </div>
        </Grid>
      }
      <ModifyUserInfoModal />
    </div>
  );
};

export default Account;