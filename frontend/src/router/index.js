import { createRouter, createWebHistory } from "vue-router";
import LoginEmail from "../views/loginEmail.vue";
import LoginPassword from "../views/loginPassword.vue";
import Register from "../views/register.vue";
import Dashbboard from "../views/dashboard.vue";
import ListUsers from "../views/users/list_users.vue";
import CreateUser from "../views/users/create_user.vue";

const routes = [
  { path: "/register", component: Register },
  { path: "/login", component: LoginEmail },
  { path: "/password", component: LoginPassword },
  { path: "/dashboard", component: Dashbboard },
  { path: "/users", component: ListUsers },
  { path: "/users/create_user", component: CreateUser },
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