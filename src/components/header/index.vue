<template>
    <div id="right-wrap">

    <header>
        <div class="search">
            <div class="page">
                <i class="fas fa-chevron-left"></i>
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="searchContainer">
                <input type="text" class="searchtext" placeholder="搜索音乐" v-model="searchname" @focus="handleToFocus" @blur="searchresshow=false">
                <i class="fas fa-search searchbutton"></i>
            </div>
            <div class="musicradar">
                <i class="fas fa-microphone-alt fa-lg"></i>
            </div>
            <div class="searchres" v-if="searchresshow">
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
        <div class="information">
            <div class="saying">
                <i class="fas fa-quote-left fa-fw fa-sm"></i>
                <div>凡事以理想为因，实行为果。凡事以理想为因，实行为果。凡事以理想为因，实行为果。</div>
                <i class="fas fa-quote-right fa-fw fa-sm"></i>
            </div>
            <div class="mine">
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
    </header>
    
    </div>
</template>

<script>
    export default{
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
    header{display: flex;justify-content: space-between;margin-bottom: 40px;padding: 22px 40px 0px 40px;position: relative;}
    header .fas{color: rgb(159,159,159);}
    header .search{display: flex;position: relative;}
    header .search .page{width: 70px;}
    header .search .page i{float: left;margin-right: 25px;line-height: 34px;}
    header .search .page i:hover{color: rgb(30, 208, 160);}
    header .search .searchContainer{position: relative;margin-right: 25px;}
    header .search .searchContainer .searchtext{width: 200px;height: 34px; border-radius: 20px;background: rgb(227,227,227);font-size: 13px;padding-left: 15px;padding-right: 32px;}
    header .search .searchContainer .searchbutton{position: absolute;right: 10px;top: 9px;}
    header .search .searchContainer .searchbutton:hover{color: rgb(30, 208, 160);}
    header .search .musicradar{line-height: 34px;}
    header .search .musicradar i:hover{color: rgb(30, 208, 160);}
    header .search .searchres{position: absolute;top: 40px;left: 70px; width: 248px;height: 331px; padding: 10px 20px;border-radius: 10px; box-shadow: 0px 0px 5px rgb(173, 173, 173); overflow: hidden;background: rgb(255, 255, 255);font-size: 14px;}
    header .search .searchres>div{height: 30px;line-height: 25px;border-bottom: 1px solid rgb(227,227,227);}
    header .search .searchres ul{height: 300px;overflow: hidden;font-size: 13px;}
    header .search .searchres ul li{height: 30px;line-height: 30px;text-align: left; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
    header .information{display: flex;margin-left: 25px;}
    header .information .saying{display: flex;}
    header .information .saying i{margin:0px 10px;color: rgb(159,159,159);line-height: 34px;}
    header .information .saying div{width: 200px;line-height: 34px;text-align: center; color: rgb(131, 131, 131); overflow: hidden;font-size: 13px;text-overflow: ellipsis;white-space: nowrap;}
    header .information .mine{display: flex;margin-right: 14px;margin-left: 10px;}
    header .information .mine .photo{min-width: 32px; width: 32px;height: 32px; border:1px solid rgb(131, 131, 131);border-radius: 50%;}
    header .information .mine .name{line-height: 34px;margin:0px 6px 0px 8px;font-size: 14px;color: rgb(131, 131, 131);white-space: nowrap;}
    header .information .mine i{line-height: 34px;}
    header .information .mine i:hover{color: rgb(30, 208, 160);}
    header .information .weather{margin-right: 10px;font-size: 14px;}
    header .information .weather i{line-height: 34px;}
    header .information .vip{font-size: 13px;color: rgb(65,184,131);}
    header .information .vip i{line-height: 34px;}
</style>