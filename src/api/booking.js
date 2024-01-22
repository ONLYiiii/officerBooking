import axios from "axios";

async function getUserInfo() {
  //finish
  try {
    return await axios.get("/api/manage/login/auth/profile");
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return { status: 400, statusText: error.message };
  }
}

async function getDistrict(cc) {
  //finish
  return axios.request({
    method: "get",
    url: `/api/manage/tabdb/ccaattmm/${cc}`,
  });
}

async function getReport(dateStart, dateEnd, typeWork, typeService, status) {
  //finish
  const baseUrl = `api/booking/manage/booking/report/${dateStart}/${dateEnd}`;
  let queryString = "?";

  if (typeWork) {
    queryString += `typeWork=${typeWork}&`;
  }

  if (typeService) {
    queryString += `typeService=${typeService}&`;
  }

  if (status) {
    queryString += `status=${status}&`;
  }

  queryString[queryString.lastIndexOf("&")] = "";

  const fullUrl = baseUrl + queryString === "?" ? "" : queryString;

  return axios.request({
    method: "get",
    url: fullUrl,
  });
}

async function postBooking(body) {
  //finish
  return axios.request({
    method: "post",
    url: `api/booking/manage/booking`,
    body,
  });
}

async function putBooking(bookingId, citizenId, body) {
  return axios.request({
    method: "put",
    url: `api/booking/manage/booking/${bookingId}/${citizenId}`,
    body,
  });
}

async function getBookingOver(typeWork, typeService) {
  //finish
  return axios.request({
    method: "get",
    url: `/api/booking/manage/booking/bookingOver/${typeWork}?typeService=${typeService}`,
  });
}

async function getCitizenId(citizenId) {
  return axios.request({
    method: "get",
    url: `/api/booking/manage/booking/citizenId/${citizenId}`,
  });
}

async function getRcode(rcode, status) {
  return axios.request({
    method: "get",
    url: `/api/booking/manage/booking/rcode/${rcode}?status=${status}`,
  });
}

async function getHoliday() {
  //finish
  return axios.request({
    method: "get",
    url: `api/booking/manage/booking/holiday`,
  });
}

async function sendMail(body) {
  //finish
  return axios.request({
    method: "post",
    url: `api/booking/manage/booking/sendmail`,
    body,
  });
}

async function putBookingStatus(bookingId, citizenId, body) {
  return axios.request({
    method: "put",
    url: `api/booking/manage/booking/${bookingId}/${citizenId}`,
    body,
  });
}

export default {
  getUserInfo,
  getDistrict,
  getReport,
  postBooking,
  putBooking,
  getBookingOver,
  getCitizenId,
  getRcode,
  getHoliday,
  sendMail,
  putBookingStatus,
};
