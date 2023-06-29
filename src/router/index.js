import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store  from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/itemMusic',
    name: 'itemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/itemMusic.vue')
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/login.vue')
  },
  {
    path: '/infoUser',
    name: 'infoUser',
    beforeEnter:(to,from,next)=>{
      // if(store.state.isLogin || store.state.token || localStorage.getItem('token')){
      if(store.state.isLogin || store.state.cookie || localStorage.getItem('cookie')){
        next()
      }else{
        next('/login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/infoUser.vue'),
  },
  {
    path: '/likeMusic',
    name: 'likeMusic',
    component: () => import('../views/likeMusic.vue'),
    children:[
      {
        path:'search',
        name:'search',
        component: () => import('../components/like/searchLike.vue'),
      }
    ]
  },
  {
    path:'/*',
    name:'NoFound',
    redirect:'/login' // 路由的重定向
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/* 全局路由守卫，判断底部播放器是否需要，在登录界面不需要 */
router.beforeEach((to,from)=>{
  if(to.path=='/login'){
    store.state.isFooterMusic = false
  }else{
    store.state.isFooterMusic = true
  }
})
export default router
