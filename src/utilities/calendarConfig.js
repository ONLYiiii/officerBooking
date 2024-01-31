export function allowedDate(val) {
  const isAllowedDate = val.getDay() !== 0 && val.getDay() !== 6;
  return isAllowedDate;
}
