<template>
    <div class="singer">
        <div class="singer-card" v-for="singer in singerList" :key="singer.id">
            <div class="card-cover"> 
            <img :src="singer.img1v1Url" alt="">
            </div>
            <div class="card-name">{{singer.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Singer",
    data(){
        return{
            singerList:[]

        }
    },
    methods:{
        getSearchRes(){
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=100").then((res)=>{
                if (res.data.code===200) {
                    this.singerList=res.data.result.artists
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
    .singer{width: 1238px; display: flex;flex-wrap: wrap;}
    .singer .singer-card{width: 188px;text-align: center;margin-left: 22px;margin-bottom: 22px;}
    .singer .singer-card:nth-of-type(6n+1){margin-left: 0px;}
    .singer .singer-card .card-cover{width: 188px;height: 188px;margin-bottom: 8px;}
    .singer .singer-card .card-cover img{width: 186px;height: 186px;border-radius: 50%;border: 1px solid rgb(216,216,216);}
    .singer .singer-card .card-name{height: 20px;;line-height: 20px;}

</style>