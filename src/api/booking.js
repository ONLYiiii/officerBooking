import axios from "axios";
axios.defaults.headers = {
  "X-User-Agent": "iservice/1.0.0",
};
async function getUserInfo() {
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
  return axios.request({
    method: "get",
    url: `/api/hoteltabdb/ccaattmm/${cc}`,
  });
}

async function getReport(
  dateStart,
  dateEnd,
  typeWork,
  typeService,
  status,
  rcode
) {
  const path = `/api/booking/manage/booking/report/${dateStart}/${dateEnd}`;
  const dummyBaseUrl = "https://dummy.com";

  const url = new URL(path, dummyBaseUrl);

  if (typeWork) {
    url.searchParams.set("typeWork", typeWork);
  }

  if (typeService) {
    url.searchParams.set("typeService", typeService);
  }

  if (status !== null) {
    url.searchParams.set("status", status);
  }

  if (rcode) {
    url.searchParams.set("rcode", rcode);
  }

  const fullUrl = url.pathname + url.search;

  return axios.request({
    method: "get",
    url: fullUrl,
  });
}

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
  console.log(
    `/api/booking/manage/booking/bookingOver/${typeWork}?typeService=${typeService}`
  );
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

async function getHoliday() {
  //finish
  return axios.request({
    method: "get",
    url: `/api/booking/manage/booking/holiday`,
  });
}

async function sendMail(body) {
  return axios.post("/api/booking/manage/booking/sendmail", body);
}

async function putBookingStatus(rcode, bookingId, citizenId, body) {
  return axios.put(
    `/api/booking/manage/booking/status/${rcode}/${bookingId}/${citizenId}`,
    body
  );
}

export default {
  getUserInfo,
  getDistrict,
  getReport,
  postBooking,
  putBooking,
  getBookingOver,
  getCitizenId,
  // getRcode,
  getHoliday,
  sendMail,
  putBookingStatus,
};
