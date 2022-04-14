import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')  // 登录一级路由
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search') // 搜索一级路由 
  }, {
    path: '/article/:article_id',
    name: 'article',
    component: () => import('../views/article'), // 文章详情一级路由
    props: true
  },

  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('../views/Layout'),  // 一级布局路由
    children: [{         //  二级路由 
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
