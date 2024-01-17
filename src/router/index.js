// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/",
        name: "bookingScreen",
        component: () => import("@/views/booking/bookingScreen.vue"),
      },
      {
        path: "/pdf",
        name: "printpdfScreen",
        component: () => import("@/views/booking/printpdfScreen.vue"),
      },
      {
        path: "/list",
        name: "bookingListScreen",
        component: () => import("@/views/booking/bookingListScreen.vue"),
      },
    ],
  },
  {
    path: "/officer",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/officer",
        name: "bookingListOfficerScreen",
        component: () => import("@/views/officerBooking/bookingListScreen.vue"),
      },
      {
        path: "/officer/stat",
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
