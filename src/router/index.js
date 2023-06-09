import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'

import NotFound from '@/components/NotFound.vue'
import Login from "@/views/Login.vue";
import {isLoggedIn} from "@/utils/auth";
import HospitalsManagement from "@/views/HospitalsManagement.vue";
import EmergencyBedroomsManagement from "@/views/EmergencyBedroomsManagement.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: '/dashboard',
    name: 'home',
    component: Home,
  },
  {
    path: '/hospitals',
    name: 'hospitals',
    component: HospitalsManagement,
  },
  {
    path: '/hospitals/:hospitalId/emergency-bedrooms',
    name: 'hospital-emergency-bedrooms',
    component: EmergencyBedroomsManagement
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/'){
    next({path : '/dashboard'})
  }
  if (to.name === 'login' && isLoggedIn()) {
    next({ path: '/dashboard' })
  }
  else if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: '/login'
    })
  }
  else {
    next()
  }
})
export default router
