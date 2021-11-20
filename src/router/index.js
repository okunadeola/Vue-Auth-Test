import { createRouter, createWebHistory } from 'vue-router'

import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import store from '../store'


const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    beforeEnter: (to, from, next) => {  // veryfy token before allowing access
      if (store.state.token === '') {
        next("/Login")
      } else {
        next()
      }
    }

  },
  {
    path: "/Login",
    component: Login,
    name: "Login",
  },
  {
    path: "/Register",
    component: Register,
    name: "Register",
  },
  {
    path: '/:notfound(.*)',
    name: 'NotFound',
    component: NotFound

  },
];




const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
