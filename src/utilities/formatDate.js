export function getFullDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year + 543}${month < 10 ? `0${month}` : month}${
    day < 10 ? `0${day}` : day
  }`;
}

export function formatDate(date, zeroOddDate) {
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear() + 543;

  if (zeroOddDate) {
    return `${day < 10 ? `0${day}` : day} ${month} ${year}`;
  } else {
    return `${day} ${month} ${year}`;
  }
}

export function formatDateString(dateString) {
  const day = dateString.substring(6);
  const month = getMonthName(+dateString.substring(4, 6) - 1);
  const year = dateString.substring(0, 4);

  return `${+day} ${month} ${year}`;
}

export function formatShortDate(date, notDateString) {
  let day;
  let month;
  let year;

  if (notDateString) {
    day = date.getDate();
    month = getShortMonthName(date.getMonth());
    year = date.getFullYear() + 543;
  } else {
    day = parseInt(date.substring(6));
    month = getShortMonthName(+date.substring(4, 6) - 1);
    year = date.substring(0, 4);
  }

  return `${day} ${month} ${year}`;
}

export function splitDateString(dateString) {
  const day = +dateString.substring(6);
  const month = +dateString.substring(4, 6) - 1;
  const year = +dateString.substring(0, 4) - 543;
  return [year, month, day];
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

export function getShortMonthName(month) {
  const monthNames = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  return monthNames[month];
}
