import { createRouter, createWebHistory } from "vue-router";

import Auth from "../pages/Auth.vue";
import Home from "../pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/auth",
      component: Auth,
      beforeEnter: (to) => {
        return to.query.code ? true : false;
      }
    }
  ]
});

export default router;
