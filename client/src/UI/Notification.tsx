import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useAppDispatch, AppDispatch } from '../store/rootReducer';
import { makeStyles } from '@material-ui/core/styles';
import { hideNotification } from '../store/Notification/actionCreators';

interface NotificationProps {
  type: NotificationType,
  message: string,
  tts?: number
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

const useStyles = makeStyles({
  root: {
    width: '15%',
    position: 'relative',
    marginBottom: 15,
    left: 15,
  },
});

const Notification: React.FC<NotificationProps> = ({ type, message, tts = 5000 }: NotificationProps) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  setTimeout(() => dispatch(hideNotification()), tts);

  return (
    <div className={classes.root}>
      <Alert type={type} message={message} />
    </div>
  );
};

export default Notification;