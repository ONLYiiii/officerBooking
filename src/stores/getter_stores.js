//* Stores Import
import { useUserInfoStore } from "@/stores/user_info";
import { useBookingDetailsStore } from "@/stores/booking_details";
import { useStartupDialogStore } from "@/stores/startup_dialog";

export function getUserInfoStore() {
  return useUserInfoStore();
}

export function getBookingDetailsStore() {
  return useBookingDetailsStore();
}

export function getStartupDialogStore() {
  return useStartupDialogStore();
}
