import { createRouter, createWebHistory } from "vue-router";
import { AuthTemplate, Dash, Home, LoggedTemplate, Login } from "@/components";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { template: LoggedTemplate, transition: "fade" },
    },
    {
      path: "/dash",
      name: "dash",
      component: Dash,
      meta: { template: LoggedTemplate, transition: "fade" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { template: AuthTemplate, transition: "fade" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
