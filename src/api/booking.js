import axios from "axios";

async function getUserInfo() {
  //finish in app.vue
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
  //finish in officer /statScreen
  const path = `/api/booking/manage/booking/report/${dateStart}/${dateEnd}`;
  const dummyBaseUrl = "https://dummy.com";

  const url = new URL(path, dummyBaseUrl)

  if (typeWork) {
    url.searchParams.set('typeWork', typeWork);
  }

  if (typeService) {
    url.searchParams.set('typeService', typeService);
  }

  if (status !== null) {
    url.searchParams.set('status', status);
  }

  const fullUrl = url.pathname + url.search;

  console.log(fullUrl)

  return axios.request({
    method: "get",
    url: fullUrl,
  });
}

// async function postBooking(body) {
//   //finish in DialogInfo
//   return axios.request({
//     method: "post",
//     url: `api/booking/manage/booking`,
//     body,
//   });
// }

async function postBooking(body) {
  return axios.post("/api/booking/manage/booking", body);
}

async function putBooking(bookingId, citizenId, body) {
  return axios.request({
    method: "put",
    url: `/api/booking/manage/booking/${bookingId}/${citizenId}`,
    body,
  });
}

async function getBookingOver(typeWork, typeService) {
  //finish in /bookingScreen
  return axios.request({
    method: "get",
    url: `/api/booking/manage/booking/bookingOver/${typeWork}?typeService=${typeService}`,
  });
}

async function getCitizenId(citizenId) {
  //finish /bookingListScreen
  return axios.request({
    method: "get",
    url: `/api/booking/manage/booking/citizenId/${citizenId}`,
  });
}

async function getRcode(rcode, status) {
  //finish
  let fullUrl = `/api/booking/manage/booking/rcode/${rcode}`;
  if (status) {
    fullUrl += `?status=${status}`;
  }

  return axios.request({
    method: "get",
    url: fullUrl,
  });
}

async function getHoliday() {
  //finish
  return axios.request({
    method: "get",
    url: `/api/booking/manage/booking/holiday`,
  });
}

// async function sendMail(body) {
//   //finish
//   return axios.request({
//     method: "post",
//     url: `api/booking/manage/booking/sendmail`,
//     body,
//   });
// }

async function sendMail(body) {
  return axios.post("/api/booking/manage/booking/sendmail", body);
}

async function putBookingStatus(bookingId, citizenId, body) {
  //finish
  return axios.request({
    method: "put",
    url: `/api/booking/manage/booking/status/${bookingId}/${citizenId}`,
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
