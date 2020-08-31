import Vue from 'vue'
import VueRouter from 'vue-router'
import onlineMuiscRouter from "./onlinemusic"
import myMuiscRouter from "./mymusic"
import songListRouter from "./songlist"


Vue.use(VueRouter)

  const routes = [
    onlineMuiscRouter,
    myMuiscRouter,
    songListRouter,
    {
      path:"/*",
      redirect:"/onlinemusic"
    }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
