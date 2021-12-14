import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from "@/views/layout";
import Centre from "@/views/centre"
import Order from '@/views/order'
import { getToken } from "@/util/token";
import {Message} from 'element-ui'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'Centre',
      component: Centre
    },
    {
      path: 'order',
      name: 'Order',
      component: Order
    }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let token = getToken('Access-Token')
  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' })
    Message({
      message: '请先登录！',
      type: 'warning'
    })
  }
  else next()
})

router.push('/')

export default router
