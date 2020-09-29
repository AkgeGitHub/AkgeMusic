<template>
    <div class="search-results" v-if="isShow">
        <div class="res-title">在线音乐</div>
        <ul class="res-cont">
            <li href="" v-for="item in list" :key="item.id" @click.prevent="handleToSearch(item.name,item.ar)">
                <a href="">
                    <span>{{item.name}}</span>
                    <span> - </span>
                    <span>{{item.ar | arname}} </span>
                </a>
            </li>
        </ul>                
    </div>
</template>

<script>
export default {
    filters:{
        arname:function(ar){
            var arArr=(ar||[]).map(item=>item.name);
            var arStr=arArr.join(" / ");
            return arStr;
        }
    },
    name:"SearchBox",
    props:["isShow","list"],
    methods:{
        handleToSearch(songName,songAr){
            var singerName=this.$options.filters['arname'](songAr);
            var searchValue=songName+" "+singerName;
            this.$emit("getSearchName",searchValue);
            if (searchValue) {
                this.$router.push('/search/detail/'+searchValue)     
            }
        },
    }
}
</script>

<style scoped>
    .search-results{z-index: 999; position: absolute;top: 40px;left: 70px; width: 248px;height: 331px; padding: 10px 20px;border-radius: 10px; box-shadow: 0px 0px 5px rgb(173, 173, 173); overflow: hidden;background: rgb(255, 255, 255);font-size: 14px;}
    .search-results .res-title{height: 30px;line-height: 25px;border-bottom: 1px solid rgb(227,227,227);}
    .search-results .res-cont{height: 300px;overflow: hidden;font-size: 13px;}
    .search-results .res-cont li{height: 30px;line-height: 30px;text-align: left; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
</style>