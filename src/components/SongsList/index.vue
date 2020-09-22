<template>
    <div class="songs">
        <div class="song-item header">
            <div class="songname"><a href="">歌曲</a></div>
            <div class="arname"><a href="">歌手</a></div>
            <div class="alname"><a href="">专辑</a></div>
            <div class="duration"><a href="">时长</a></div>
        </div>
        <div class="song-item" v-for="song in songsList" :key="song.id" @click.prevent="handleToSong(song.id)">
            <div class="songname">
                <i class="far fa-heart fas fa-heart fa-fw"></i>
                <a href="">{{song.name}}</a>
            </div>
            <div class="arname"><a href="">{{song.ar | arname}}</a></div>
            <div class="alname"><a href="">{{song.al.name}}</a></div>
            <div class="duration"><a href="">{{song.dt | duration}}</a></div>
        </div>

    </div>   
</template>

<script>
export default {
    name:'SongsList',
    props: ['songsList'],
    filters: {
        duration: function (dt) {
            var commonTime=new Date(dt);
            var h=(commonTime.getHours()-8)>9?commonTime.getHours()-8:"0"+commonTime.getHours()-8;
            var m=commonTime.getMinutes()>9?commonTime.getMinutes():"0"+commonTime.getMinutes();
            var s=commonTime.getSeconds()>9?commonTime.getSeconds():"0"+commonTime.getSeconds();
            var duration=h+":"+m+":"+s;
            return duration;
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
    }


}
</script>

<style scoped>
    .songs{font-size: 14px;}
    .songs .song-item{height: 30px;display: flex;justify-content: space-between;margin-bottom: 8px;padding: 5px; font-size: 14px;}
    .songs .song-item.header{margin:  8px 0px;}
    .songs .song-item.header a{color: rgb(136, 136, 136);}
    .songs .song-item div{padding-right: 15px;line-height: 30px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .songs .song-item div i{color: rgb(159,159,159);margin-right: 8px;}
    .songs .song-item:first-of-type div i{color: rgb(255,106,106);}
    .songs .song-item .songname{width: 460.5px;}
    .songs .song-item:not(.header) .songname:hover{color: rgb(30, 208, 160);}
    .songs .song-item .arname{width: 307px;}
    .songs .song-item .alname{width: 307px;}
    .songs .song-item .duration{width: 153.5px;}

</style>