import { formatShortDate } from "@/utilities/formatDate";

import typework from "@/json/typework.json";
import service from "@/json/service.json";

export function convertWorkCode(workCode) {
  const index = typework.findIndex((item) => {
    return item.code === workCode;
  });
  return typework[index].work;
}
export function convertServiceCode(serviceCode) {
  const index = service.findIndex((item) => {
    return item.code === serviceCode;
  });
  return service[index].service;
}
export function convertTimeBooking(timeBooking) {
  if (timeBooking === 1) {
    return `<p class="text-center">เช้า<br/>(09.00-11.00)</p>`;
  } else {
    return `<p class="text-center">บ่าย<br/>(13.00-15.00)</p>`
  }
  
}
export function convertDate(dateBooking) {
  return formatShortDate(dateBooking);
}
export function convertStatus(status) {
  switch(status) {
    case 0:
      return 'นัดหมาย'
    case 1:
      return 'ยกเลิก'
    case 2:
      return ''
    default:
      return 'ผิดพลาด'
  }
}
