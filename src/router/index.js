import Vue from 'vue'
import VueRouter from 'vue-router'
import MuischallRouter from "./musichall"
import VideoRouter from "./video"
import RadioRouter from "./radio"
import LikeRouter from "./like"
import LocalRouter from "./local"
import HistoryRouter from "./history"
import SonglistRouter from "./songlist"
import SearchRouter from "./search"




Vue.use(VueRouter)

  const routes = [
    MuischallRouter,
    VideoRouter,
    RadioRouter,
    LikeRouter,
    LocalRouter,
    HistoryRouter,
    SonglistRouter,
    SearchRouter,
    {
      path:"/*",
      redirect:"/musichall"
    }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
