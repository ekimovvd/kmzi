import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

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
  {
    path: "/visener",
    name: "Visener",
    component: () => import("../views/Visener.vue"),
  },
  {
    path: "/playfair",
    name: "Playfair",
    component: () => import("../views/Playfair.vue"),
  },
  {
    path: "/frequency",
    name: "Frequency",
    component: () => import("../views/Frequency.vue"),
  },
  {
    path: "/gamming",
    name: "Gamming",
    component: () => import("../views/Gamming.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
