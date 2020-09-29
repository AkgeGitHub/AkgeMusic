<template>
    <div class="songs">
        <div class="song-item header">
            <div class="item-3x">歌曲</div>
            <div class="item-2x">歌手</div>
            <div class="item-2x">专辑</div>
            <div class="item-x">时长</div>
        </div>
        <div class="song-item" v-for="item in list" :key="item.id" @click.prevent="handleToSong(item.id)">
            <div class="item-3x">
                <i class="far fa-heart fas fa-heart fa-fw"></i>
                <a href="">{{item.name}}</a>
            </div>
            <div class="item-2x"><a href="">{{item.ar | arname}}</a></div>
            <div class="item-2x"><a href="">{{item.al.name}}</a></div>
            <div class="item-x"><a href="">{{item.dt | duration}}</a></div>
        </div>

    </div>   
</template>

<script>
export default {
    name:'SongsList',
    props: ['list'],
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
    .songs .song-item.header{margin:  8px 0px;color: rgb(136, 136, 136);}
    .songs .song-item div{padding-right: 15px;line-height: 30px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .songs .song-item div i{color: rgb(159,159,159);margin-right: 8px;}
    .songs .song-item:first-of-type div i{color: rgb(255,106,106);}
    .songs .song-item .songname{width: 460.5px;}
    .songs .song-item:not(.header) .songname:hover{color: rgb(30, 208, 160);}
    .songs .song-item .item-3x{flex: 37.5%;}
    .songs .song-item .item-2x{flex: 25%;}
    .songs .song-item .item-x{flex: 12.5%;}

</style>