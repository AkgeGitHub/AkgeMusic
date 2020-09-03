import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// axios
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000/';
Vue.prototype.axios=axios;


// scroller
import scroller from '@/components/scroller'
Vue.component("scroller",scroller)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
