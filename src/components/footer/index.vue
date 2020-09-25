<template>
    <div class="footer">
        <div class="progress">
            <div class="progress-bar" :style="{width:barWidth+'%'}"></div>
        </div>
        <div class="nav">
            <div class="nav-song">
                <div class="song-cover">
                    <img :src="songDetail.al.picUrl" alt="" v-if="songDetail.al.picUrl">
                    <i class="far fa-kiss-wink-heart fa-2x fa-fw cover-base" v-else></i>
                </div>
                <div class="song-cont">
                    <div class="cont-title">
                        <span :title="songDetail.name">{{songDetail.name}}</span>
                        <span v-if="songDetail.name"> - </span>
                        <span v-else>AkgeMusic音乐世界</span>
                        <span class="title-ar" :title="songDetail.ar | arname">
                            {{songDetail.ar | arname}}
                        </span>
                    </div>
                    <div class="cont-op">
                        <i class="fas fa-heart fa-fw"></i>
                        <i class="fas fa-download fa-fw"></i>
                        <i class="fas fa-comment-dots fa-fw"></i>
                    </div>
                </div>
                <audio ref="audio" :src="songUrl" @timeupdate="handleToTimeupdate" @ended="handleToEnded"></audio>
            </div>
            <div class="nav-play">
                <div class="play-btn random"><i class="fas fa-random fa-2x fa-fw"></i></div>
                <div class="play-btn backward"><i class="fas fa-step-backward fa-2x"></i></div>
                <div class="play-btn">
                    <a href="">
                        <i class="fas fa-4x fa-fw start" :class="{'fa-play-circle':!isPlaying,'fa-pause-circle':isPlaying}" @click.prevent="handleToPaused"></i>
                    </a>
                </div>
                <div class="play-btn forward"><i class="fas fa-step-forward fa-2x fa-fw"></i></div>
                <div class="play-btn volume">
                    <i class="fas fa-2x fa-fw" :class="{'fa-volume-up':!isVolMute,'fa-volume-mute':isVolMute}" @click="handleToVolshow"></i>
                    <div class="volume-detail" v-if="isVolShow">
                        <div class="volume-detail-range">
                            <input class="volume-range-block" type="range" orient="vertical" defaultValue="50" max="100" min="0" step="1" v-model="volValue">
                            <div class="volume-range-value">{{volValue}}%</div>
                        </div>
                        <div class="volume-detail-icon" @click="handleToMute">
                            <i class="fas fa-2x fa-fw" :class="{'fa-volume-up':!isVolMute,'fa-volume-mute':isVolMute}"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav-tool">
                <div class="tool time" >
                    <div class="tool-name">
                        <span>{{songCurrentTime | currentTime}}</span>
                        <span>/</span>
                        <span>{{songDuration | duration}}</span>
                    </div>
                </div>
                <div class="tool speed">
                    <a href="">
                        <div class="tool-name" @click.prevent="handleToSpeedshow">
                            <span>{{speedName}}</span>
                            <i class="fas fa-chevron-up fa-xs fa-fw"></i>
                        </div> 
                    </a>
                    <div class="speed-detail" v-if="isSpeedShow">
                        <div class="speed-detail-range">
                            <div class="speed-range-body">
                                <input class="speed-range-block" type="range" orient="vertical" defaultValue="50" max="100" min="0" step="10" v-model="speedValue">
                            </div>
                            <div class="speed-range-value">
                                <div class="speed-max">1.5</div>
                                <div class="speed-norm">1.0</div>
                                <div class="speed-min">0.5</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tool">
                    <a href="">
                        <div class="tool-name">
                            <span>标准</span>
                            <i class="fas fa-chevron-up fa-xs fa-fw"></i>
                        </div>
                    </a>
                </div>
                <div class="tool">
                    <a href="">
                        <div class="tool-name">
                            <p>词</p>
                        </div>
                    </a>
                </div>
                <div class="tool">
                    <a href="">
                        <div class="tool-name">
                            <i class="fas fa-list-ul fa-fw"></i>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Footer",
    filters: {
        duration: function (dt) {
            var commonTime=new Date(dt);
            var h=(commonTime.getHours()-8)>9?commonTime.getHours()-8:"0"+commonTime.getHours()-8;
            var m=commonTime.getMinutes()>9?commonTime.getMinutes():"0"+commonTime.getMinutes();
            var s=commonTime.getSeconds()>9?commonTime.getSeconds():"0"+commonTime.getSeconds();
            var duration=h>0?(h+":"+m+":"+s):(m+":"+s);
            return duration;
        },
        currentTime: function (ct) {
            var hour=Math.floor(ct/360);
            var minute=Math.floor(ct/60%60);
            var second=Math.floor(ct%60);
            var h=hour>9?hour:"0"+hour;
            var m=minute>9?minute:"0"+minute;
            var s=second>9?second:"0"+second;
            var currentTime=h>0?(h+":"+m+":"+s):(m+":"+s);
            return currentTime;
        }
    },
    data(){
        return{
            isPlaying:false,
            isVolShow:false,
            isVolMute:false,
            volValue:50,
            speedName:"倍速",
            speedValue:50,
            isSpeedShow:false,
            barWidth:0,
            songDetail:{
                al:{picUrl:""},
                ar:"",
                name:""
            },
            songUrl:"",
            songCurrentTime:0,
            songDuration:0

        }
    },
    methods:{
        handleToSong(){ //监听到songid变化，就执行axios请求
            this.axios.get("/song/url?id="+this.songid).then((res)=>{
                this.songUrl=res.data.data[0].url;
            })
            this.axios.get("/song/detail?ids="+this.songid).then((res)=>{
                this.songDetail=res.data.songs[0];
                this.$nextTick(()=>{
                    this.audio.volume=this.volValue/100; // 设置它初始音量
                    this.speedValue=50; // 监听到歌曲变化速率变回1即50
                    this.songDuration=this.songDetail.dt
                    this.audio.play(); //数据请求成功开始播放
                    this.isPlaying=true;
                })
            })
        },
        handleToPaused(){
            if (this.songid) { // 判断是否有歌曲
                if (this.audio.paused) {
                    this.audio.play();
                    this.isPlaying=true;
                }else{
                    this.audio.pause();
                    this.isPlaying=false;
                }
            }
        },
        handleToVolshow(){
            this.isVolShow=!this.isVolShow; // 点击展示和取消音量内容
        },
        handleToMute(){
            this.isVolMute=!this.isVolMute; // 静音和不静音图标的变化
            if (this.isVolMute) { // 点击之后若为静音图标，则volvalue值为0
                this.volValue=0;
            }else{
                this.volValue=50;
            }
        },
        handleToSpeedshow(){
            this.isSpeedShow=!this.isSpeedShow; // 点击展示和取消倍速内容
        },
        handleToTimeupdate(){
            this.songCurrentTime=Math.floor(this.audio.currentTime) 
            var per=this.audio.currentTime / this.audio.duration;
            this.barWidth=per*100
        },
        handleToEnded(){
            this.barWidth=0,
            this.isPlaying=false;
        }
    },
    computed:{
        songid () {
            return this.$store.state.songid // 获取到store里的songid
        },
        audio(){
            return this.$refs.audio
        },
    },
    watch:{
        songid(newvalue){ // 监听songid
            if(newvalue){
                this.handleToSong()
            }
        },
        volValue(newvalue){ // 监听volvalue
            if (newvalue>0) { // 判断图标是否需要变化
                this.isVolMute=false; 
            }else{
                this.isVolMute=true;
            }
            this.audio.volume=newvalue/100; // 跟随volvalue的值变化音乐音量
        },
        speedValue(newvalue){ // 监听speedvalue
            if (newvalue==50) { // 判断文字是否需要变化
                this.speedName="倍速"
            }else{
                this.speedName=0.5+newvalue/100+"x"; // speedvalue设置的是0-100,step为10，所以这里才需要计算，但同时也方便了其他地方按百分比算
            }
            this.audio.playbackRate=0.5+newvalue/100; // 跟随speedvalue的值变化音乐倍速
        },
        
    },
    mounted(){
        
    },


}
</script>

