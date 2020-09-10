<template>
  <div class="main-content" @scroll="handleToScroll" ref="playlist">
    <div class="playlist">
        <div class="playlist-sort">
            <div>热门分类:</div>
            <ul>
                <li :class="{active:index==catchoice}" @click="handleToCat(hotcat.name,index)" v-for="(hotcat,index) in hotcatlist" :key="hotcat.id">
                  {{hotcat.name}}
                </li>
            </ul>
        </div>
        <div class="playlist-cont">
            <div class="cont-card" v-for="playlist in playlists" :key="playlist.id">
                <div class="card-cover">
                  <img :src="playlist.coverImgUrl" alt="">
                </div>
                <div class="card-name" :title="playlist.name">
                  {{playlist.name}}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      catchoice:0,
      pagenum:0,
      cattag:"华语",
      hotcatlist:[],
      playlists:[]
    }
  },
  methods:{
    getplaylist(){
      this.axios.get("/top/playlist?limit=60&cat="+this.cattag+"&order=hot").then((res)=>{
        this.playlists=res.data.playlists;
      })
    },
    handleToCat(cattag,index){
      this.cattag=cattag,
      this.catchoice=index
    },
    handleToScroll(){
      let scrollTop=this.$refs.playlist.scrollTop;
      let clientHeight=this.$refs.playlist.clientHeight;
      let scrollHeight=this.$refs.playlist.scrollHeight;
      if (scrollTop+clientHeight>=scrollHeight) {
        this.pagenum++;
        this.axios.get("/top/playlist?limit=60&cat="+this.cattag+"&order=hot&offset="+this.pagenum*60).then((res)=>{
          this.playlists=this.playlists.concat(res.data.playlists);
        })
      }
    }
  },
  watch:{
    cattag(){
      this.getplaylist();
      this.pagenum=0;
    }
  },
  mounted(){
    this.axios.get("/playlist/hot").then((res)=>{
      this.hotcatlist=res.data.tags;
    })
    this.getplaylist();
  }

}
</script>

<style scoped>
  .playlist .playlist-sort{margin: 5px 0px 20px 0px;display: flex;}
  .playlist .playlist-sort div{font-size: 13px;line-height: 32px;margin-right: 15px;}
  .playlist .playlist-sort ul{display: flex;flex-wrap: wrap}
  .playlist .playlist-sort ul li{width: 80px;height: 32px;font-size: 13px;line-height: 32px;text-align: center;border: 1px solid rgb(216, 216, 216); border-radius: 20px;margin-right: 15px;}
  .playlist .playlist-sort ul li.active{background: rgb(30, 208, 160);color: white;}
  .playlist .playlist-cont{width: 1238px; display: flex;flex-wrap: wrap;}
  .playlist .playlist-cont .cont-card{width: 188px;margin-left: 22px;margin-bottom: 22px;}
  .playlist .playlist-cont .cont-card:nth-of-type(6n+1){margin-left: 0px;}
  .playlist .playlist-cont .cont-card .card-cover{width: 188px;height: 188px;margin-bottom: 5px;}
  .playlist .playlist-cont .cont-card .card-cover img{height: 188px;height: 188px;border-radius: 10px;}
  .playlist .playlist-cont .cont-card .card-name{height: 25px;line-height: 25px;font-size: 14px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
</style>