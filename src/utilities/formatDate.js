export function formatDate(date) {
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear() + 543; // Adding 543 to get the Buddhist era year

  return `${day} ${month} ${year}`;
}

export function formatDateString(dateString) {
  const day = dateString.substring(6);
  const month = getMonthName(+dateString.substring(4, 6) - 1);
  const year = dateString.substring(0, 4); // Adding 543 to get the Buddhist era year

  return `${day} ${month} ${year}`;
}

export function getMonthName(month) {
  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return monthNames[month];
}
