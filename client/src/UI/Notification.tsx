import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { AppDispatch, useAppDispatch } from '../store/rootReducer';
import { setNotification } from '../store/Notification/actionCreators';

interface NotificationProps {
  type: NotificationType,
  message: string
}

const Alert: React.FC<NotificationProps> = ({ type, message }: NotificationProps) => {

  switch (type) {
    case 'success':
      return <MuiAlert elevation={6} variant="filled" severity="success" > {message} </MuiAlert>;

    case 'error':
      return <MuiAlert elevation={6} variant="filled" severity="error" > {message} </MuiAlert>;

    default:
      return <MuiAlert elevation={6} variant="filled" severity="info" > {message} </MuiAlert>;
    
  }
  
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification: React.FC<NotificationProps> = ({ type, message }: NotificationProps) => {
  const classes = useStyles();
  console.log('type', type, 'message', message);
  return (
    <div className={classes.root}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Alert type={type} message={message} />
    </div>
  );
};

export default Notification;