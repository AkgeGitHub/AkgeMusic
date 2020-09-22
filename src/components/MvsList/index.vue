<template>
    <div class="mvslist">
        <div class="mvs-header" v-if="title">
            <div class="header-title">{{title}}</div>
            <slot></slot>
            <div class="header-more" v-if="isMore">
                <span>更多</span>
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
        <div class="mvs-cont">
            <div class="cont-card" v-for="(mv,index) in mvsList" :key="mv.id" @click.prevent="handleToVideo(mv.id)">
                <a href="">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <div class="cover-rank" v-if="isRank">{{index+1}}</div>
                        <img :src="mv.cover || mv.picUrl" alt="" >
                    </div>
                    <div class="card-name" :title="mv.name">{{mv.name}}</div>
                    <div class="card-artist">
                        <span>{{mv.artists | arname}}</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'MvsList',
    props:['title','mvsList','isRank','isMore'],
    methods:{
        handleToVideo(id){
            this.$router.push("/video/detail/"+id)
        }
       
    },
}
</script>

<style scoped>
    .mvslist{width: 1238px;}
    .mvs-header{display: flex;justify-content: space-between;margin: 16px 0px;}
    .mvs-header .header-title{font-size: 22px;}
    .mvs-header .header-sort{display: flex;margin-left: 10px;}
    .mvs-header .header-sort a{display: block; width: 66px;height: 22px;font-size: 13px;line-height: 22px;text-align: center;border: 1px solid rgb(216, 216, 216); border-radius: 20px;margin:3px 7px;}
    .mvs-header .header-sort a.active{background: rgb(30, 208, 160);color: white;}
    .mvs-header .header-more{font-size: 14px;color: rgb(159,159,159);}
    .mvs-header .header-more:hover{color: rgb(30, 208, 160);}
    .mvs-header .header-more span{margin-right: 10px;}
    .mvs-cont{display: flex;margin-left: 0;flex-wrap: wrap;}
    .mvs-cont .cont-card{width: 293px; margin-left: 22px;margin-bottom: 15px;}
    .mvs-cont .cont-card:nth-of-type(4n+1){margin-left: 0px;}
    .mvs-cont .cont-card .card-cover{height: 165px; overflow: hidden; margin-bottom: 10px;border-radius: 12px;position: relative;}/**网易云的接口返回的第一个数据的图片与其他数据图片的尺寸不同，所以只能多设置一个高度 */
    .mvs-cont .cont-card .card-cover .cover-rank{ position: absolute;left: 10px; width: 20px; height: 32px;line-height: 32px;text-align: center;border-radius: 0px 0px 10px 10px; background: rgb(30,208,160);color: rgb(246,246,246);}
    .mvs-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .mvs-cont .cont-card .card-cover img{width: 293px;border-radius: 12px;}
    .mvs-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .mvs-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .mvs-cont .cont-card .card-name{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .mvs-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}

</style>