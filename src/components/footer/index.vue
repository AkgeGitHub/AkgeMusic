<template>
    <div class="footer">
        <div class="nav-song">
            <div class="song-cover">
                <img :src="songdetail.al.picUrl" alt="" v-if="songdetail.al.picUrl">
                <i class="far fa-kiss-wink-heart fa-2x fa-fw cover-base" v-else></i>
            </div>
            <div class="song-cont">
                <div class="cont-title">
                    <span>{{songdetail.name}}</span>
                    <span v-if="songdetail.name"> - </span>
                    <span v-else>AkgeMusic音乐世界</span>
                    <span class="title-ar">
                        {{songdetail.ar | arname}}
                    </span>
                </div>
                <div class="cont-op">
                    <i class="fas fa-heart fa-fw"></i>
                    <i class="fas fa-download fa-fw"></i>
                    <i class="fas fa-comment-dots fa-fw"></i>
                </div>
            </div>
        </div>
        <div class="nav-play">
            <i class="fas fa-random fa-2x fa-fw"></i>
            <i class="fas fa-step-backward fa-2x"></i>
            <i class="fas fa-4x fa-fw start" :class="{'fa-play-circle':isplay,'fa-pause-circle':ispause}" @click="handleToPaused"></i>
            <i class="fas fa-step-forward fa-2x fa-fw"></i>
            <i class="fas fa-volume-up fa-2x fa-fw"></i>
            <audio ref="audio" :src="this.$store.state.songurl"></audio>
        </div>
        <div class="nav-tool">
            <div class="tool">
                <span>倍速</span>
                <i class="fas fa-chevron-down fa-xs fa-fw"></i>
            </div>
            <div class="tool">
                <span>标准</span>
                <i class="fas fa-chevron-down fa-xs fa-fw"></i>
            </div>
            <div class="tool">
                <span class="active">词</span>
            </div>
            <div class="tool">
                <i class="fas fa-list-ul fa-fw"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"footer",
    data(){
        return{
            isplay:true,
            ispause:false,
            songdetail:{
                al:{picUrl:""},
                ar:"",
                name:""
            }

        }
    },
    methods:{
        handleToSong(){
            this.axios.get("/song/detail?ids="+this.$store.state.songid).then((res)=>{
                this.songdetail=res.data.songs[0];
                this.$nextTick(()=>{
                    this.$refs.audio.play();
                    this.ispause=true;
                    this.isplay=false;
                })
            })
        },
        handleToPaused(){
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
    computed:{
        songid () {
            return this.$store.state.songid
        }
    },
    watch:{
        songid(newvalue){
            if(newvalue){
                this.handleToSong()
            }
        }
    },
    mounted(){
        
    },
    created(){

    }

}
</script>

<style scoped>
    .footer{display: flex;justify-content: space-between; height: 40px; padding: 10px 40px;border-top: 2px solid rgb(216, 216, 216);}
    .footer .nav-song{display: flex;width: 412px;}
    .footer .nav-song .song-cover{position: relative; width: 40px;height: 40px;border-radius: 6px;overflow: hidden;margin-right: 13px;}
    .footer .nav-song .song-cover img{width: 40px;height: 40px;}
    .footer .nav-song .song-cover .cover-base{position: absolute;top: 50%;left: 0; margin-top: -16px;color: rgb(131, 131, 131);}/**设置了固定宽度(fa-fw)和父元素一样宽,所以left为0 */
    .footer .nav-song .song-cont{display: flex;flex-direction: column;height: 40px;justify-content: space-between;}
    .footer .nav-song .song-cont .cont-title{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;}
    .footer .nav-song .song-cont .cont-title .title-ar{color: rgb(131, 131, 131);}
    .footer .nav-song .song-cont .cont-op{white-space: nowrap;color: rgb(159,159,159);font-size: 14px;}
    .footer .nav-song .song-cont .cont-op i{margin-right: 10px;}
    .footer .nav-play{display: flex; font-size: 10px;justify-content: space-between;}
    .footer .nav-play i{line-height: 40px;margin-right: 13px;}
    .footer .nav-play i.start{color: rgb(30, 208, 160);}
    .footer .nav-tool{width: 412px; display: flex;line-height: 40px;font-size: 14px;justify-content: flex-end;flex-shrink: 0;}
    .footer .nav-tool .tool{margin-left: 14px;}
    .footer .nav-tool .tool:not(.active):hover{color: rgb(30, 208, 160);}
</style>