<template>
    <div class="footer">
        <div class="nav-song">
            <div class="song-cover">
                <img src="" alt="">
            </div>
            <div class="song-cont">
                <div class="song-name">
                    <span>QQ音乐,让生活充满音乐</span>
                    <span>-</span>
                    <span>QQ音乐,让生活充满音乐</span>
                </div>
                <div class="song-op">
                    <i class="fas fa-heart fa-fw"></i>
                    <i class="fas fa-download fa-fw"></i>
                    <i class="fas fa-comment-dots fa-fw"></i>
                </div>
            </div>
        </div>
        <div class="nav-play">
            <i class="fas fa-random fa-2x fa-fw"></i>
            <i class="fas fa-step-backward fa-2x"></i>
            <i class="fas fa-play-circle fa-4x fa-fw start"></i>
            <i class="fas fa-step-forward fa-2x fa-fw"></i>
            <i class="fas fa-volume-up fa-2x fa-fw"></i>
            <audio :src="this.$store.state.songurl" autoplay></audio>
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
    .footer .nav-song{display: flex;}
    .footer .nav-song .song-cover{width: 38px;height: 38px;border-radius: 6px;border: 1px solid rgb(131, 131, 131);overflow: hidden;margin-right: 13px;}
    .footer .nav-song .song-cover img{width: 40px;height: 40px;}
    .footer .nav-song .song-cont{display: flex;flex-direction: column;height: 40px;justify-content: space-between;}
    .footer .nav-song .song-cont .song-name{width: 210px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;}
    .footer .nav-song .song-cont .song-op{white-space: nowrap;color: rgb(159,159,159);font-size: 14px;}
    .footer .nav-song .song-cont .song-op i{margin-right: 10px;}
    .footer .nav-play{display: flex; font-size: 10px;justify-content: space-between;}
    .footer .nav-play i{line-height: 40px;margin-right: 13px;}
    .footer .nav-play i.start{color: rgb(30, 208, 160);}
    .footer .nav-tool{display: flex;line-height: 40px;font-size: 14px;justify-content: flex-end;flex-shrink: 0;}
    .footer .nav-tool .tool{margin-left: 14px;}
    .footer .nav-tool .tool:not(.active):hover{color: rgb(30, 208, 160);}
</style>