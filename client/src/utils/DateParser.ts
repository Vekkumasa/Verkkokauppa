export const parseDate = (date?: Date):string => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate().toString();
  const month = `${d.getMonth() + 1}`;
  const year = d.getFullYear().toString();
  const hour = d.getHours().toString();
  const min = d.getMinutes();
  let minutes;
  min < 10 ? minutes = '0' + min.toString() : minutes = min.toString();

  return day + '.' + month + '.' + year + '  ' + hour + ':' + minutes;
};