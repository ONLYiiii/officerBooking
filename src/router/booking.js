const bookingRoute = [
  {
    path: "/booking/",
    name: "bookingScreen",
    component: () => import("@/views/booking/bookingScreen.vue"),
  },
  {
    path: "/booking/pdf",
    name: "printpdfScreen",
    component: () => import("@/views/booking/printpdfScreen.vue"),
  },
  {
    path: "/booking/list",
    name: "bookingListScreen",
    component: () => import("@/views/booking/bookingListScreen.vue"),
  },
];

export default bookingRoute;
