import axios from "axios";
import getURL from "../getURL";

export async function getData(bookingId) {
  try {
    const response = await axios.get(
      `${getURL()}/booking-details/${bookingId}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
