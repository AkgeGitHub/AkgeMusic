<template>
  <div class="main-content" @scroll="handleToScroll" ref="album">
    <div class="album">
        <div class="album-item hot">
            <div class="item-header">
                <div class="header-name">热门新碟</div>
            </div>
            <div class="item-cont">
                <div class="cont-card" v-for="album in hotAlbums" :key="album.id">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <img :src="album.picUrl" alt="" >
                    </div>
                    <div class="card-name" :title="album.name">{{album.name}}</div>
                    <div class="card-artist">
                        <span>{{album.artists | arname}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="album-item">
            <div class="item-header">
                <div class="header-name">全部新碟</div>
                <div class="header-more">
                    <span>更多</span>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
            <div class="item-cont">
                <div class="cont-card" v-for="album in allAlbums" :key="album.id">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <img :src="album.picUrl" alt="" >
                    </div>
                    <div class="card-name" :title="album.name">{{album.name}}</div>
                    <div class="card-artist">
                        <span>{{album.artists | arname}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Album",
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
  .album{width: 1238px;}
  .album .album-item{margin: 10px  0px; overflow: hidden;}
  .album .album-item .item-header{display: flex;justify-content: space-between;margin-bottom: 16px;}
  .album .album-item .item-header .header-name{font-size: 22px;}
  .album .album-item .item-header .header-more{font-size: 14px;color: rgb(159,159,159);}
  .album .album-item .item-header .header-more:hover{color: rgb(30, 208, 160);}
  .album .album-item .item-header .header-more span{margin-right: 10px;}
  .album .album-item .item-cont{display: flex;margin-left: 0;flex-wrap: wrap;}
  .album .album-item .item-cont .cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
  .album .album-item .item-cont .cont-card:nth-of-type(6n+1){margin-left: 0px;}
  .album .album-item .item-cont .cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
  .album .album-item .item-cont .cont-card .card-cover:hover .cover-mask{display: block;}
  .album .album-item .item-cont .cont-card .card-cover img{width: 188px;border-radius: 12px;}
  .album .album-item .item-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
  .album .album-item .item-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
  .album .album-item .item-cont .cont-card .card-name{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
  .album .album-item .item-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}
</style>