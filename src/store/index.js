import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songurl:"",
    songid:"",

  },
  mutations: {
    SONG(state,payload){
      state.songurl=payload.songurl;
      state.songid=payload.songid;
    }
  },
  actions: {
  },
  modules: {
    
  }
})
