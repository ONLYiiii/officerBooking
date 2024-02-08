export function allowedDate(val) {
  return val.getDay() !== 0 && val.getDay() !== 6;
}
