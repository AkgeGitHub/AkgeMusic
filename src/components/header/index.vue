<template>
    <div class="header">
        <div class="nav-search">
            <div class="page">
                <i class="fas fa-chevron-left"></i>
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="searchbar">
                <input type="text" class="search-input" placeholder="搜索音乐" v-model="searchname" @focus="handleToFocus" @blur="searchresshow=false">
                <i class="fas fa-search search-btn"></i>
            </div>
            <div class="music-radar">
                <i class="fas fa-microphone-alt fa-lg"></i>
            </div>
            <div class="search-results" v-if="searchresshow">
                <div>在线音乐</div>
                <ul>
                    <li v-for="song in songslist" :key="song.id">
                        <span>{{song.name}}</span>
                        <span> - </span>
                        <span v-for="ar in song.ar" :key="ar.id">{{ar.name}} </span>
                    </li>
                </ul>                
            </div>
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
        name:"header",
        data(){
            return{
                searchresshow:false,
                searchname:"",
                songslist:[]
            }
        },
        mounted(){
            
        },
        methods:{
            handleToFocus(){
                if (this.songslist!="") {
                    this.searchresshow=true;
                }
            },
            cancelRequest() {
                if (typeof this.source === "function") {
                    this.source("终止请求");
                }
            },
        },
        watch:{
            searchname(newval){
                var that=this;
                this.cancelRequest();
                if (newval!="") {
                    this.axios.get("/cloudsearch?keywords="+newval+"&limit=10",{
                        cancelToken: new this.axios.CancelToken(function(c) {
                            that.source = c;
                        })
                    }).then((res)=>{
                        if (res.data.result.songCount>0) {
                            this.songslist=res.data.result.songs;
                            this.$nextTick(()=>{
                                this.searchresshow=true;
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
                    this.songslist="";
                    this.searchresshow=false;
                }
            }
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
    .header .nav-search .search-results{position: absolute;top: 40px;left: 70px; width: 248px;height: 331px; padding: 10px 20px;border-radius: 10px; box-shadow: 0px 0px 5px rgb(173, 173, 173); overflow: hidden;background: rgb(255, 255, 255);font-size: 14px;}
    .header .nav-search .search-results>div{height: 30px;line-height: 25px;border-bottom: 1px solid rgb(227,227,227);}
    .header .nav-search .search-results ul{height: 300px;overflow: hidden;font-size: 13px;}
    .header .nav-search .search-results ul li{height: 30px;line-height: 30px;text-align: left; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
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