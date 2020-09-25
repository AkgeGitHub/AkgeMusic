<template>
    <div class="main-content">
        <div class="main-cont-title">
			<div class="title">电台</div>
		</div>
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
        
        <ProgramCards title='推荐节目' :programsList='rcmdDjList' :isShowAuthor='true'></ProgramCards>
        <RadiosList title='热门电台' :radiosList='hotDjList' :isShowAuthor='true'></RadiosList>
       
    </div>
</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProgramCards from "@/views/radio/components/ProgramCards"
export default {
    name:"RadioStation",
    components: {
        swiper,
        swiperSlide,
        ProgramCards
    },
    data(){
        return{
            banners:[],
            rcmdDjList:[],
            hotDjList:[],
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
        // 注意节目的id(programs[x].id)和电台的id(programs[x].radio.id)是不同的，要想获得音频应该传入的是节目下的radio中的id(programs[x].radio.id)
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
    }

}
</script>

<style scoped>
	.main-cont-title{width: 100%; background: rgb(246,246,246);}
	.main-cont-title .title{font-size: 30px;margin-bottom: 20px;}
    .banner{margin-bottom: 30px;overflow: hidden;border-radius: 20px;}
    .banner .banner-item{margin-left: 22px;}
    .banner .banner-item:first-child{margin-left: 0;}
    .banner .banner-item img{width: 398px;border-radius: 20px;}
</style>