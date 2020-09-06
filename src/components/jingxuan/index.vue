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
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide  v-for="banner in banners" :key="banner.bannerId">
                    <div class="banner-item">
                        <a :href="banner.url" target="_blank">
                            <img :src="banner.imageUrl" alt="">
                        </a>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            </swiper>
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
                        <div class="card-cover" @click="handleToclick(newsong.id)">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <img :src="newsong.album.picUrl" alt="" >
                        </div>
                        <div class="card-title" :title="newsong.name">{{newsong.name}}</div>
                        <div class="card-artist">
                            <span>{{newsong.artists | arname}}</span>
                        </div>
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
                        <div class="card-cover">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <img :src="mv.picUrl" alt="">
                        </div>
                        <div class="card-title" :title="mv.name">{{mv.name}}</div>
                        <div class="card-artist">
                            <span>{{mv.artists | arname}}</span>
                        </div>
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
                    <div class="item-cont-card" v-for="play in playlists.slice(0,6)" :key="play.id">
                        <div class="card-cover">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <img :src="play.coverImgUrl" alt="">
                        </div>
                        <div class="card-title" :title="play.name">{{play.name}}</div>
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
                        <div class="card-cover">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <img :src="dj.picUrl" alt="">
                        </div>
                        <div class="card-title" :title="dj.name">{{dj.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name:"jingxuan",
    data(){
        return{
            isplay:"fasle",
            banners:[],
            playlists:[],
            mvlists:[],
            newsonglists:[],
            djlists:[],
            swiperOption: {
                autoplay:true,
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    methods:{
        handleToclick(songid){
            this.axios.get("/song/url?id="+songid).then((res)=>{
                var songurl=res.data.data[0].url;
                this.$store.commit("SONG",{songurl,songid});
            })
        }
    },
    mounted(){
        // 轮播图
        this.axios.get("/banner").then((res)=>{
            this.banners=res.data.banners;
        })
        // 精品歌单
        this.axios.get("/top/playlist/highquality").then((res)=>{
            this.playlists=res.data.playlists;
        })
        // 推荐MV
        this.axios.get("/personalized/mv?limit=4").then((res)=>{
            this.mvlists=res.data.result;
        })
        // 最新音乐
        this.axios.get("/top/song").then((res)=>{
            this.newsonglists=res.data.data;
        })
        // 热门电台
        this.axios.get("/dj/hot?limit=6").then((res)=>{
            this.djlists=res.data.djRadios;
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
      .banner{margin-bottom: 30px;overflow: hidden;border-radius: 20px;}
      .banner .banner-item{margin-left: 22px;}
      .banner .banner-item:first-child{margin-left: 0;}
      .banner .banner-item img{width: 398px;border-radius: 20px;}
      .selection-list{width: 1238px;}
      .selection-list .selection-item{margin-bottom: 15px;overflow: hidden;}
      .selection-list .selection-item .selection-item-header{display: flex;justify-content: space-between;margin-bottom: 16px;}
      .selection-list .selection-item .selection-item-header .selection-item-name{font-size: 22px;}
      .selection-list .selection-item .selection-item-header .selection-item-more{font-size: 14px;color: rgb(159,159,159);}
      .selection-list .selection-item .selection-item-header .selection-item-more:hover{color: rgb(30, 208, 160);}
      .selection-list .selection-item .selection-item-header .selection-item-more span{margin-right: 10px;}
      .selection-list .selection-item .selection-item-cont{display: flex;overflow: auto;margin-left: 0;}
      .selection-list .selection-item .selection-item-cont .item-cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card:first-child{margin-left: 0px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
      .selection-list .selection-item .selection-item-cont .item-cont-card .card-cover:hover .cover-mask{display: block;}
      .selection-list .selection-item .selection-item-cont .item-cont-card .card-cover img{width: 188px;border-radius: 12px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
      .selection-list .selection-item .selection-item-cont .item-cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card .card-title{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
      .selection-list .selection-item .selection-item-cont .item-cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}
      .selection-list .selection-item .selection-item-cont.video .item-cont-card{width: 293px;}
      .selection-list .selection-item .selection-item-cont.video .item-cont-card .card-cover img{width: 293px;}
</style>