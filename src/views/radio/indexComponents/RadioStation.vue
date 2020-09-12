<template>
    <div class="main-content">
        <div class="banner">
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide  v-for="banner in banners" :key="banner.targetId">
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
</style>