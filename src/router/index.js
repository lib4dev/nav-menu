import Vue from 'vue';
import Router from 'vue-router';
import Bind from '../pages/user/bind.vue'
import Hello from '../pages/user/hello.vue'
Vue.use(Router);


export default new Router({
  mode: "history",
  routes: [{
      path: '/user/bind',
      name: 'bind',
      component: Bind
    },{
    path: '/user/hello',
    name: 'hello',
    component: Hello
  }
  ]
})
