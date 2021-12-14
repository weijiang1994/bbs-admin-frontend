import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from "@/views/layout";
import Centre from "@/views/centre"
import User from '@/views/user'
import { getToken } from "@/util/token";
import { Message } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title: '管理员登录'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'Centre',
      component: Centre,
      meta:{
        title: '后台管理主页'
      }
    },
    {
      path: 'user',
      name: 'User',
      component: User
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
  if (to.meta.title) {
    document.title = to.meta.title || '后台管理页面'
  }
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
