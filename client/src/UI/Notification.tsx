import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  root: {
    width: '15%',
    position: 'relative',
    marginBottom: 15,
    left: 15,
  },
});

const Notification: React.FC<NotificationProps> = ({ type, message }: NotificationProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert type={type} message={message} />
    </div>
  );
};

export default Notification;