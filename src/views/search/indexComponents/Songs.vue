<template>
    <div class="songs">
        <div class="song-item header">
            <div class="songname">歌曲</div>
            <div class="arname">歌手</div>
            <div class="alname">专辑</div>
            <div class="duration">时长</div>
        </div>
        <div class="song-item" v-for="song in songsList" :key="song.id" @click="handleToSong(song.id)">
            <div class="songname">
                <i class="far fa-heart fas fa-heart fa-fw"></i>
                {{song.name}}
            </div>
            <div class="arname">{{song.ar | arname}}</div>
            <div class="alname">{{song.al.name}}</div>
            <div class="duration">{{song.dt | duration}}</div>
        </div>

    </div>   
</template>

<script>
export default {
    name:"Songs",
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
    data(){
        return{
            songsList:[]

        }
    },
    computed:{
        keywords(){
            return this.$route.params.keywords
        },
    },
    methods:{
        getSearchRes(){
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=1").then((res)=>{
                if (res.data.code===200) {
                    this.songsList=res.data.result.songs
                }else{
                    console.log("请求数据失败")
                }
            })
        },
        handleToSong(songid){
            this.axios.get("/song/url?id="+songid).then((res)=>{
                var songurl=res.data.data[0].url;
                this.$store.commit("SONG",{songurl,songid});
            })
        },
    },
    mounted(){
        this.getSearchRes()
    },
    watch:{
       keywords(){
           this.getSearchRes()
       }
    },

}
</script>

<style scoped>
    .songs{font-size: 14px;}
    .songs .song-item{height: 30px;display: flex;justify-content: space-between;margin-bottom: 8px;padding: 5px; font-size: 14px;}
    .songs .song-item.header{color: rgb(136, 136, 136);margin:  8px 0px;}
    .songs .song-item div{padding-right: 15px;line-height: 30px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .songs .song-item div i{color: rgb(159,159,159);margin-right: 8px;}
    .songs .song-item:first-of-type div i{color: rgb(255,106,106);}
    .songs .song-item .songname{width: 460.5px;}
    .songs .song-item:not(.header) .songname:hover{color: rgb(30, 208, 160);}
    .songs .song-item .arname{width: 307px;}
    .songs .song-item .alname{width: 307px;}
    .songs .song-item .duration{width: 153.5px;}

</style>