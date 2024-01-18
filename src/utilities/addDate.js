export default function addDate(date, dateCount) {
  const d = date.getDate();
  date.setDate(d + dateCount);
  return date.toISOString();
}
