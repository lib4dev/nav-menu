import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Menu from '@/pages/menu/menu'
import UserBind from '@/pages/user/bind'

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path:"/",
      name:"menu",
      component: Menu,
      children:[
        {
        path:"user/bind",
        name:"userbind",
        component:UserBind
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
