<template>
    <div class="playlist">
        <div class="playlist-cont">
            <div class="cont-item" v-for="item in list" :key="item.id" >
                <div class="item-cover"  @click.prevent="handleToPlaylist(item.id)">
                    <a href=""><img :src="item.coverImgUrl" alt=""></a>
                    <a href=""><div>{{item.name}}</div></a>
                </div>
                <div class="item-ar">by {{item.creator.nickname}}</div>
                <div class="item-songsum">{{item.trackCount}} 首</div>
                <div class="item-playcount">{{item.playCount}} 次播放</div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['list'],
    methods:{
        handleToPlaylist(id){
            if (id) {
                console.log(id)
                this.$router.push("/playlist/detail/"+id)
            }
        }
    }

}
</script>

<style scoped>
    .playlist .playlist-cont{width: 1238px;}
    .playlist .playlist-cont .cont-item{display: flex;margin-bottom: 15px;font-size: 14px;}
    .playlist .playlist-cont .cont-item>div{width: 190px; margin-left: 30px; line-height: 80px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;}
    .playlist .playlist-cont .cont-item .item-cover{width: 578px; height: 80px; margin-left: 0; display: flex;}
    .playlist .playlist-cont .cont-item .item-cover img{width: 80px; height: 80px;border-radius: 10px;}
    .playlist .playlist-cont .cont-item .item-cover div{line-height: 80px;margin-left: 15px;}
    .playlist .playlist-cont .cont-item .item-ar{text-align: left;}
    .playlist .playlist-cont .cont-item .item-songsum{text-align: center;}
    .playlist .playlist-cont .cont-item .item-playcount{text-align: right;color: rgb(192, 192, 192); }
</style>