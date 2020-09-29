<template>
    <div class="program">
        <div class="program-header" v-if="title">
            <div class="header-name">{{title}}</div>
        </div>
        <div class="program-cont">
            <div class="cont-card" v-for="(item,index) in list" :key="item.mainSong.id" @click.prevent="handleToSong(item.mainSong.id)">  <!--注意节目的id和电台的id是不同的，要想获得音频应该传入的是节目下的radio中的id -->
                <a href="">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <div class="cover-rank" v-if="isRank">{{index+1}}</div>
                        <img :src="item.coverUrl" alt="" >
                    </div>
                    <div class="card-name" :title="item.name">{{item.name}}</div>
                    <div class="card-artist" v-if="isShowAuthor">
                        <span>{{item.mainSong.artists | arname}}</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['title','list','isMore','isRank','isShowAuthor'],
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
    }

}
</script>

<style scoped>
    .program{overflow: hidden;}
    .program .program-header{display: flex;justify-content: space-between;margin: 16px 0px;}
    .program .program-header .header-name{font-size: 22px;}
    .program .program-header .header-more{font-size: 14px;color: rgb(159,159,159);}
    .program .program-header .header-more:hover{color: rgb(30, 208, 160);}
    .program .program-header .header-more span{margin-right: 10px;}
    .program .program-cont{display: flex;margin-left: 0;flex-wrap: wrap;}
    .program .program-cont .cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
    .program .program-cont .cont-card:nth-of-type(6n+1){margin-left: 0px;}
    .program .program-cont .cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
    .program .program-cont .cont-card .card-cover .cover-rank{ position: absolute;left: 10px; width: 20px; height: 32px;line-height: 32px;text-align: center;border-radius: 0px 0px 10px 10px; background: rgb(30,208,160);color: rgb(246,246,246);}
    .program .program-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .program .program-cont .cont-card .card-cover img{width: 188px;border-radius: 12px;}
    .program .program-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .program .program-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .program .program-cont .cont-card .card-name{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .program .program-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}
</style>