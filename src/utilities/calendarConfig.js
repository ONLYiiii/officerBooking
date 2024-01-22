export function allowedDate(val) {
  const isAllowedDate = val.getDay() !== 0 && val.getDay() !== 6;
  // '2024-01-18'
  return isAllowedDate;
}
