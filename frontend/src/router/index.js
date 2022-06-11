import { createRouter, createWebHistory } from "vue-router";
import LoginEmail from "../views/loginEmail.vue";
import LoginPassword from "../views/loginPassword.vue";
import Register from "../views/register.vue";
import Dashbboard from "../views/dashboard.vue";

const routes = [
  { path: "/register", component: Register },
  { path: "/login", component: LoginEmail },
  { path: "/password", component: LoginPassword },
  { path: "/dashboard", component: Dashbboard },
  { path: "/:catchAll(.*)", component: LoginEmail },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// const router = new VueRouter({ mode: 'history', routes });

router.beforeEach((to, from, next) => {
  const protectedRoutes = ['/password', '/password/'];
  if (from.path !== '/login' && protectedRoutes.includes(to.path)) {
      return next('/login');
  } else {
      return next();
  }
})

export default router;