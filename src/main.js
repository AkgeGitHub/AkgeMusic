import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



// 公用的组件
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SongsList from '@/components/SongsList';
import MvsList from '@/components/MvsList';
import AlbumsList from '@/components/AlbumsList';
import SingersList from '@/components/SingersList';
import PlayLists from '@/components/PlayLists';
import CommentsList from '@/components/CommentsList';
import RadiosList from '@/components/RadiosList';
Vue.component("Sidebar",Sidebar)
Vue.component("Header",Header)
Vue.component("Footer",Footer)
Vue.component("SongsList",SongsList)
Vue.component("MvsList",MvsList)
Vue.component("AlbumsList",AlbumsList)
Vue.component("SingersList",SingersList)
Vue.component("PlayLists",PlayLists)
Vue.component("CommentsList",CommentsList)
Vue.component("RadiosList",RadiosList)

// axios
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000/';
Vue.prototype.axios=axios;

// vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// scroller
import scroller from '@/components/Scroller'
Vue.component("scroller",scroller)

// 过滤器
// 1.歌曲作者名字
Vue.filter("arname",function(ar){
  var arArr=(ar||[]).map(item=>item.name);
  var arStr=arArr.join(" / ");
  return arStr;
})
// 2.事件戳转换
Vue.filter("time",function(timestamp){
  var commonTime = new Date(timestamp)
  var time=commonTime.getFullYear()+"年"+(commonTime.getMonth()+1)+"月"+commonTime.getDate()+"日"
  return time;
})
Vue.filter("exactTime",function(timestamp){
  var commonTime = new Date(timestamp)
  var exactTime=commonTime.toLocaleString('chinese',{hour12:false});
  return exactTime;
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
