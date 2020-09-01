import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import scroller from '@/components/scroller'
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000/';
Vue.prototype.axios=axios;

Vue.component("scroller",scroller)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
