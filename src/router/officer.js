const officer = [
  {
    path: "/booking/officer",
    name: "bookingListOfficerScreen",
    component: () => import("@/views/officerBooking/bookingListScreen.vue"),
  },
  {
    path: "/booking/officer/stat",
    name: "statScreen",
    component: () => import("@/views/officerBooking/statScreen.vue"),
  },
];

export default officer;
