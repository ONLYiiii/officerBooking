function addDate(date, dateCount) {
  const d = date.getDate();
  date.setDate(d + dateCount);
  return date;
}
export function getFullDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
}
