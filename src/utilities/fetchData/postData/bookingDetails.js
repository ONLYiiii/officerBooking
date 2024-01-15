import axios from "axios";
import { useBookingDetailsStore } from "@/stores/booking_details";
export default async function bookingDetails() {
  const bookingDetailsStore = useBookingDetailsStore();
  const {
    citizen_id,
    rcode,
    date_booking,
    type_work,
    type_service,
    time_booking,
  } = bookingDetailsStore.bookingDetails;
  const sendData = {
    citizenId: citizen_id,
    rcode: rcode,
    dateBooking: date_booking,
    typeWork: type_work,
    typeService: type_service,
    timeBooking: time_booking,
  };
  const response = await axios.post("", sendData);
  response.data;
}
