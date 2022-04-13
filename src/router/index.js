import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search')
  },

  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('../views/Layout'),
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('../views/Home')
    }, {
      path: '/my',
      name: 'my',
      component: () => import('../views/My')
    }, {
      path: '/video',
      name: 'shipin',
      component: () => import('../views/video')
    }, {
      path: '/qa',
      name: 'qa',
      component: () => import('../views/qa')
    },]

  },
]

const router = new VueRouter({
  routes
})

export default router
