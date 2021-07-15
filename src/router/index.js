import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/Home.vue'
import Details from '../views/details.vue'
import Playlist from '../views/myPlaylist.vue'
import {dbAuth} from '../firebase/config'

Vue.use(VueRouter)
const requiresauth = (to, from, next)=>{
  let user = dbAuth.currentUser
    if(user){
      next()
    }else{
      next('/')
    }

}
const noauth = (to, from, next) =>{
  let user = dbAuth.currentUser
  if(user){
    next('/home')
  }else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter:noauth
  },
  {
    path: '/details/:id',
    name: 'details',
    component: Details,
    beforeEnter:requiresauth
  },
  {
    path: '/user/playlist',
    name: 'Playlist',
    component: Playlist,
    beforeEnter:requiresauth
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/signup.vue'),
    beforeEnter:noauth

  },
  {
    path: '/addPlaylist',
    name: 'addPlaylist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "addPlaylist" */ '../views/addPlaylist.vue'),
    beforeEnter:requiresauth
  
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter:requiresauth

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
