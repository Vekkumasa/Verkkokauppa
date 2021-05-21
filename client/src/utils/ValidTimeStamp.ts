export const validTimeStamp = (d: Date): boolean => {
  const date = new Date(d);
  const currentTime = new Date();
  console.log('current:', currentTime.getHours(), '.', currentTime.getMinutes(), 'd:', date.getHours(), '.', date.getMinutes());
  return currentTime.getHours() - date.getHours() < 1;
};