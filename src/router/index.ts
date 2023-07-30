import { createRouter, createWebHistory } from "vue-router";

import Auth from "../pages/Auth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/Home.vue")
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
