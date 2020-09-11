<template>
    <div class="main-content">
        <div class="rank">
            <div class="rank-popular">
                <div class="popular-big-card">
                    <div class="card-cover">
                        <img :src="raiseTopImg" alt="">
                    </div>
                </div>
                <div class="popular-small-card">
                    <div class="popular-card">
                        <div class="card-cover">
                            <img :src="raiseTopImg" alt="">
                        </div>
                        <div class="card-cont">
                            <h3 class="cont-title">飙升榜</h3>
                            <ul class="cont-body">
                                <li v-for="(raise,index) in raiseRank" :key="raise.id">
                                    <span>{{index+1}} </span>
                                    <span>{{raise.name}}</span>
                                    <span> - </span>
                                    <span>{{raise.ar | arname}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="popular-card">
                        <div class="card-cover">
                            <img :src="newTopImg" alt="">
                        </div>
                        <div class="card-cont">
                            <h3 class="cont-title">新歌榜</h3>
                            <ul class="cont-body">
                                <li v-for="(newsong,index) in newRank" :key="newsong.id">
                                    <span>{{index+1}} </span>
                                    <span>{{newsong.name}}</span>
                                    <span> - </span>
                                    <span>{{newsong.ar | arname}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="popular-card">
                        <div class="card-cover">
                            <img :src="ortopImg" alt="">
                        </div>
                        <div class="card-cont">
                            <h3 class="cont-title">原创榜</h3>
                            <ul class="cont-body">
                                <li v-for="(origin,index) in originRank" :key="origin.id">
                                    <span>{{index+1}} </span>
                                    <span>{{origin.name}}</span>
                                    <span> - </span>
                                    <span>{{origin.ar | arname}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="popular-card">
                        <div class="card-cover">
                            <img :src="hotTopImg" alt="">
                        </div>
                        <div class="card-cont">
                            <h3 class="cont-title">热歌榜</h3>
                            <ul class="cont-body">
                                <li v-for="(hot,index) in hotRank" :key="hot.id">
                                    <span>{{index+1}} </span>
                                    <span>{{hot.name}}</span>
                                    <span> - </span>
                                    <span>{{hot.ar | arname}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rank-global">
                <div class="global-title">全球媒体榜</div>
                <div class="global-cont">
                    <div class="global-card" v-for="rank in rankLists.slice(4)" :key="rank.id">
                        <div class="card-cover">
                            <img :src="rank.coverImgUrl" alt="">
                        </div>
                        <div class="card-des" :title="rank.name">{{rank.name}}</div>
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
            // 由于想做榜一的图片作为封面，但是网易云榜单摘要的接口里没有，所以只能浪费资源去单独请求这4个榜单
            raiseRank:[], // 飙升榜
            raiseTopImg:"",// 榜一图片
            newRank:[], // 新歌榜
            newTopImg:"",
            originRank:[], // 原创榜
            ortopImg:"",
            hotRank:[], // 热歌榜
            hotTopImg:"",
            rankLists:[], // 全部榜单
        }
    },
    mounted(){
        // 飙升榜
        this.axios.get("/playlist/detail?id=19723756").then((res)=>{
            this.raiseRank=res.data.playlist.tracks.slice(0,3);
            this.raiseTopImg=res.data.playlist.tracks[0].al.picUrl;
        })
        // 新歌榜
        this.axios.get("/playlist/detail?id=3779629").then((res)=>{
            this.newRank=res.data.playlist.tracks.slice(0,3);
            this.newTopImg=res.data.playlist.tracks[0].al.picUrl;
        })
        // 原创榜
        this.axios.get("/playlist/detail?id=2884035").then((res)=>{
            this.originRank=res.data.playlist.tracks.slice(0,3);
            this.ortopImg=res.data.playlist.tracks[0].al.picUrl;
        })
        // 热歌榜
        this.axios.get("/playlist/detail?id=3778678").then((res)=>{
            this.hotRank=res.data.playlist.tracks.slice(0,3);
            this.hotTopImg=res.data.playlist.tracks[0].al.picUrl;
        })
        // 全部榜单
        this.axios.get("/toplist/detail").then((res)=>{
            this.rankLists=res.data.list;
        })
    }

}
</script>

<style scoped>
    .rank{width: 1238px;}
    .rank .rank-popular{margin-bottom: 30px;display: flex;}
    .rank .rank-popular .popular-big-card{width: 322px; height: 322px;flex-shrink: 0;}
    .rank .rank-popular .popular-big-card .card-cover{border-radius: 10px;box-shadow: 5px 0px 5px rgb(136, 136, 136);}
    .rank .rank-popular .popular-big-card .card-cover img{width: 322px;height: 322px;border-radius: 10px;}
    .rank .rank-popular .popular-small-card{width: 916px;display: flex;flex-wrap: wrap;flex-shrink: 0;align-content: space-between;}
    .rank .rank-popular .popular-small-card .popular-card{width: 436px;height: 150px;margin-left: 22px; background: rgb(239,239,239);border-radius: 10px;display: flex;}
    .rank .rank-popular .popular-small-card .popular-card .card-cover{width: 150px;height: 150px;border-radius: 10px;overflow: hidden;flex-shrink: 0;}
    .rank .rank-popular .popular-small-card .popular-card .card-cover img{width: 150px;height: 150px;}
    .rank .rank-popular .popular-small-card .popular-card .card-cont{width: 286px; padding: 22px;}
    .rank .rank-popular .popular-small-card .popular-card .card-cont .cont-body{margin-top: 6px;font-size: 13px;color: rgb(136, 136, 136);}
    .rank .rank-popular .popular-small-card .popular-card .card-cont .cont-body li{width: 242px; height: 25px;line-height: 25px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .rank .rank-global{margin-bottom: 10px;}
    .rank .rank-global .global-title{font-size: 23px;margin-bottom: 19px;}
    .rank .rank-global .global-cont{display: flex;flex-wrap: wrap;}
    .rank .rank-global .global-cont .global-card{margin:0px 19px 19px 0px;flex-shrink: 0;border-radius: 10px;overflow: hidden;position: relative;}
    .rank .rank-global .global-cont .global-card:nth-of-type(7n){margin-right: 0;}
    .rank .rank-global .global-cont .global-card .card-cover{width: 160px;height: 160px;border-radius: 10px;overflow: hidden;}
    .rank .rank-global .global-cont .global-card .card-cover img{width: 160px;height: 160px;border-radius: 10px;}
    .rank .rank-global .global-cont .global-card .card-des{position: absolute;left: 0;bottom: 0;width: 140px;height: 30px;line-height: 30px;font-size: 14px; text-align: center;
    padding: 0 10px; border-radius:0px 0px 10px 10px;color: white; background: rgba(0,0,0,0.15);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
</style>