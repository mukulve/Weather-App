import { createRouter, createWebHistory } from "vue-router";
import Weather from "../views/Weather.vue";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/Weather",
      name: "Weather",
      component: Weather,
    },
  ],
});

export default router;
