// Composables
import { createRouter, createWebHistory } from "vue-router";

import booking from "./booking";
import officer from "./officer";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    redirect: "/booking",
    children: [...booking, ...officer],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
