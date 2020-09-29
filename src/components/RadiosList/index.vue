<template>
    <div class="radio">
        <div class="radio-header" v-if="title">
            <div class="header-name">{{title}}</div>
        </div>
        <div class="radio-cont">
            <div class="cont-card" v-for="(item,index) in list" :key="item.id" @click.prevent="handleToRadio(item.id)">
                <a href="">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <div class="cover-rank" v-if="isRank">{{index+1}}</div>
                        <img :src="item.coverUrl || item.picUrl" alt="" >
                    </div>
                    <div class="card-name" :title="item.name">{{item.name}}</div>
                    <div class="card-artist" v-if="isShowAuthor">
                        <span>{{item.creatorName || item.dj.nickname}}</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'RadiosList',
    props:['title','list','isMore','isRank','isShowAuthor'],
    methods:{
        handleToRadio(id){
            if (id) {
                this.$router.push("/radio/detail/"+id)
                console.log("666")
            }
        }
    }

}
</script>

<style scoped>
    .radio{overflow: hidden;}
    .radio .radio-header{display: flex;justify-content: space-between;margin: 16px 0px;}
    .radio .radio-header .header-name{font-size: 22px;}
    .radio .radio-header .header-more{font-size: 14px;color: rgb(159,159,159);}
    .radio .radio-header .header-more:hover{color: rgb(30, 208, 160);}
    .radio .radio-header .header-more span{margin-right: 10px;}
    .radio .radio-cont{display: flex;margin-left: 0;flex-wrap: wrap;}
    .radio .radio-cont .cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
    .radio .radio-cont .cont-card:nth-of-type(6n+1){margin-left: 0px;}
    .radio .radio-cont .cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
    .radio .radio-cont .cont-card .card-cover .cover-rank{ position: absolute;left: 10px; width: 20px; height: 32px;line-height: 32px;text-align: center;border-radius: 0px 0px 10px 10px; background: rgb(30,208,160);color: rgb(246,246,246);}
    .radio .radio-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .radio .radio-cont .cont-card .card-cover img{width: 188px;border-radius: 12px;}
    .radio .radio-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .radio .radio-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .radio .radio-cont .cont-card .card-name{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .radio .radio-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}
</style>