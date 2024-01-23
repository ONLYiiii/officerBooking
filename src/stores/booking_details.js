import { defineStore } from "pinia";

export const useBookingDetailsStore = defineStore("bookingDetails", {
  state: () => {
    return {
      bookingDetails: {
        citizen_id: 0,
        booking_id: 0,
        rcode: "",
        date_booking: "",
        type_work: "",
        type_service: "",
        time_booking: 0,
        status: 0,
      },
    };
  },
  actions: {
    setNewValue(newValue) {
      this.bookingDetails.citizen_id = newValue.citizenId;
      this.bookingDetails.booking_id = newValue.bookingId;
      this.bookingDetails.rcode = newValue.rcode;
      this.bookingDetails.date_booking = newValue.dateBooking + '';
      this.bookingDetails.type_work = newValue.typeWork;
      this.bookingDetails.type_service = newValue.typeService;
      this.bookingDetails.time_booking = newValue.timeBooking;
      this.bookingDetails.status = newValue.status;
    },
    printData() {
      console.log(this.bookingDetails);
    },
  },
});
