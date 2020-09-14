<template>
    <div class="main-content">
        <div class="songs">
            <div class="songs-header">
                <div>歌曲</div>
                <div>歌手</div>
                <div>专辑</div>
            </div>
            <div class="songs-cont">
                <div class="cont-item">
                    <div>
                        <i class="far fa-heart fas fa-heart fa-fw"></i>
                         歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名歌名
                    </div>
                    <div>歌手名歌手名歌手名歌手名歌手名歌手名歌手名歌手名歌手名歌手名</div>
                    <div>专辑名专辑名专辑名专辑名专辑名专辑名专辑名专辑名专辑名专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                <div class="cont-item">
                    <div><i class="far fa-heart fa-fw"></i>歌名</div>
                    <div>歌手名</div>
                    <div>专辑名</div>
                </div>
                

            </div>   
        </div>
    </div>
</template>

<script>
export default {
    name:"Songs"

}
</script>

<style scoped>
    .songs .songs-header{display: flex;margin: 12px 0px;font-size: 13px;color: rgb(136, 136, 136);padding-left: 5px;}
    .songs .songs-header div{flex: 1;}
    .songs .songs-cont .cont-item{display: flex;justify-content: space-between; font-size: 14px;margin-bottom: 16px;height: 30px;padding-left: 5px;}
    .songs .songs-cont .cont-item div{width: 412px; padding-right: 15px; flex: 1;line-height: 30px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .songs .songs-cont .cont-item div i{color: rgb(159,159,159);margin-right: 8px;}
    .songs .songs-cont .cont-item:first-of-type div i{color: rgb(255,106,106);}

</style>