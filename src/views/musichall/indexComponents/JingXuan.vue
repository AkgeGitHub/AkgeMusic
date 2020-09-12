<template>
    <div class="main-content">
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
        <div class="select-list">
            <div class="select-item">
                <div class="select-item-header">
                    <div class="select-item-name">最新音乐</div>
                    <div class="select-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="select-item-cont">
                    <div class="item-cont-card" v-for="newSong in newSongLists" :key="newSong.id">
                        <div class="card-cover" @click="handleToclick(newSong.id)">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <img :src="newSong.album.picUrl" alt="" >
                        </div>
                        <div class="card-title" :title="newSong.name">{{newSong.name}}</div>
                        <div class="card-artist">
                            <span>{{newSong.artists | arname}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="select-item">
                <div class="select-item-header">
                    <div class="select-item-name">推荐MV</div>
                    <div class="select-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="select-item-cont video">
                    <div class="item-cont-card" v-for="mv in mvLists" :key="mv.id">
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
            <div class="select-item">
                <div class="select-item-header">
                    <div class="select-item-name">精品歌单</div>
                    <div class="select-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="select-item-cont">
                    <div class="item-cont-card" v-for="play in playLists" :key="play.id">
                        <div class="card-cover">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <img :src="play.coverImgUrl" alt="">
                        </div>
                        <div class="card-title" :title="play.name">{{play.name}}</div>
                    </div>
                </div>
            </div>
            <div class="select-item">
                <div class="select-item-header">
                    <div class="select-item-name">热门电台</div>
                    <div class="select-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="select-item-cont">
                    <div class="item-cont-card" v-for="dj in djLists" :key="dj.id">
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
    name:"JingXuan",
    components: {
        swiper,
        swiperSlide,
    },
    data(){
        return{
            banners:[],
            playLists:[],
            mvLists:[],
            newSongLists:[],
            djLists:[],
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
            if (res.data.code===200) {
                this.banners=res.data.banners;
            }
        })
        // 精品歌单
        this.axios.get("/top/playlist/highquality").then((res)=>{
            if (res.data.code===200) {
                this.playLists=res.data.playlists.slice(0,6);
            }
        })
        // 推荐MV
        this.axios.get("/personalized/mv?limit=4").then((res)=>{
            if (res.data.code===200) {
                this.mvLists=res.data.result;
            }
        })
        // 最新音乐
        this.axios.get("/top/song").then((res)=>{
            if (res.data.code===200) {
                this.newSongLists=res.data.data.slice(0,6);
            }
        })
        // 热门电台
        this.axios.get("/dj/hot?limit=6").then((res)=>{
            if (res.data.code===200) {
                this.djLists=res.data.djRadios;
            }
        })
    }

}
</script>

<style scoped>
    .banner{margin-bottom: 30px;overflow: hidden;border-radius: 20px;}
    .banner .banner-item{margin-left: 22px;}
    .banner .banner-item:first-child{margin-left: 0;}
    .banner .banner-item img{width: 398px;border-radius: 20px;}
    .select-list{width: 1238px;}
    .select-list .select-item{margin-bottom: 15px;overflow: hidden;}
    .select-list .select-item .select-item-header{display: flex;justify-content: space-between;margin-bottom: 16px;}
    .select-list .select-item .select-item-header .select-item-name{font-size: 22px;}
    .select-list .select-item .select-item-header .select-item-more{font-size: 14px;color: rgb(159,159,159);}
    .select-list .select-item .select-item-header .select-item-more:hover{color: rgb(30, 208, 160);}
    .select-list .select-item .select-item-header .select-item-more span{margin-right: 10px;}
    .select-list .select-item .select-item-cont{display: flex;overflow: auto;margin-left: 0;}
    .select-list .select-item .select-item-cont .item-cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
    .select-list .select-item .select-item-cont .item-cont-card:first-child{margin-left: 0px;}
    .select-list .select-item .select-item-cont .item-cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
    .select-list .select-item .select-item-cont .item-cont-card .card-cover:hover .cover-mask{display: block;}
    .select-list .select-item .select-item-cont .item-cont-card .card-cover img{width: 188px;border-radius: 12px;}
    .select-list .select-item .select-item-cont .item-cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .select-list .select-item .select-item-cont .item-cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .select-list .select-item .select-item-cont .item-cont-card .card-title{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .select-list .select-item .select-item-cont .item-cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}
    .select-list .select-item .select-item-cont.video .item-cont-card{width: 293px;}
    .select-list .select-item .select-item-cont.video .item-cont-card .card-cover img{width: 293px;}
</style>