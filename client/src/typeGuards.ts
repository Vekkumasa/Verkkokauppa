export const NotificationTypeCheck = (object: unknown): object is NotificationType => {
  if (object === 'error' || object === 'info' || object === 'success') {
    return true;
  }
  return false;
};