import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'threejs',
    component: () => import('@/views/threejs/index'),
    meta: {
      title: '登录界面'
    }
  },
  {
    path: '/login',
    redirect: '/'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '酷屏首页统计图'
    }
  },
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('@/views/Brand.vue'),
    meta: {
      title: '公司品牌介绍'
    }
  },
  {
    path: '/threejs',
    name: 'threejs',
    component: () => import('@/views/threejs/index'),
    meta: {
      title: 'three-demo'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
