// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    redirect: '/booking',
    children: [
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
