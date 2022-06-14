import { createRouter, createWebHistory } from "vue-router";
import LoginEmail from "../views/loginEmail.vue";
import LoginPassword from "../views/loginPassword.vue";
import Register from "../views/register.vue";
import Dashbboard from "../views/dashboard.vue";
import ListUsers from "../views/users/list_users.vue";
import CreateUser from "../views/users/create_user.vue";
import CreateCustomer from "../views/customers/create_customer.vue";
import ListCustomer from "../views/customers/list_customers.vue";
import ViewCustomer from "../views/customers/view_customer.vue";
import EditCustomer from "../views/customers/edit_customer.vue";
import ListAppoints from "../views/appoints/list_appoints.vue";
import CreateAppoints from "../views/appoints/create_appoints.vue";
import EditAppoints from "../views/appoints/edit_appoint.vue";
import Cookies from 'js-cookie';

const routes = [
  { path: "/register", component: Register },
  { path: "/login", component: LoginEmail },
  { path: "/password", component: LoginPassword },
  { path: "/dashboard", component: Dashbboard },
  { path: "/users", component: ListUsers },
  { path: "/users/create_user", component: CreateUser },
  { path: "/customers/create_customer", component: CreateCustomer },
  { path: "/customers/view_customer", component: ViewCustomer },
  { path: "/customers/edit_customer", component: EditCustomer },
  { path: "/customers", component: ListCustomer },
  { path: "/appointments", component: ListAppoints },
  { path: "/appointments/create_appointment", component: CreateAppoints },
  { path: "/appointments/edit_appointment", component: EditAppoints },
  { path: "/:catchAll(.*)", component: LoginEmail },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// const router = new VueRouter({ mode: 'history', routes });

router.beforeEach((to, from, next) => {
  const token = Cookies.get("token")
  const protectedRoutes = ['/password', '/password/'];
  const protectedRoutes1 = ['/dashboard', '/users', '/customers']
  if ((from.path !== '/login' && protectedRoutes.includes(to.path))) {
    return next('/login');
  } if (protectedRoutes1.includes(to.path) && token === '') {
    return next('/login');
  } else {
    return next();
  }
});

export default router;