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
        component: () => import("@/views/bookingScreen.vue"),
      },
      {
        path: "/pdf",
        name: "printpdfScreen",
        component: () => import("@/views/printpdfScreen.vue"),
      },
      {
        path: "/list",
        name: "bookingListScreen",
        component: () => import("@/views/bookingListScreen.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
