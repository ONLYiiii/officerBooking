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
      this.bookingDetails.citizen_id = newValue.citizen_id;
      this.bookingDetails.booking_id = newValue.booking_id;
      this.bookingDetails.rcode = newValue.rcode;
      this.bookingDetails.date_booking = newValue.date_booking;
      this.bookingDetails.type_work = newValue.type_work;
      this.bookingDetails.type_service = newValue.type_service;
      this.bookingDetails.time_booking = newValue.time_booking;
      this.bookingDetails.status = newValue.status;
    },
    printData() {
      console.log(this.bookingDetails);
    },
  },
});
