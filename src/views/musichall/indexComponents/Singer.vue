<template>
	<div class="main-content"  @scroll="handleToScroll" ref="singer">
    <div class="singer">
        <div class="singer-sort">
            <div class="sort-lang">
                <div v-for="(item,index) in langList" :key="item.area" @click="handleToLang(item.area,index)" :class="{active:langChoice==index}">
                  {{item.lang}}
                </div>
            </div>
            <div class="sort-sex">
                <div v-for="(item,index) in sexList" :key="item.type" @click="handleToSex(item.type,index)" :class="{active:sexChoice==index}">
                  {{item.sex}}
                </div>
            </div>
        </div>
        <div class="singer-cont">
            <div class="singer-card" v-for="(singer,index) in singerLists" :key="singer.id">
              <div class="card-cover" v-if="index<18"> <!-- 设置前18名才有图片 -->
                <img :src="singer.img1v1Url" alt="">
              </div>
              <div class="card-name">{{singer.name}}</div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
	export default {
    name:"Singer",
    data(){
      return{
        type:-1,
        area:-1,
        initial:-1,
        langChoice:0,
        sexChoice:0,
        pageNum:0, // 分页
        langList:[
          {lang:"全部",area:-1},
          {lang:"华语",area:7},
          {lang:"欧美",area:96},
          {lang:"日本",area:8},
          {lang:"韩国",area:16},
          {lang:"其他",area:0}
          ],
        sexList:[
          {sex:"全部",type:-1},
          {sex:"男",type:1},
          {sex:"女",type:2},
          {sex:"乐队",type:3}
          ],
        singerLists:[],
        isSingerDataMore:true
      }
    },
    computed:{ 
      sort(){ // 因为要同时监听area和type所以把它变成一个对象来监听
        const {area,type}=this;
        return {area,type};
      }
    },
    methods:{
      getSingerListData(){
        this.axios.get("/artist/list?type="+this.type+"&area="+this.area+"&initial=-1").then((res)=>{
          if (res.data.code===200) {
            this.singerLists=res.data.artists;
          }
        });
      },
      handleToLang(area,index){
        this.langChoice=index;
        this.area=area;
      },
      handleToSex(type,index){
        this.sexChoice=index;
        this.type=type;
      },
      handleToScroll(){ // 滚动到底部加载更多数据
        let scrollTop = Math.ceil(this.$refs.singer.scrollTop); // 因为滚动的时候总会发现高度不够，差那么零点几，所以就给他向上取整，这样也好操作
        let clientHeight = this.$refs.singer.clientHeight;
        let scrollHeight = this.$refs.singer.scrollHeight;
        if (scrollTop + clientHeight >= scrollHeight) {
          this.pageNum++;
          if (this.isSingerDataMore) {
            this.axios.get("/artist/list?type="+this.type+"&area="+this.area+"&initial=-1&offset="+this.pageNum*30).then((res)=>{
              if (res.data.code===200) {
                if (res.data.more==false && res.data.artists.length==0) { // 判断是否数据全部加载完毕
                  this.isSingerDataMore=false;
                }else{
                  this.singerLists=this.singerLists.concat(res.data.artists);
                }
              }else{
                console.log("请求数据失败")
              }
            });
          }else{
            console.log("全部数据已加载完毕")
          }
        }
      }
    },
    mounted(){
      this.getSingerListData();
    },
    watch:{
      sort(){
        this.getSingerListData();
        this.pageNum=0; // 类型发生变化,page页重新开始计算
      },
    }
  };
</script>

<style scoped>
  .singer{display: flex;flex-direction: column;}
  .singer .singer-sort .sort-lang{display: flex;font-size: 13px;margin:5px 0px 15px 0px;}
  .singer .singer-sort .sort-lang div{width: 80px;height: 32px;border: 1px solid rgb(216, 216, 216);border-radius: 20px;line-height: 32px;text-align: center;margin-right: 10px;}
  .singer .singer-sort .sort-lang div.active{background: rgb(30, 208, 160);color: white;}
  .singer .singer-sort .sort-sex{display: flex;font-size: 13px;margin-bottom: 20px;}
  .singer .singer-sort .sort-sex div{width: 80px;height: 32px;border: 1px solid rgb(216, 216, 216);border-radius: 20px;line-height: 32px;text-align: center;margin-right: 10px;}
  .singer .singer-sort .sort-sex div.active{background: rgb(30, 208, 160);color: white;}
  .singer .singer-cont{width: 1238px; display: flex;flex-wrap: wrap;}
  .singer .singer-cont .singer-card{width: 188px;text-align: center;margin-left: 22px;margin-bottom: 22px;}
  .singer .singer-cont .singer-card:nth-of-type(6n+1){margin-left: 0px;}
  .singer .singer-cont .singer-card .card-cover{width: 188px;height: 188px;margin-bottom: 8px;}
  .singer .singer-cont .singer-card .card-cover img{width: 186px;height: 186px;border-radius: 50%;border: 1px solid rgb(216,216,216);}
  .singer .singer-cont .singer-card .card-name{height: 20px;;line-height: 20px;}
</style>