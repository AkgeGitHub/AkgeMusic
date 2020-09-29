<template>
    <div class="header">
        <div class="nav-search">
            <div class="page">
                <a href=""><i class="fas fa-chevron-left" @click.prevent="handleToBack"></i></a>
                <a href=""><i class="fas fa-chevron-right" @click.prevent="handleToGo"></i></a>
            </div>
            <div class="searchbar">
                <input type="text" class="search-input" placeholder="搜索音乐" v-model="searchSongName" @keyup.enter="handleToSearch(searchSongName)" @click="handleToClick" @focus="isFocus=true" @blur="isFocus=false">
                <a href=""><i class="fas fa-search search-btn" @click.prevent="handleToSearch(searchSongName)"></i></a>
            </div>
            <div class="music-radar">
                <i class="fas fa-microphone-alt fa-lg"></i>
            </div>
            <SearchBox :songsList="songsList" :isShow="isResShow"  @getSearchName="getSearchValue"></SearchBox>
        </div>
        
        <div class="nav-user-center">
            <div class="saying">
                <i class="fas fa-quote-left fa-fw fa-sm"></i>
                <div>凡事以理想为因，实行为果。凡事以理想为因，实行为果。凡事以理想为因，实行为果。</div>
                <i class="fas fa-quote-right fa-fw fa-sm"></i>
            </div>
            <div class="user">
                <div class="photo"></div>
                <div class="name">名字最多六字</div>
                <i class="fas fa-chevron-down fa-fw"></i>
            </div>
            <div class="weather">
                <i class="fas fa-cloud-sun fa-fw"></i>
            </div>
            <div class="vip">
                <i class="fab fa-vuejs fa-2x fa-fw"></i>
            </div>

        </div>
    </div>
</template>

<script>
    export default{
        name:"Header",
        data(){
            return{
                isResShow:false,
                isFocus:false,
                searchSongName:"",
                songsList:[]
            }
        },
        mounted(){
            var that=this;
            document.addEventListener("click",function (e) { // 监听整个文档点击事件，点击非输入框的地方searchBox消失
                if(e.target.className!='search-input'){
                    that.isResShow=false;
                }
            })
        },
        methods:{
            handleToClick(){
                if (this.songsList!="") {
                    this.isResShow=!this.isResShow;
                }
            },
            cancelRequest() {
                if (typeof this.source === "function") {
                    this.source("终止请求");
                }
            },
            handleToSearch(searchSongName){
                if (searchSongName) {
                    this.$router.push('/search/detail/'+searchSongName)
                    this.isResShow=false
                }
            },
            getSearchValue(searchValue){ // 获取searchBox组件点击时传过来的搜索值,同时将搜索值赋值到输入框中
                this.searchSongName=searchValue;
            },
            handleToBack(){
                this.$router.go(-1)
            },
            handleToGo(){
                this.$router.go(1)
            }
        },
        watch:{
            searchSongName(newval){
                var that=this;
                this.cancelRequest();
                if (newval!="") {
                    this.axios.get("/cloudsearch?keywords="+newval+"&limit=10",{ // 搜索
                        cancelToken: new this.axios.CancelToken(function(c) {
                            that.source = c;
                        })
                    }).then((res)=>{
                        if (res.data.result.songCount>0) {
                            this.songsList=res.data.result.songs;
                            this.$nextTick(()=>{
                                if (this.isFocus) { // 判断是否聚焦于当前搜索框，聚焦则显示结果，不聚焦就不显示
                                    this.isResShow=true;
                                }
                            })
                        }
                    }).catch((err) => {
                        if (this.axios.isCancel(err)) {
                            console.log('Rquest canceled', err.message);
                        } else {
                            console.log(err);
                        }
                    })
                }else{
                    this.songsList="";
                    this.isResShow=false;
                }
            },
            
        }
    }

</script>

<style scoped>
    .header{display: flex;justify-content: space-between;margin-bottom: 40px;padding: 22px 40px 0px 40px;position: relative;}
    .header .fas{color: rgb(159,159,159);}
    .header .nav-search{display: flex;position: relative;}
    .header .nav-search .page{width: 70px;}
    .header .nav-search .page i{float: left;margin-right: 25px;line-height: 34px;}
    .header .nav-search .page i:hover{color: rgb(30, 208, 160);}
    .header .nav-search .searchbar{position: relative;margin-right: 25px;}
    .header .nav-search .searchbar .search-input{width: 200px;height: 34px; border-radius: 20px;background: rgb(227,227,227);font-size: 13px;padding-left: 15px;padding-right: 32px;}
    .header .nav-search .searchbar .search-btn{position: absolute;right: 10px;top: 9px;}
    .header .nav-search .searchbar .search-btn:hover{color: rgb(30, 208, 160);}
    .header .nav-search .music-radar{line-height: 34px;}
    .header .nav-search .music-radar i:hover{color: rgb(30, 208, 160);}
    .header .nav-user-center{display: flex;margin-left: 25px;}
    .header .nav-user-center .saying{display: flex;}
    .header .nav-user-center .saying i{margin:0px 10px;color: rgb(159,159,159);line-height: 34px;}
    .header .nav-user-center .saying div{width: 200px;line-height: 34px;text-align: center; color: rgb(131, 131, 131); overflow: hidden;font-size: 13px;text-overflow: ellipsis;white-space: nowrap;}
    .header .nav-user-center .user{display: flex;margin-right: 14px;margin-left: 10px;}
    .header .nav-user-center .user .photo{min-width: 32px; width: 32px;height: 32px; border:1px solid rgb(131, 131, 131);border-radius: 50%;}
    .header .nav-user-center .user .name{line-height: 34px;margin:0px 6px 0px 8px;font-size: 14px;color: rgb(131, 131, 131);white-space: nowrap;}
    .header .nav-user-center .user i{line-height: 34px;}
    .header .nav-user-center .user i:hover{color: rgb(30, 208, 160);}
    .header .nav-user-center .weather{margin-right: 10px;font-size: 14px;}
    .header .nav-user-center .weather i{line-height: 34px;}
    .header .nav-user-center .vip{font-size: 13px;color: rgb(65,184,131);}
    .header .nav-user-center .vip i{line-height: 34px;}
</style>