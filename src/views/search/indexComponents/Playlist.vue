<template>
    <div class="playlist">
        <div class="playlist-cont">
            <div class="cont-item" v-for="playlist in playLists" :key="playlist.id" >
                <div class="item-cover">
                  <img :src="playlist.coverImgUrl" alt="">
                  <div>{{playlist.name}}</div>
                </div>
                <div class="item-ar">by {{playlist.creator.nickname}}</div>
                <div class="item-songsum">{{playlist.trackCount}} 首</div>
                <div class="item-playcount">{{playlist.playCount}} 次播放</div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"PlayList",
    data(){
        return{
            playLists:[]

        }
    },
    methods:{
        getSearchRes(){
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=1000").then((res)=>{
                if (res.data.code===200) {
                    this.playLists=res.data.result.playlists
                }else{
                    console.log("请求数据失败")
                }
            })
        },
       
    },
    computed:{
        keywords(){
            return this.$route.params.keywords
        },
       
    },
    mounted(){
        this.getSearchRes()
    },
    watch:{
       keywords(){
           this.getSearchRes()
       },
    },

}
</script>

<style scoped>
    .playlist .playlist-cont{width: 1238px;}
    .playlist .playlist-cont .cont-item{display: flex;margin-bottom: 15px;font-size: 14px;}
    .playlist .playlist-cont .cont-item>div{width: 190px; margin-left: 30px; line-height: 80px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;}
    .playlist .playlist-cont .cont-item .item-cover{width: 578px; height: 80px; margin-left: 0; display: flex;}
    .playlist .playlist-cont .cont-item .item-cover img{width: 80px; height: 80px;border-radius: 10px;}
    .playlist .playlist-cont .cont-item .item-cover div{line-height: 80px;margin-left: 15px;}
    .playlist .playlist-cont .cont-item .item-ar{text-align: left;}
    .playlist .playlist-cont .cont-item .item-songsum{text-align: center;}
    .playlist .playlist-cont .cont-item .item-playcount{text-align: right;color: rgb(192, 192, 192); }
</style>