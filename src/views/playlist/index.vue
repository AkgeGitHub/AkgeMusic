<template>
    <div id="main">
        <div class="songlist-des">
            <div class="des-cover">
                <img :src="songDetail.coverImgUrl" alt="">
            </div>
            <div class="des-cont">
                <div class="cont-name">{{songDetail.name}}</div>
                <div class="cont-info">
                    <div class="info-creator">
                        <img :src="creator.avatarUrl" alt="">
                        <div>{{creator.nickname}}</div>
                        <div>{{songDetail.createTime | time}} 创建</div>
                    </div>
                    <div class="info-brief" :title="songDetail.description">
                        {{songDetail.description}}
                    </div>
                </div>
                <div class="cont-btn">
                    <div>
                        <i class="far fa-play-circle"></i>
                        全部播放
                    </div>
                    <div>
                        <i class="far fa-heart"></i>
                        收藏
                    </div>
                    <div>
                        <i class="far fa-share-square"></i>
                        分享
                    </div>
                </div>

            </div>
        </div>
		<div class="songlist-cont">
			<div class="cont-nav">
				<div class="nav-left">
                    <a href="" :class="{active:activeIndex==index}" v-for="(cat,index) in category" :key="cat.id" @click.prevent="handleToClick(index)">{{cat.name}}</a>
				</div>
				<div class="nav-right">
					<div>
						<i class="fas fa-search"></i> 搜索
					</div>
					<div>
						<i class="fas fa-sort-alpha-down"></i> 排序
					</div>
				</div>
			</div>

            <SongsList :songsList='songsList' v-show="showIndex==0"></SongsList>
            <CommentsList :commentsList='commentsList' :hotCommentsList='hotCommentsList' v-show="showIndex==1"></CommentsList>

		</div>
    </div>
</template>

<script>
export default {
	name: "SongList",
	data(){
        return{
            songDetail:{},
            creator:[],
            songsList:[],
            commentsList:[],
            hotCommentsList:[],
            category:[
                {name:"歌曲",id:"0"},
                {name:"评论",id:"1"}
            ],
            showIndex:0,
            activeIndex:0

        }
    },
    methods:{
         getPlayListDetail(){
            // 获取歌单信息和歌单内容
            this.axios.get("/playlist/detail?id="+this.playId).then((res)=>{
                if (res.data.code===200) {
                    this.songDetail=res.data.playlist
					this.creator=res.data.playlist.creator
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
            }),
            
            // 获取歌单评论
            this.axios.get("/comment/playlist?id="+this.playId).then((res)=>{
                this.commentsList=res.data.comments
                this.hotCommentsList=res.data.hotComments.slice(0,5) // 取前5条热评
            })
        },
        handleToSong(songid){
            this.axios.get("/song/url?id="+songid).then((res)=>{
                var songurl=res.data.data[0].url;
                this.$store.commit("SONG",{songurl,songid});
            })
        },
        handleToClick(index){
            this.showIndex=index,
            this.activeIndex=index
        }
	},
	computed:{
		playId(){
			return this.$route.params.playid
		}
	},
	mounted(){
        this.getPlayListDetail()
	},
	watch:{
        $route(newvalue){
            if (newvalue) {
                this.getPlayListDetail()
            }
        }
    }
}
</script>

<style scoped>
    .songlist-des{display: flex;}
    .songlist-des .des-cover{width: 170px;height: 170px;overflow: hidden;flex-shrink: 0;}
    .songlist-des .des-cover img{width: 170px;height: 170px;border-radius: 10px;}
    .songlist-des .des-cont{margin-left: 20px;height: 170px;display: flex;flex-direction: column;justify-content: space-between;}
    .songlist-des .des-cont .cont-name{font-size: 24px;font-weight: bold; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .songlist-des .des-cont .cont-info{margin-top: 15px;}
    .songlist-des .des-cont .cont-info .info-creator{display: flex;flex-wrap: wrap;line-height: 40px;}
    .songlist-des .des-cont .cont-info .info-creator img{width: 40px;height: 40px;border-radius: 50%;overflow: hidden;}
    .songlist-des .des-cont .cont-info .info-creator div{margin-left: 10px;font-size: 13px;color: rgb(159,159,159);}
    .songlist-des .des-cont .cont-info .info-brief{width: 1000px; font-size: 14px;margin: 10px 0px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
    .songlist-des .des-cont .cont-btn{display: flex;flex-wrap: wrap;margin-bottom: 5px;}
    .songlist-des .des-cont .cont-btn div{width: 110px;height: 35px;color: rgb(41, 40, 40); background: rgb(219,219,219);text-align: center;line-height: 35px;border-radius: 20px;margin-right: 10px;font-size: 14px;}
	.songlist-des .des-cont .cont-btn div i{margin-right: 4px;}
	.songlist-cont .cont-nav{display: flex;flex-wrap: wrap;overflow: hidden;margin-top: 20px;justify-content: space-between;}
    .songlist-cont .cont-nav .nav-left{display: flex;flex-wrap:wrap; overflow: hidden;font-size: 14px;}
    .songlist-cont .cont-nav .nav-left a{display: block; height: 32px;margin-right: 50px;line-height: 32px;}
    .songlist-cont .cont-nav .nav-left a.active{color: rgb(30, 208, 160);border-bottom: 1px solid rgb(30, 208, 160);}
    .songlist-cont .cont-nav .nav-right{display: flex;flex-wrap: wrap;overflow: hidden;font-size: 13px;}
    .songlist-cont .cont-nav .nav-right div{height: 36px;margin-left: 30px;line-height: 36px;}
</style>