<template>
    <div class="main-content">
        <div class="main-cont-title">
			<div class="title">视频</div>
		</div>
        <MvsList title='最新MV' :mvsList='newestMvList'>
            <div class="header-sort">
                <a href="" :class="{active:index==newestCatChoice}" v-for="(mvCat,index) in mvCatList" @click.prevent="handleToNewestMv(mvCat.cat,index)"  :key="mvCat.id">{{mvCat.cat}}</a>
            </div>
        </MvsList>
        <MvsList title='MV排行榜' :mvsList='rankMvList' :isRank='true'>
            <div class="header-sort">
                <a href="" :class="{active:index==rankCatChoice}" v-for="(mvCat,index) in mvCatList" @click.prevent="handleToRankMv(mvCat.cat,index)"  :key="mvCat.id">{{mvCat.cat}}</a>
            </div>
        </MvsList>
        <MvsList title='网易出品' :mvsList='neteaseMvList' :isMore='true'></MvsList>
	</div>
</template>

<script>
export default {
    data(){
        return{
            newestArea:"内地",
            rankArea:"内地",
            newestCatChoice:0,
            rankCatChoice:0,
            mvCatList:[
                {cat:"内地",id:1},
                {cat:"港台",id:2},
                {cat:"欧美",id:3},
                {cat:"日本",id:4},
                {cat:"韩国",id:5}
            ],
            newestMvList:[],
            neteaseMvList:[],
            rankMvList:[]
        }
    },
    methods:{
        getNewestMvList(){
            this.axios.get("/mv/first?area="+this.newestArea+"&limit=12").then((res)=>{
                if (res.data.code===200) {
                    this.newestMvList=res.data.data
                }else{
                    console.log("请求数据失败")
                }
            })
        },
        getRankMvList(){
            this.axios.get("/top/mv?area="+this.rankArea+"&limit=8").then((res)=>{
                if (res.data.code===200) {
                    this.rankMvList=res.data.data
                }else{
                    console.log("请求数据失败")
                }
            })
        },
        handleToNewestMv(cat,index){
            this.newestCatChoice=index;
            this.newestArea=cat;
        },
        handleToRankMv(cat,index){
            this.rankCatChoice=index;
            this.rankArea=cat;
        },
        handleToVideo(id){
             this.$router.push("/video/detail/"+id)
        }
    },
    mounted(){
        this.getNewestMvList(); // 最新mv
        this.getRankMvList(); // mv排行榜
        this.axios("/mv/exclusive/rcmd?limit=8").then((res)=>{ //网易出品
            this.neteaseMvList=res.data.data
        })
    },
    watch:{
        newestArea(){
            this.getNewestMvList();
        },
        rankArea(){
            this.getRankMvList();
        }
    }

}
</script>

<style scoped>
    .main-cont-title{width: 100%; background: rgb(246,246,246);}
	.main-cont-title .title{font-size: 30px;margin-bottom: 20px;}
</style>