//* Stores Import
import { useUserInfoStore } from "@/stores/user_info";
import { useBookingDetailsStore } from "@/stores/booking_details";
import { useStartupDialogStore } from "@/stores/startup_dialog";
import { useDistrictStore } from "@/stores/district";

export function getUserInfoStore() {
  return useUserInfoStore();
}

export function getBookingDetailsStore() {
  return useBookingDetailsStore();
}

export function getStartupDialogStore() {
  return useStartupDialogStore();
}

export function getDistrictStore() {
  return useDistrictStore();
}