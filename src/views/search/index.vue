<template>
  <div id="main">
		<div class="main-header">
			<div class="nav clearfix">
				<a href="" :class="{active:activeIndex==index}" v-for="(item,index) in category" :key="item.type" @click.prevent="handleToClick(index)">
					{{item.name}}
				</a>
			</div>
		</div>

		<SongsList :list="songsList" v-show="showIndex==0"></SongsList>
        <MvsList :list='mvsList' v-show="showIndex==1"></MvsList>
        <AlbumsList :list='albumsList' v-show="showIndex==2"></AlbumsList>
        <SearchPlayLists :list='playLists' v-show="showIndex==3"></SearchPlayLists>
        <SingersList :list='singersList' v-show="showIndex==4"></SingersList>
		
	</div>
</template>

<script>
import SearchPlayLists from '@/views/search/components/SearchPlayLists';
export default {
    name:"Search",
    components:{
        "SearchPlayLists":SearchPlayLists
    },
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
			activeIndex:0,
			showIndex:0,
			category:[
				{name:"歌曲",type:"1"},
				{name:"MV",type:"1004"},
				{name:"专辑",type:"10"},
				{name:"歌单",type:"1000"},
				{name:"歌手",type:"100"},
			],
            songsList:[],
            mvsList:[],
            albumsList:[],
            singersList:[],
            playLists:[]
		}
	},
	computed:{
        keywords(){
            return this.$route.params.keywords
        },
    },
    methods:{
        getSearchRes(){
            // 获取歌曲列表
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=1").then((res)=>{ 
                if (res.data.code===200) {
                    this.songsList=res.data.result.songs
                }else{
                    console.log("请求数据失败")
                }
            }),
            // 获取mv列表
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=1004").then((res)=>{
                if (res.data.code===200) {
                    this.mvsList=res.data.result.mvs
                }else{
                    console.log("请求数据失败")
                }
            }),
            // 获取专辑列表
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=10").then((res)=>{
                if (res.data.code===200) {
                    this.albumsList=res.data.result.albums
                }else{
                    console.log("请求数据失败")
                }
            }),
            // 获取歌单列表
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=1000").then((res)=>{
                if (res.data.code===200) {
                    this.playLists=res.data.result.playlists
                }else{
                    console.log("请求数据失败")
                }
            }),
            // 获取歌手列表
            this.axios.get("/cloudsearch?keywords="+this.keywords+"&type=100").then((res)=>{
                if (res.data.code===200) {
                    this.singersList=res.data.result.artists
                }else{
                    console.log("请求数据失败")
                }
            })
        },
        handleToSong(songid){
            this.axios.get("/check/music?id="+songid).then((res)=>{ // 判断音乐是否可用
                if (res.data.success===true) {
                    this.$store.commit("SONG",{songid});
                }
            }).catch((err)=>{
                if (err) {
                    alert("亲爱的,音乐暂不能播放")
                }
            })
        },
		handleToClick(index){
			this.activeIndex=index
			this.showIndex=index
		}
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
	.main-header{width: 100%; background: rgb(246,246,246);}
    .main-header .nav{margin-bottom: 10px;}
    .main-header .nav a{display: block; float: left;height: 36px;margin-right: 54px; line-height: 36px;font-size: 14px;}
    .main-header .nav a.active{border-bottom: 1.5px solid rgb(30, 208, 160);color: rgb(30, 208, 160);}
	.main-header .nav a:hover{color: rgb(30, 208, 160);}
</style>