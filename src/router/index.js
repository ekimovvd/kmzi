import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/atbash",
    name: "Atbash",
    component: () => import("../views/Atbash.vue"),
  },
  {
    path: "/caesar",
    name: "Caesar",
    component: () => import("../views/Caesar.vue"),
  },
  {
    path: "/richelieu",
    name: "Richelieu",
    component: () => import("../views/Richelieu.vue"),
  },
  {
    path: "/gronsfeld",
    name: "Gronsfeld",
    component: () => import("../views/Gronsfeld.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
