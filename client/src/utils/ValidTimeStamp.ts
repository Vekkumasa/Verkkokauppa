export const validTimeStamp = (d: Date): boolean => {
  const date = new Date(d);
  const currentTime = new Date();
  console.log('d:', date.getHours(), '.', date.getMinutes(), 'current:', currentTime.getHours(), '.', currentTime.getMinutes());
  return currentTime.getMinutes() - date.getMinutes() < 10;
};