<template>
  <div class="main-content">
    <div class="mv">
        <div class="mv-item newest">
            <div class="item-header">
                <div class="header-name">最新MV</div>
                <ul>
                    <li :class="{active:index==newestCatChoice}" v-for="(mvCat,index) in mvCatList" @click="handleToNewestMv(mvCat.cat,index)"  :key="mvCat.id">{{mvCat.cat}}</li>
                </ul>
            </div>
            <div class="item-cont">
                <div class="cont-card" v-for="mv in newestMvList" :key="mv.id">
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
        <div class="mv-item">
            <div class="item-header">
                <div class="header-name">MV排行榜</div>
                <ul>
                    <li :class="{active:index==rankCatChoice}" v-for="(mvCat,index) in mvCatList" @click="handleToRankMv(mvCat.cat,index)"  :key="mvCat.id">{{mvCat.cat}}</li>
                </ul>
            </div>
            <div class="item-cont">
                <div class="cont-card" v-for="(mv,index) in rankMvList" :key="mv.id">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <div class="cover-rank">{{index+1}}</div>
                        <img :src="mv.cover" alt="" >
                    </div>
                    <div class="card-name" :title="mv.name">{{mv.name}}</div>
                    <div class="card-artist">
                        <span>{{mv.artists | arname}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mv-item">
            <div class="item-header">
                <div class="header-name">网易出品</div>
                <div class="header-more">
                    <span>更多</span>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
            <div class="item-cont">
                <div class="cont-card" v-for="mv in neteaseMvList" :key="mv.id">
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
    .mv{width: 1238px;}
    .mv .mv-item{margin: 10px  0px; overflow: hidden;}
    .mv .mv-item .item-header{display: flex;justify-content: space-between; margin-bottom: 16px;height: 30px;}
    .mv .mv-item .item-header .header-name{font-size: 22px;line-height: 30px;}
    .mv .mv-item .item-header .header-more{font-size: 14px;color: rgb(159,159,159);}
    .mv .mv-item .item-header .header-more:hover{color: rgb(30, 208, 160);}
    .mv .mv-item .item-header .header-more span{margin-right: 10px;}
    .mv .mv-item .item-header ul{display: flex;margin-left: 10px;}
    .mv .mv-item .item-header ul li{width: 66px;height: 22px;font-size: 13px;line-height: 22px;text-align: center;border: 1px solid rgb(216, 216, 216); border-radius: 20px;margin:3px 7px;}
    .mv .mv-item .item-header ul li.active{background: rgb(30, 208, 160);color: white;}
    .mv .mv-item .item-cont{display: flex;margin-left: 0;flex-wrap: wrap;}
    .mv .mv-item .item-cont .cont-card{width: 293px; margin-left: 22px;margin-bottom: 15px;}
    .mv .mv-item .item-cont .cont-card:nth-of-type(4n+1){margin-left: 0px;}
    .mv .mv-item .item-cont .cont-card .card-cover{height: 165px; overflow: hidden; margin-bottom: 10px;border-radius: 12px;position: relative;}/**网易云的接口返回的第一个数据的图片与其他数据图片的尺寸不同，所以只能多设置一个高度 */
    .mv .mv-item .item-cont .cont-card .card-cover .cover-rank{ position: absolute;left: 10px; width: 20px; height: 32px;line-height: 32px;text-align: center;border-radius: 0px 0px 10px 10px; background: rgb(30,208,160);color: rgb(246,246,246);}
    .mv .mv-item .item-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .mv .mv-item .item-cont .cont-card .card-cover img{width: 293px;border-radius: 12px;}
    .mv .mv-item .item-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .mv .mv-item .item-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .mv .mv-item .item-cont .cont-card .card-name{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .mv .mv-item .item-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}
</style>