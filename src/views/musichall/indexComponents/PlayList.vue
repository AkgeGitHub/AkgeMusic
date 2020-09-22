<template>
  <div class="main-content" @scroll="handleToScroll" ref="playlist">
    <div class="playlist">
        <div class="playlist-sort">
            <div class="sort-name">热门分类:</div>
            <div class="sort-cont">
                <a href="" :class="{active:index==catChoice}" @click.prevent="handleToCat(hotcat.name,index)" v-for="(hotcat,index) in hotCatLists" :key="hotcat.id">
                  {{hotcat.name}}
                </a>
            </div>
        </div>
        <div class="playlist-cont">
            <div class="cont-card" v-for="playlist in playLists" :key="playlist.id" @click.prevent="handleToPlaylist(playlist.id)">
              <a href="">
                <div class="card-cover">
                  <img :src="playlist.coverImgUrl" alt="">
                </div>
                <div class="card-name" :title="playlist.name">
                  {{playlist.name}}
                </div>
              </a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"PlayList",
  data(){
    return{
      catChoice:0,
      pageNum:0,
      catTag:"华语",
      hotCatLists:[],
      playLists:[],
      isPlayDataMore:true
    }
  },
  methods:{
    getPlayListData(){
      this.axios.get("/top/playlist?limit=60&cat="+this.catTag+"&order=hot").then((res)=>{
        if (res.data.code===200) {
          this.playLists=res.data.playlists;
        }
      })
    },
    handleToCat(catTag,index){
      this.catTag=catTag,
      this.catChoice=index
    },
    handleToScroll(){
      let scrollTop=Math.ceil(this.$refs.playlist.scrollTop);
      let clientHeight=this.$refs.playlist.clientHeight;
      let scrollHeight=this.$refs.playlist.scrollHeight;
      if (scrollTop+clientHeight>=scrollHeight) {
        this.pageNum++;
        if (this.isPlayDataMore) {
          this.axios.get("/top/playlist?limit=60&cat="+this.catTag+"&order=hot&offset="+this.pageNum*60).then((res)=>{
            if (res.data.code===200) {
              if (this.playLists.length==res.data.total) { // 判断是否数据全部加载完毕
                this.isPlayDataMore=false;
                console.log(this.playLists.length)
              }else{
                this.playLists=this.playLists.concat(res.data.playlists);
              }
            }else{
                console.log("请求数据失败")
            }
          })
        }else{
          console.log("全部数据已加载完毕")
        }
      }
    },
    handleToPlaylist(id){
      if (id) {
        console.log(id)
        this.$router.push("/playlist/detail/"+id)
      }
    }
  },
  watch:{
    catTag(){
      this.getPlayListData();
      this.pageNum=0;
    }
  },
  mounted(){
    this.axios.get("/playlist/hot").then((res)=>{
      this.hotCatLists=res.data.tags;
    })
    this.getPlayListData();
  }

}
</script>

<style scoped>
  .playlist .playlist-sort{margin: 5px 0px 20px 0px;display: flex;}
  .playlist .playlist-sort .sort-name{font-size: 13px;line-height: 32px;margin-right: 15px;}
  .playlist .playlist-sort .sort-cont{display: flex;flex-wrap: wrap}
  .playlist .playlist-sort .sort-cont a{display: block; width: 80px;height: 32px;font-size: 13px;line-height: 32px;text-align: center;border: 1px solid rgb(216, 216, 216); border-radius: 20px;margin-right: 15px;}
  .playlist .playlist-sort .sort-cont a.active{background: rgb(30, 208, 160);color: white;}
  .playlist .playlist-cont{width: 1238px; display: flex;flex-wrap: wrap;}
  .playlist .playlist-cont .cont-card{width: 188px;margin-left: 22px;margin-bottom: 22px;}
  .playlist .playlist-cont .cont-card:nth-of-type(6n+1){margin-left: 0px;}
  .playlist .playlist-cont .cont-card .card-cover{width: 188px;height: 188px;margin-bottom: 5px;}
  .playlist .playlist-cont .cont-card .card-cover img{height: 188px;height: 188px;border-radius: 10px;}
  .playlist .playlist-cont .cont-card .card-name{height: 25px;line-height: 25px;font-size: 14px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
</style>