<style scoped>
    .footer .progress{height: 2px;background: rgb(216, 216, 216);}
    .footer .progress .progress-bar{height: 2px; width: 0%;background: rgb(30, 208, 160);}
    .footer .nav{display: flex;justify-content: space-between; height: 40px; padding: 10px 40px;}
    .footer .nav-song{display: flex;width: 412px;}
    .footer .nav-song .song-cover{position: relative; width: 40px;height: 40px;border-radius: 6px;margin-right: 13px;}
    .footer .nav-song .song-cover img{width: 40px;height: 40px;}
    .footer .nav-song .song-cover .cover-base{position: absolute;top: 50%;left: 0; margin-top: -16px;color: rgb(131, 131, 131);}/**设置了固定宽度(fa-fw)和父元素一样宽,所以left为0 */
    .footer .nav-song .song-cont{display: flex;flex-direction: column;height: 40px;justify-content: space-between;}
    .footer .nav-song .song-cont .cont-title{width: 359px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;}
    .footer .nav-song .song-cont .cont-title .title-ar{color: rgb(131, 131, 131);}
    .footer .nav-song .song-cont .cont-op{white-space: nowrap;color: rgb(159,159,159);font-size: 14px;}
    .footer .nav-song .song-cont .cont-op i{margin-right: 10px;}
    .footer .nav-play{display: flex; font-size: 10px;justify-content: space-between;}
    .footer .nav-play .play-btn{text-align: center;margin:0px 12px;}
    .footer .nav-play .play-btn>i{color: rgb(73,80,87);}
    .footer .nav-play .play-btn.volume{position: relative;}
    .footer .nav-play .play-btn.volume .volume-detail{z-index: 999; width: 70px;border-radius: 10px; background: white; box-shadow: 0px 0px 5px rgb(173, 173, 173); position: absolute; right: 50%;bottom: 60px;margin-right: -35px;}
    .footer .nav-play .play-btn.volume .volume-detail .volume-detail-range{margin: 20px 0px;}
    .footer .nav-play .play-btn.volume .volume-detail .volume-detail-range .volume-range-block{width: 5px;margin:0px  32.5px ; -webkit-appearance:slider-vertical}/**滑块垂直，chrome的适配在css中，firefox的适配在html属性中 */
    .footer .nav-play .play-btn.volume .volume-detail .volume-detail-range .volume-range-value{font-size: 13px;margin-top: 10px;}
    .footer .nav-play .play-btn.volume .volume-detail .volume-detail-icon i{padding: 5px 0px; color: rgb(159,159,159);border-top: 1px solid rgb(216, 216, 216)}
    .footer .nav-play i{line-height: 40px;}
    .footer .nav-play i.start{color: rgb(30, 208, 160);}
    .footer .nav-tool{width: 412px; display: flex;justify-content: flex-end;flex-shrink: 0;}
    .footer .nav-tool .tool{margin-left: 14px;}
    .footer .nav-tool .tool .tool-name{line-height: 40px;font-size: 13.5px;text-align: center;}
    .footer .nav-tool .tool:not(.time) .tool-name:hover{color: rgb(30, 208, 160);}
    .footer .nav-tool .tool .tool-name span{display: inline-block;}
    .footer .nav-tool .tool.time span{margin-right: 5px;}
    .footer .nav-tool .tool.speed{position: relative;}
    .footer .nav-tool .tool.speed .speed-detail{z-index: 999; width: 70px;height: 250px; border-radius: 10px; background: white; box-shadow: 0px 0px 5px rgb(173, 173, 173); position: absolute; right: 50%;bottom: 60px;margin-right: -35px;}
    .footer .nav-tool .tool.speed .speed-detail .speed-detail-range{height: 220px; margin: 15px 0px;display: flex;justify-content: space-between;}
    .footer .nav-tool .tool.speed .speed-detail .speed-detail-range .speed-range-body{width: 40px;}
    .footer .nav-tool .tool.speed .speed-detail .speed-detail-range .speed-range-body .speed-range-block{margin:0 17.5px; width: 5px;height: 220px; -webkit-appearance:slider-vertical}
    .footer .nav-tool .tool.speed .speed-detail .speed-detail-range .speed-range-value{width: 30px;height: 220px;font-size: 13px;position: relative;}
    .footer .nav-tool .tool.speed .speed-detail .speed-detail-range .speed-range-value div{position: absolute;}
    .footer .nav-tool .tool.speed .speed-detail .speed-detail-range .speed-range-value .speed-max{left: 0;bottom: 207px;}/**220-13 [220*100%-13px]*/
    .footer .nav-tool .tool.speed .speed-detail .speed-detail-range .speed-range-value .speed-norm{left: 0;bottom: 103.5px;}/**110-6.5 [220*50%-13/2px] 除了首尾，位置都按这个算[X%-6.5px] */
    .footer .nav-tool .tool.speed .speed-detail .speed-detail-range .speed-range-value .speed-min{left: 0;bottom: 0;}/**0 */
</style>