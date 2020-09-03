<template>
    <div id="main">
        <div class="title">
                音乐馆
        </div>
        <div class="nav clearfix">
            <div class="active">精选</div>
            <div>排行</div>
            <div>歌手</div>
            <div>分类歌单</div>
            <div>数字专辑</div>
        </div>
        <div class="banner">
            轮播图
        </div>
        <div class="selection-list">
            <div class="selection-item">
                <div class="selection-item-header">
                    <div class="selection-item-name">最新音乐</div>
                    <div class="selection-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="selection-item-cont">
                    <div class="item-cont-card" v-for="newsong in newsonglists.slice(0,6)" :key="newsong.id">
                        <img :src="newsong.picUrl" alt="">
                        <div>{{newsong.name}}</div>
                    </div>
                </div>
            </div>
            <div class="selection-item">
                <div class="selection-item-header">
                    <div class="selection-item-name">推荐MV</div>
                    <div class="selection-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="selection-item-cont video">
                    <div class="item-cont-card" v-for="mv in mvlists" :key="mv.id">
                        <img :src="mv.picUrl" alt="">
                        <div>{{mv.name}}</div>
                    </div>
                    
                </div>
            </div>
            <div class="selection-item">
                <div class="selection-item-header">
                    <div class="selection-item-name">精品歌单</div>
                    <div class="selection-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="selection-item-cont">
                    <div class="item-cont-card" v-for="play in playlists" :key="play.id">
                        <img :src="play.coverImgUrl" alt="">
                        <div>{{play.name}}</div>
                    </div>
                </div>
            </div>
            <div class="selection-item">
                <div class="selection-item-header">
                    <div class="selection-item-name">热门电台</div>
                    <div class="selection-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="selection-item-cont">
                    <div class="item-cont-card" v-for="dj in djlists" :key="dj.id">
                        <img :src="dj.picUrl" alt="">
                        <div>{{dj.name}}</div>
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
            playlists:[],
            mvlists:[],
            newsonglists:[],
            djlists:[]
        }
    },
    mounted(){
        this.axios.get("/top/playlist?limit=6&order=hot").then((res)=>{
            this.playlists=res.data.playlists;
        })
        this.axios.get("/personalized/mv?limit=4").then((res)=>{
            this.mvlists=res.data.result;
        })
        this.axios.get("/personalized/newsong").then((res)=>{
            this.newsonglists=res.data.result;
        })
        this.axios.get("/personalized/djprogram").then((res)=>{
            this.djlists=res.data.result;
        })
    }

}
</script>

<style scoped>
      .title{font-size: 30px;margin-bottom: 22px;}
      .nav{margin-bottom: 12px;}
      .nav div{float: left;height: 36px;margin-right: 54px; line-height: 36px;font-size: 14px;}
      .nav div.active{border-bottom: 1.5px solid rgb(30, 208, 160);color: rgb(30, 208, 160);}
      .nav div:not(.active):hover{color: rgb(30, 208, 160);}
      .banner{height: 185px;background-color: rgb(159,159,159);font-size: 40px;text-align: center;line-height: 200px;margin-bottom: 30px;}
      .selection-list{width: 1238px;}
      .selection-list .selection-item{margin-bottom: 15px;overflow: hidden;}
      .selection-list .selection-item .selection-item-header{display: flex;justify-content: space-between;margin-bottom: 16px;}
      .selection-list .selection-item .selection-item-header .selection-item-name{font-size: 22px;}
      .selection-list .selection-item .selection-item-header .selection-item-more{font-size: 14px;color: rgb(159,159,159);}
      .selection-list .selection-item .selection-item-header .selection-item-more:hover{color: rgb(30, 208, 160);}
      .selection-list .selection-item .selection-item-header .selection-item-more span{margin-right: 10px;}
      .selection-list .selection-item .selection-item-cont{display: flex;overflow: auto;margin-left: 0;}
      .selection-list .selection-item .selection-item-cont .item-cont-card{margin-left: 22px;margin-bottom: 15px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card:first-child{margin-left: 0px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card img{width: 188px;margin-bottom: 10px;border-radius: 12px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card div{width: 188px; font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
      .selection-list .selection-item .selection-item-cont.video .item-cont-card img{width: 293px;}
      .selection-list .selection-item .selection-item-cont.video .item-cont-card div{width: 293px;}
</style>