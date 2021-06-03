export const validTimeStamp = (d: Date): boolean => {
  const date = new Date(d);
  const currentTime = new Date();
  return currentTime.getHours() - date.getHours() < 1;
};