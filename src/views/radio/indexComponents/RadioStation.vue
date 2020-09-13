<template>
    <div class="main-content">
        <div class="banner">
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide  v-for="banner in banners" :key="banner.url"> <!-- targertId key值重复 -->
                    <div class="banner-item">
                        <a :href="banner.url" target="_blank">
                            <img :src="banner.pic" alt="">
                        </a>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            </swiper>
        </div>
        
        <div class="radio">
            <div class="radio-item">
                <div class="item-header">
                    <div class="header-name">推荐节目</div>
                </div>
                <div class="item-cont">
                    <div class="cont-card" v-for="dj in rcmdDjList" :key="dj.id">
                        <div class="card-cover">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <img :src="dj.coverUrl" alt="" >
                        </div>
                        <div class="card-name" :title="dj.name">{{dj.name}}</div>
                        <div class="card-artist">
                            <span>{{dj.dj.brand}}</span>
                        </div>
                    </div>
                </div>
            </div>
             <div class="radio-item hot">
                <div class="item-header">
                    <div class="header-name">热门电台</div>
                </div>
                <div class="item-cont">
                    <div class="cont-card" v-for="dj in hotDjList" :key="dj.id">
                        <div class="card-cover">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <img :src="dj.picUrl" alt="" >
                        </div>
                        <div class="card-name" :title="dj.name">{{dj.name}}</div>
                        <div class="card-artist">
                            <span>{{dj.creatorName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="radio-item">
                <div class="item-header">
                    <div class="header-name">节目排行榜</div>
                </div>
                <div class="item-cont">
                    <div class="cont-card" v-for="(dj,index) in rankDjList" :key="dj.id">
                        <div class="card-cover">
                            <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                            <div class="cover-rank">{{index+1}}</div>
                            <img :src="dj.program.coverUrl" alt="" >
                        </div>
                        <div class="card-name" :title="dj.program.name">{{dj.program.name}}</div>
                        <div class="card-artist">
                            <span>{{dj.program.dj.nickname}}</span>
                        </div>
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
    name:"RadioStation",
    components: {
        swiper,
        swiperSlide,
    },
    data(){
        return{
            banners:[],
            rcmdDjList:[],
            hotDjList:[],
            rankDjList:[],
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
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
    },
    mounted(){
        // 轮播图
        this.axios.get("/dj/banner").then((res)=>{
            if (res.data.code===200) {
                this.banners=res.data.data;
            }
        })
        // 推荐节目
        this.axios.get("/program/recommend?limit=12").then((res)=>{
            if (res.data.code===200) {
                this.rcmdDjList=res.data.programs;
            }
        })
        // 热门电台
        this.axios.get("/dj/toplist?type=hot&limit=12").then((res)=>{
            if (res.data.code===200) {
                this.hotDjList=res.data.toplist;
            }
        })
        // 节目排行榜
        this.axios.get("/dj/program/toplist?limit=12").then((res)=>{
            if (res.data.code===200) {
                this.rankDjList=res.data.toplist;
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
    .radio{width: 1238px;}
    .radio .radio-item{margin: 10px  0px; overflow: hidden;}
    .radio .radio-item .item-header{display: flex;justify-content: space-between;margin-bottom: 16px;}
    .radio .radio-item .item-header .header-name{font-size: 22px;}
    .radio .radio-item .item-header .header-more{font-size: 14px;color: rgb(159,159,159);}
    .radio .radio-item .item-header .header-more:hover{color: rgb(30, 208, 160);}
    .radio .radio-item .item-header .header-more span{margin-right: 10px;}
    .radio .radio-item .item-cont{display: flex;margin-left: 0;flex-wrap: wrap;}
    .radio .radio-item .item-cont .cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
    .radio .radio-item .item-cont .cont-card:nth-of-type(6n+1){margin-left: 0px;}
    .radio .radio-item .item-cont .cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
    .radio .radio-item .item-cont .cont-card .card-cover .cover-rank{ position: absolute;left: 10px; width: 20px; height: 32px;line-height: 32px;text-align: center;border-radius: 0px 0px 10px 10px; background: rgb(30,208,160);color: rgb(246,246,246);}
    .radio .radio-item .item-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .radio .radio-item .item-cont .cont-card .card-cover img{width: 188px;border-radius: 12px;}
    .radio .radio-item .item-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .radio .radio-item .item-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .radio .radio-item .item-cont .cont-card .card-name{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .radio .radio-item .item-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}
</style>