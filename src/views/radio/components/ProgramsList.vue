<template>
    <div class="programs">
        <div class="program-item" v-for="item in list" :key="item.mainSong.id" @click.prevent="handleToSong(item.mainSong.id)">
            <div class="item-3x">
                <span>{{item.serialNum}} </span>
                <a href="">{{item.mainSong.name}}</a>
            </div>
            <div class="item-2x"><a href="">{{item.mainSong.duration | duration}}</a></div>
            <div class="item-2x"><a href="">播放 {{item.listenerCount}}</a></div>
            <div class="item-x"><a href="">赞 {{item.likedCount}}</a></div>
        </div>

    </div>   
</template>

<script>
export default {
    props: ['list'],
    filters: {
        duration: function (dt) {
            var commonTime=new Date(dt);
            var h=(commonTime.getHours()-8)>9?commonTime.getHours()-8:"0"+commonTime.getHours()-8;
            var m=commonTime.getMinutes()>9?commonTime.getMinutes():"0"+commonTime.getMinutes();
            var s=commonTime.getSeconds()>9?commonTime.getSeconds():"0"+commonTime.getSeconds();
            var duration=h+":"+m+":"+s;
            return duration;
        }
    },

    methods:{
        handleToSong(songid){
            this.axios.get("/check/music?id="+songid).then((res)=>{ // 判断音乐是否可用
                if (res.data.success===true) {
                    this.$store.commit("SONG",{songid});
                }
            }).catch((err)=>{
                if (err) {
                    alert("音乐暂不能播放")
                }
            })
        },
    }


}
</script>

<style scoped>
    .programs{margin: 20px 0px; font-size: 14px; border-radius: 10px;overflow: hidden;}
    .programs .program-item:nth-of-type(even){background: rgb(250, 250, 250);}
    .programs .program-item{padding: 5px 10px; height: 38px;display: flex;justify-content: space-between; font-size: 14px;}
    .programs .program-item div{padding-right: 15px;line-height: 38px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .programs .program-item div span{color: rgb(159,159,159);margin-right: 8px;}
    .programs .program-item .item-3x{flex: 37.5%;}
    .programs .program-item .item-2x{flex: 25%;}
    .programs .program-item .item-x{flex: 12.5%;}



</style>