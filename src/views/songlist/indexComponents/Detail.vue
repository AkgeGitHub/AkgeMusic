<template>
    <div id="main">
        <div class="detail-intro">
            <div class="intro-cover">
                <img :src="songDetail.coverImgUrl" alt="">
            </div>
            <div class="intro-cont">
                <div class="cont-name">{{songDetail.name}}</div>
                <div class="cont-info">
                    <div class="info-created">
                        <img :src="creator.avatarUrl" alt="">
                        <div>{{creator.nickname}}</div>
                        <div>{{songDetail.createTime | time}} 创建</div>
                    </div>
                    <div class="info-description" :title="songDetail.description">
                        {{songDetail.description}}
                    </div>
                </div>
                <div class="cont-btn">
                    <div>
                        <i class="far fa-play-circle"></i>
                        全部播放
                    </div>
                    <div>
                        <i class="far fa-heart"></i>
                        收藏
                    </div>
                    <div>
                        <i class="far fa-share-square"></i>
                        分享
                    </div>
                </div>

            </div>
        </div>
        <div class="detail-cont">
            <div class="cont-nav">
                <div class="nav-left">
                    <div class="active">歌曲</div>
                    <div>评论</div>
                </div>
                <div class="nav-right">
                    <div>
                        <i class="fas fa-search"></i>
                        搜索
                    </div>
                    <div>
                        <i class="fas fa-sort-alpha-down"></i>
                        排序
                    </div>
                </div>
            </div>
            <div class="cont-songs">
                <div class="songs-header">
                    <div>歌曲</div>
                    <div>歌手</div>
                    <div>专辑</div>
                </div>
                <div class="songs-cont">
                    <div class="cont-item" v-for="song in songsList" :key="song.id" @click="handleToSong(song.id)">
                        <div>
                            <i class="far fa-heart fas fa-heart fa-fw"></i>
                            {{song.name}}
                        </div>
                        <div>{{song.ar | arname}}</div>
                        <div>{{song.al.name}}</div>
                    </div>

                </div>   
            </div>
        </div>
    </div>
  
</template>

<script>
export default {
    name:"Detail",
    data(){
        return{
            songDetail:{},
            creator:[],
            songsList:[]

        }
    },
    methods:{
        getSongDetail(){
            this.axios.get("/playlist/detail?id="+this.playId).then((res)=>{
                if (res.data.code===200) {
                    this.songDetail=res.data.playlist
                    this.creator=res.data.playlist.creator

                    // 未登录返回的playlist中的tracks是不完整的,trackIds是完整的
                    // 可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
                    var trackIds=res.data.playlist.trackIds
                    var idsArr=trackIds.map(item=>item.id)
                    var idsStr=idsArr.join(",")
                    this.axios("/song/detail?ids="+idsStr).then((res)=>{
                        if (res.data.code===200) {
                            this.songsList=res.data.songs
                        }
                    })
                }else{
                    console.log("请求数据失败")
                }
            })
        },
        handleToSong(songid){
            this.axios.get("/song/url?id="+songid).then((res)=>{
                var songurl=res.data.data[0].url;
                this.$store.commit("SONG",{songurl,songid});
            })
        },
    },
    computed:{
        playId(){
            return this.$route.params.playid
        }
    },
    mounted(){
        this.getSongDetail()
    }

}
</script>

<style scoped>
    .detail-intro{display: flex;}
    .detail-intro .intro-cover{width: 170px;height: 170px;overflow: hidden;flex-shrink: 0;}
    .detail-intro .intro-cover img{width: 170px;height: 170px;border-radius: 10px;}
    .detail-intro .intro-cont{margin-left: 20px;height: 170px;display: flex;flex-direction: column;justify-content: space-between;}
    .detail-intro .intro-cont .cont-name{font-size: 24px;font-weight: bold; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .detail-intro .intro-cont .cont-info{margin-top: 15px;}
    .detail-intro .intro-cont .cont-info .info-created{display: flex;flex-wrap: wrap;line-height: 40px;}
    .detail-intro .intro-cont .cont-info .info-created img{width: 40px;height: 40px;border-radius: 50%;overflow: hidden;}
    .detail-intro .intro-cont .cont-info .info-created div{margin-left: 10px;font-size: 13px;color: rgb(159,159,159);}
    .detail-intro .intro-cont .cont-info .info-description{width: 1000px; font-size: 14px;margin: 10px 0px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
    .detail-intro .intro-cont .cont-btn{display: flex;flex-wrap: wrap;margin-bottom: 5px;}
    .detail-intro .intro-cont .cont-btn div{width: 110px;height: 35px;color: rgb(41, 40, 40); background: rgb(219,219,219);text-align: center;line-height: 35px;border-radius: 20px;margin-right: 10px;font-size: 14px;}
    .detail-intro .intro-cont .cont-btn div i{margin-right: 4px;}
    .detail-cont .cont-nav{display: flex;flex-wrap: wrap;overflow: hidden;margin-top: 20px;justify-content: space-between;}
    .detail-cont .cont-nav .nav-left{display: flex;flex-wrap:wrap; overflow: hidden;font-size: 14px;}
    .detail-cont .cont-nav .nav-left div{height: 32px;margin-right: 50px;line-height: 32px;}
    .detail-cont .cont-nav .nav-left div.active{color: rgb(30, 208, 160);border-bottom: 1px solid rgb(30, 208, 160);}
    .detail-cont .cont-nav .nav-right{display: flex;flex-wrap: wrap;overflow: hidden;font-size: 13px;}
    .detail-cont .cont-nav .nav-right div{height: 36px;margin-left: 30px;line-height: 36px;}
    .detail-cont .cont-songs .songs-header{display: flex;margin: 12px 0px;font-size: 13px;color: rgb(136, 136, 136);padding-left: 5px;}
    .detail-cont .cont-songs .songs-header div{flex: 1;}
    .detail-cont .cont-songs .songs-cont .cont-item{display: flex;justify-content: space-between; font-size: 14px;margin-bottom: 16px;height: 30px;padding-left: 5px;}
    .detail-cont .cont-songs .songs-cont .cont-item div{width: 412px; padding-right: 15px; flex: 1;line-height: 30px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .detail-cont .cont-songs .songs-cont .cont-item div i{color: rgb(159,159,159);margin-right: 8px;}
    .detail-cont .cont-songs .songs-cont .cont-item:first-of-type div i{color: rgb(255,106,106);}

</style>