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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
