<template>
  <div class="main-content" @scroll="handleToScroll" ref="album">
    <AlbumsList  albumstitle='热门新碟' :albumsList='hotAlbums'></AlbumsList>
    <AlbumsList  albumstitle='全部新碟' :albumsList='allAlbums'></AlbumsList>
  </div>
</template>

<script>
export default {
  data(){
    return{
      allAlbums:[],
      hotAlbums:[],
      pageNum:0,
      isAlbumDataMore:true
    }
  },
  methods:{
    handleToScroll(){
      let scrollTop=Math.ceil(this.$refs.album.scrollTop);
      let clientHeight=this.$refs.album.clientHeight;
      let scrollHeight=this.$refs.album.scrollHeight;
      if (scrollTop+clientHeight>=scrollHeight) {
        this.pageNum++;
        if (this.isAlbumDataMore) {
          this.axios.get("/album/new?offset="+this.pageNum*30).then((res)=>{
            if (res.data.code===200) {
              if (this.allAlbums.length==res.data.total) { // 判断是否数据全部加载完毕
                this.isAlbumDataMore=false;
              }else{
                this.allAlbums=this.allAlbums.concat(res.data.albums);
              }
            }else{
              console.log("请求数据失败")
            }
          })
        }else{
          console.log("全部数据已加载完毕")
        }
      }
    }
  },
  mounted(){
    this.axios.get("/album/newest").then((res)=>{ // 热门新碟
      if (res.data.code===200) {
       this.hotAlbums=res.data.albums; 
      }
    })
    this.axios.get("/album/new?offset="+this.pageNum*30).then((res)=>{ // 全部新碟
        if (res.data.code===200) {
          this.allAlbums=res.data.albums;
        }
    })
    
  }

}
</script>

<style scoped>

</style>