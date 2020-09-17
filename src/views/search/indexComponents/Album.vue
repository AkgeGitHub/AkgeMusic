<template>
    <div class="album">
            <div class="album-cont">
                <div class="cont-card" v-for="album in albumList" :key="album.id">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <img :src="album.picUrl" alt="" >
                    </div>
                    <div class="card-name" :title="album.name">{{album.name}}</div>
                    <div class="card-artist">
                        <span>{{album.artists | arname}}</span>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name:"Album",
    data(){
        return{
            albumList:[]

        }
    },
    methods:{
       getSearchRes(){
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=10").then((res)=>{
                if (res.data.code===200) {
                    this.albumList=res.data.result.albums
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
    .album{width: 1238px;}
    .album .album-cont{display: flex;margin-left: 0;flex-wrap: wrap;}
    .album .album-cont .cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
    .album .album-cont .cont-card:nth-of-type(6n+1){margin-left: 0px;}
    .album .album-cont .cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
    .album .album-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .album .album-cont .cont-card .card-cover img{width: 188px;border-radius: 12px;}
    .album .album-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .album .album-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .album .album-cont .cont-card .card-name{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .album .album-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}

</style>