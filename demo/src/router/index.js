import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Menu from '@/pages/menu/menu'
import UserBind from '@/pages/user/bind'
import Product from '@/pages/user/product'
import Info from '@/pages/user/info'
import Fund from '@/pages/user/fund'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "menu",
      component: Menu,
      children: [
        {
          path: "user/bind",
          name: "userbind",
          component: UserBind
        },
        {
          path: "repository/product",
          name: "reproduct",
          component: Product,
        }, {
          path: "merchant/merchant/info",
          name: "info",
          component: Info
        }, {
          path:"supplier/fund",
          name:"fund",
          component:Fund
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
