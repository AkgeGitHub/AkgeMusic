<template>
    <div class="playLists">
        <div class="playLists-header" v-if="title">
            <div class="playLists-name">{{title}}</div>
            <div class="playLists-more" v-if="isMore">
                <span>更多</span>
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
        <div class="playLists-cont">
            <div class="cont-card" v-for="item in list" :key="item.id" @click.prevent="handleToPlaylist(item.id)">
                <a href="">
                    <div class="card-cover">
                        <div class="cover-mask"><i class="fas fa-play-circle fa-3x cover-btn"></i></div>
                        <img :src="item.picUrl" alt="">
                    </div>
                    <div class="card-title" :title="item.name">{{item.name}}</div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'PlayLists',
    props:['title','list','isMore'],
    methods:{
        handleToPlaylist(id){
            if (id) {
                this.$router.push("/playlist/detail/"+id)
            }
        }
    }

}
</script>

<style scoped>
    .playLists{width: 1238px;overflow: hidden;}
    .playLists .playLists-header{display: flex;justify-content: space-between;margin: 16px 0px;}
    .playLists .playLists-header .playLists-name{font-size: 22px;}
    .playLists .playLists-header .playLists-more{font-size: 14px;color: rgb(159,159,159);}
    .playLists .playLists-header .playLists-more:hover{color: rgb(30, 208, 160);}
    .playLists .playLists-header .playLists-more span{margin-right: 10px;}
    .playLists .playLists-cont{display: flex;overflow: auto;margin-left: 0;}
    .playLists .playLists-cont .cont-card{width: 188px; margin-left: 22px;margin-bottom: 15px;}
    .playLists .playLists-cont .cont-card:first-child{margin-left: 0px;}
    .playLists .playLists-cont .cont-card .card-cover{margin-bottom: 10px;border-radius: 12px;position: relative;}
    .playLists .playLists-cont .cont-card .card-cover:hover .cover-mask{display: block;}
    .playLists .playLists-cont .cont-card .card-cover img{width: 188px;border-radius: 12px;}
    .playLists .playLists-cont .cont-card .card-cover .cover-mask{display: none; border-radius: 12px;width: 100%;height: 100%; position: absolute;top: 0;left: 0; background: rgba(0,0,0,0.6)}
    .playLists .playLists-cont .cont-card .card-cover .cover-mask .cover-btn{color: white;opacity: 0.6; position: absolute;top: 50%;left: 50%;margin-left: -24px;margin-top: -24px;}
    .playLists .playLists-cont .cont-card .card-title{font-size: 15px;height: 22px;line-height: 22px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .playLists .playLists-cont .cont-card .card-artist{color: rgb(159,159,159);font-size: 13px;}
</style>