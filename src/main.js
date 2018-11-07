import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {
  post,
  fetch,
  patch,
  put,
  del
} from './server/http'

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$del = del;





new Vue({
  el: '#vapp',
  router,
  render: h => h(App)
});
