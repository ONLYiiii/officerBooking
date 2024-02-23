// Composables
import { createRouter, createWebHistory } from "vue-router";

import booking from "./booking";
import officer from "./officer";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    redirect: "/booking/officer",
    children: [...booking, ...officer],
  },
];

const router = createRouter({
  history: createWebHistory("/web/booking/officer/"),
  routes,
});

export default router;
