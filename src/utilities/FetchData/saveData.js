import axios from "axios";
import getURL from "../getURL";
export async function saveData(data) {
  try {
    const response = await axios.post(`${getURL()}/booking-details`, data);
    return response.status === 200 ? response.data : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
