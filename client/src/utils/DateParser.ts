export const parseDate = (date?: Date):string => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate().toString();
  const month = `${d.getMonth() + 1}`;
  const year = d.getFullYear().toString();
  const hour = d.getHours();
  const min = d.getMinutes();
  let hours;
  hour < 10 ? hours = '0' + hour.toString() : hours = hour.toString();
  let minutes;
  min < 10 ? minutes = '0' + min.toString() : minutes = min.toString();

  return day + '.' + month + '.' + year + '  ' + hours + ':' + minutes;
};