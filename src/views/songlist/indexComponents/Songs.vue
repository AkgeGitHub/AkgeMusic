<template>
    <div class="cont-songs">
        <div class="songs-header">
            <div>歌曲</div>
            <div>歌手</div>
            <div>专辑</div>
        </div>
        <div class="songs-cont">
            <div class="cont-item" v-for="song in songsList" :key="song.id" @click="handleToSong(song.id)">
                <div>
                    <i class="far fa-heart fas fa-heart fa-fw"></i>
                    {{song.name}}
                </div>
                <div>{{song.ar | arname}}</div>
                <div>{{song.al.name}}</div>
            </div>

        </div>   
    </div>
</template>

<script>
export default {
    name:"Songs",
    data(){
        return{
            songDetail:{},
            creator:[],
            songsList:[]

        }
    },
    methods:{
        getSongDetail(){
            this.axios.get("/playlist/detail?id="+this.playId).then((res)=>{
                if (res.data.code===200) {
                    // 未登录返回的playlist中的tracks是不完整的,trackIds是完整的
                    // 可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
                    var trackIds=res.data.playlist.trackIds
                    var idsArr=trackIds.map(item=>item.id)
                    var idsStr=idsArr.join(",")
                    this.axios("/song/detail?ids="+idsStr).then((res)=>{
                        if (res.data.code===200) {
                            this.songsList=res.data.songs
                        }
                    })
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
    computed:{
        playId(){
            return this.$route.params.playid
        }
    },
    mounted(){
        this.getSongDetail()
    },
    watch:{
        $route(newvalue){
            if (newvalue) {
                this.getSongDetail()
            }
        }
    },

}
</script>

<style scoped>
    .songlist-cont .cont-songs .songs-header{display: flex;margin: 12px 0px;font-size: 13px;color: rgb(136, 136, 136);padding-left: 5px;}
    .songlist-cont .cont-songs .songs-header div{flex: 1;}
    .songlist-cont .cont-songs .songs-cont .cont-item{display: flex;justify-content: space-between; font-size: 14px;margin-bottom: 16px;height: 30px;padding-left: 5px;}
    .songlist-cont .cont-songs .songs-cont .cont-item div{width: 412px; padding-right: 15px; flex: 1;line-height: 30px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .songlist-cont .cont-songs .songs-cont .cont-item div i{color: rgb(159,159,159);margin-right: 8px;}
    .songlist-cont .cont-songs .songs-cont .cont-item:first-of-type div i{color: rgb(255,106,106);}

</style>