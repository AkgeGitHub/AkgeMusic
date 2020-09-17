<template>
    <div class="video">
        <div class="mv">
            <div class="mv-cont">
                <div class="cont-card" v-for="mv in mvList" :key="mv.id" @click="handleToVideo(mv.id)">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <img :src="mv.cover" alt="" >
                    </div>
                    <div class="card-name" :title="mv.name">{{mv.name}}</div>
                    <div class="card-artist">
                        <span>{{mv.artists | arname}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Songs",
    data(){
        return{
            mvList:[]

        }
    },
    methods:{
        getSearchRes(){
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=1004").then((res)=>{
                if (res.data.code===200) {
                    this.mvList=res.data.result.mvs
                }else{
                    console.log("请求数据失败")
                }
            })
        },
        handleToVideo(id){
            this.$router.push("/video/detail/"+id)
        }
       
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
       $route(newvalue){
            if (newvalue) {
               this.getSearchRes()
            }
        }
    },

}
</script>

<style scoped>
    .mv{width: 1238px;}
    .mv .mv-cont{display: flex;margin-left: 0;flex-wrap: wrap;}
    .mv .mv-cont .cont-card{width: 293px; margin-left: 22px;margin-bottom: 15px;}
    .mv .mv-cont .cont-card:nth-of-type(4n+1){margin-left: 0px;}
    .mv .mv-cont .cont-card .card-cover{height: 165px; overflow: hidden; margin-bottom: 10px;border-radius: 12px;position: relative;}/**网易云的接口返回的第一个数据的图片与其他数据图片的尺寸不同，所以只能多设置一个高度 */
    .mv .mv-cont .cont-card .card-cover .cover-rank{ position: absolute;left: 10px; width: 20px; height: 32px;line-height: 32px;text-align: center;border-radius: 0px 0px 10px 10px; background: rgb(30,208,160);color: rgb(246,246,246);}
    .mv .mv-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .mv .mv-cont .cont-card .card-cover img{width: 293px;border-radius: 12px;}
    .mv .mv-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .mv .mv-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .mv .mv-cont .cont-card .card-name{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .mv .mv-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}

</style>