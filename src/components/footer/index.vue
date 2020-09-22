<template>
    <div class="footer">
        <div class="nav-song">
            <div class="song-cover">
                <img :src="songdetail.al.picUrl" alt="" v-if="songdetail.al.picUrl">
                <i class="far fa-kiss-wink-heart fa-2x fa-fw cover-base" v-else></i>
            </div>
            <div class="song-cont">
                <div class="cont-title">
                    <span :title="songdetail.name">{{songdetail.name}}</span>
                    <span v-if="songdetail.name"> - </span>
                    <span v-else>AkgeMusic音乐世界</span>
                    <span class="title-ar" :title="songdetail.ar | arname">
                        {{songdetail.ar | arname}}
                    </span>
                </div>
                <div class="cont-op">
                    <i class="fas fa-heart fa-fw"></i>
                    <i class="fas fa-download fa-fw"></i>
                    <i class="fas fa-comment-dots fa-fw"></i>
                </div>
            </div>
            <audio ref="audio" :src="songurl"></audio>
        </div>
        <div class="nav-play">
            <div class="play-btn random"><i class="fas fa-random fa-2x fa-fw"></i></div>
            <div class="play-btn backward"><i class="fas fa-step-backward fa-2x"></i></div>
            <div class="play-btn">
                <i class="fas fa-4x fa-fw start" :class="{'fa-play-circle':isplay,'fa-pause-circle':ispause}" @click="handleToPaused"></i>
            </div>
            <div class="play-btn forward"><i class="fas fa-step-forward fa-2x fa-fw"></i></div>
            <div class="play-btn volume">
                <i class="fas fa-2x fa-fw" :class="{'fa-volume-up':!isvolmute,'fa-volume-mute':isvolmute}" @click="handleToVolshow"></i>
                <div class="volume-detail" v-if="isvolshow">
                    <div class="volume-detail-range">
                        <input class="volume-range-block" type="range" orient="vertical" defaultValue="50" max="100" min="0" step="1" v-model="volvalue">
                        <div class="volume-range-value">{{volvalue}}%</div>
                    </div>
                    <div class="volume-detail-icon" @click="handleToMute">
                        <i class="fas fa-2x fa-fw" :class="{'fa-volume-up':!isvolmute,'fa-volume-mute':isvolmute}"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-tool">
            <div class="tool speed">
                <div class="tool-name" @click="handleToSpeedshow">
                    <span>{{speedname}}</span>
                    <i class="fas fa-chevron-up fa-xs fa-fw"></i>
                </div>
                <div class="speed-detail" v-if="isspeedshow">
                    <div class="speed-detail-range">
                        <div class="speed-range-body">
                            <input class="speed-range-block" type="range" orient="vertical" defaultValue="50" max="100" min="0" step="10" v-model="speedvalue">
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
                <div class="tool-name">
                    <span>标准</span>
                    <i class="fas fa-chevron-up fa-xs fa-fw"></i>
                </div>
            </div>
            <div class="tool">
                <div class="tool-name">
                    <p>词</p>
                </div>
            </div>
            <div class="tool">
                <div class="tool-name">
                    <i class="fas fa-list-ul fa-fw"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Footer",
    data(){
        return{
            isplay:true,
            ispause:false,
            isvolshow:false,
            isvolmute:false,
            volvalue:50,
            speedname:"倍速",
            speedvalue:50,
            isspeedshow:false,
            songdetail:{
                al:{picUrl:""},
                ar:"",
                name:""
            },
            songurl:""

        }
    },
    methods:{
        handleToSong(){ //监听到songid变化，就执行axios请求
            this.axios.get("/song/url?id="+this.songid).then((res)=>{
                this.songurl=res.data.data[0].url;
            })
            this.axios.get("/song/detail?ids="+this.songid).then((res)=>{
                this.songdetail=res.data.songs[0];
                this.$nextTick(()=>{
                    this.$refs.audio.volume=this.volvalue/100; // 设置它初始音量
                    this.speedvalue=50; // 监听到歌曲变化速率变回1即50
                    this.$refs.audio.play(); //数据请求成功开始播放
                    this.ispause=true; // 播放和暂停图标的变化
                    this.isplay=false;
                })
            })
            
        },
        handleToPaused(){
            if (this.songid) { // 判断是否有歌曲
                if (this.$refs.audio.paused) {
                    this.$refs.audio.play();
                    this.ispause=true;
                    this.isplay=false;
                }else{
                    this.$refs.audio.pause();
                    this.ispause=false;
                    this.isplay=true;
                }
            }
        },
        handleToVolshow(){
            this.isvolshow=!this.isvolshow; // 点击展示和取消音量内容
        },
        handleToMute(){
            this.isvolmute=!this.isvolmute; // 静音和不静音图标的变化
            if (this.isvolmute) { // 点击之后若为静音图标，则volvalue值为0
                this.volvalue=0;
            }else{
                this.volvalue=50;
            }
        },
        handleToSpeedshow(){
            this.isspeedshow=!this.isspeedshow; // 点击展示和取消倍速内容
        }
    },
    computed:{
        songid () {
            return this.$store.state.songid // 获取到store里的songid
        }
    },
    watch:{
        songid(newvalue){ // 监听songid
            if(newvalue){
                this.handleToSong()
            }
        },
        volvalue(newvalue){ // 监听volvalue
            if (newvalue>0) { // 判断图标是否需要变化
                this.isvolmute=false; 
            }else{
                this.isvolmute=true;
            }
            this.$refs.audio.volume=newvalue/100; // 跟随volvalue的值变化音乐音量
        },
        speedvalue(newvalue){ // 监听speedvalue
            if (newvalue==50) { // 判断文字是否需要变化
                this.speedname="倍速"
            }else{
                this.speedname=0.5+newvalue/100+"x"; // speedvalue设置的是0-100,step为10，所以这里才需要计算，但同时也方便了其他地方按百分比算
            }
            this.$refs.audio.playbackRate=0.5+newvalue/100; // 跟随speedvalue的值变化音乐倍速
        }
    },
    mounted(){
        
    },


}
</script>

<style scoped>
    .footer{display: flex;justify-content: space-between; height: 40px; padding: 10px 40px;border-top: 2px solid rgb(216, 216, 216);}
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
    .footer .nav-tool .tool .tool-name:hover{color: rgb(30, 208, 160);}
    .footer .nav-tool .tool .tool-name span{display: inline-block;width: 30px;}
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