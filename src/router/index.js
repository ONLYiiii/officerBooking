// Composables
import { createRouter, createWebHistory } from "vue-router";

import bookingRoute from "./booking";
import officerRoute from "./officer";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    redirect: "/booking",
    children: [...bookingRoute, ...officerRoute],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
