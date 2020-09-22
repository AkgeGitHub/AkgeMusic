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
        <MusicList title='最新音乐' :songsList='newSongLists' :isMore='true'></MusicList>
        <MvsList title='推荐MV' :isMore='true' :mvsList='mvsList'></MvsList>
        <PlayLists title='推荐歌单' :playLists='playLists' :isMore='true'></PlayLists>
        <RadiosList title='推荐电台' :radiosList='djLists'></RadiosList>
    </div>
</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MusicList from '@/views/musichall/components/MusicList';
export default {
    name:"JingXuan",
    components: {
        swiper,
        swiperSlide,
        MusicList
    },
    data(){
        return{
            banners:[],
            playLists:[],
            mvsList:[],
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
        handleToSong(songid){
            this.axios.get("/check/music?id="+songid).then((res)=>{ // 判断音乐是否可用
                if (res.data.success===true) {
                    this.$store.commit("SONG",{songid});
                }
            }).catch((err)=>{
                if (err) {
                    alert("音乐暂不能播放")
                }
            })
        },
        handleToPlaylist(id){
            this.$router.push("/playlist/detail/"+id)
        },
        handleToVideo(id){
             this.$router.push("/video/detail/"+id)
        }
    },
    mounted(){
        // 轮播图
        this.axios.get("/banner").then((res)=>{
            if (res.data.code===200) {
                this.banners=res.data.banners;
            }
        })
        // 推荐歌单
        this.axios.get("/personalized?limit=6").then((res)=>{
            if (res.data.code===200) {
                this.playLists=res.data.result;
            }
        })
        // 推荐MV
        this.axios.get("/personalized/mv?limit=4").then((res)=>{
            if (res.data.code===200) {
                this.mvsList=res.data.result;
            }
        })
        // 最新音乐
        this.axios.get("/top/song").then((res)=>{
            if (res.data.code===200) {
                this.newSongLists=res.data.data.slice(0,6);
            }
        })
        // 热门电台
        this.axios.get("/personalized/djprogram?limit=6").then((res)=>{
            if (res.data.code===200) {
                this.djLists=res.data.result;
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