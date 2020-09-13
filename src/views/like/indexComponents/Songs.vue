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
                    <div><i class="far fa-heart fas fa-heart fa-fw"></i>歌名</div>
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

}
</script>

<style scoped>
    .songs .songs-header{display: flex;margin: 12px 0px;font-size: 13px;color: rgb(136, 136, 136);padding-left: 5px;}
    .songs .songs-header div{flex: 1;}
    .songs .songs-cont .cont-item{display: flex;justify-content: space-between; font-size: 14px;margin-bottom: 16px;height: 36px;padding-left: 5px;}
    .songs .songs-cont .cont-item div{flex: 1;line-height: 36px;}
    .songs .songs-cont .cont-item div i{color: rgb(159,159,159);margin-right: 8px;}
    .songs .songs-cont .cont-item:first-of-type div i{color: rgb(255,106,106);}

</style>