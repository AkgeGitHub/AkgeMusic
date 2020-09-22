<template>
    <div class="musicList">
        <div class="musicList-header" v-if="title">
            <div class="musicList-name">{{title}}</div>
            <div class="musicList-more" v-if="isMore">
                <span>更多</span>
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
        <div class="musicList-cont">
            <div class="cont-card" v-for="song in songsList" :key="song.id" @click.prevent="handleToSong(song.id)">
                <a href="">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <img :src="song.album.picUrl" alt="" >
                    </div>
                    <div class="card-title" :title="song.name">{{song.name}}</div>
                    <div class="card-artist">
                        <span :title="song.artists | arname">{{song.artists | arname}}</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['title','songsList','isMore'],
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
    .musicList{width: 1238px;overflow: hidden;}
    .musicList .musicList-header{display: flex;justify-content: space-between;margin: 16px 0px;}
    .musicList .musicList-header .musicList-name{font-size: 22px;}
    .musicList .musicList-header .musicList-more{font-size: 14px;color: rgb(159,159,159);}
    .musicList .musicList-header .musicList-more:hover{color: rgb(30, 208, 160);}
    .musicList .musicList-header .musicList-more span{margin-right: 10px;}
    .musicList .musicList-cont{display: flex;overflow: auto;margin-left: 0;}
    .musicList .musicList-cont .cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
    .musicList .musicList-cont .cont-card:first-child{margin-left: 0px;}
    .musicList .musicList-cont .cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
    .musicList .musicList-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .musicList .musicList-cont .cont-card .card-cover img{width: 188px;border-radius: 12px;}
    .musicList .musicList-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .musicList .musicList-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .musicList .musicList-cont .cont-card .card-title{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .musicList .musicList-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
</style>