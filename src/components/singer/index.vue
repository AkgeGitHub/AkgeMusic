<template>
	<div class="main-content"  @scroll="handleToScroll" ref="singer">
    <div class="singer">
        <div class="singer-sort">
            <div class="sort-lang">
                <div v-for="(item,index) in langlist" :key="item.area" @click="handleToLang(item.area,index)" :class="{active:langchoice==index}">
                  {{item.lang}}
                </div>
            </div>
            <div class="sort-sex">
                <div v-for="(item,index) in sexlist" :key="item.type" @click="handleToSex(item.type,index)" :class="{active:sexchoice==index}">
                  {{item.sex}}
                </div>
            </div>
        </div>
        <div class="singer-cont">
            <div class="singer-card" v-for="(singer,index) in singerlist" :key="singer.id">
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
    data(){
      return{
        type:-1,
        area:-1,
        initial:-1,
        langchoice:0,
        sexchoice:0,
        pagenum:0, // 分页
        langlist:[
          {lang:"全部",area:-1},
          {lang:"华语",area:7},
          {lang:"欧美",area:96},
          {lang:"日本",area:8},
          {lang:"韩国",area:16},
          {lang:"其他",area:0}
          ],
        sexlist:[
          {sex:"全部",type:-1},
          {sex:"男",type:1},
          {sex:"女",type:2},
          {sex:"乐队",type:3}
          ],
        singerlist:[],
      }
    },
    computed:{ 
      sort(){ // 因为要同时监听area和type所以把它变成一个对象来监听
        const {area,type}=this;
        return {area,type};
      }
    },
    methods:{
      getsingerlist(){
        this.axios.get("/artist/list?type="+this.type+"&area="+this.area+"&initial=-1").then((res)=>{
          this.singerlist=res.data.artists;
        });
      },
      handleToLang(area,index){
        this.langchoice=index;
        this.area=area;
      },
      handleToSex(type,index){
        this.sexchoice=index;
        this.type=type;
      },
      handleToScroll(){ // 滚动到底部加载更多数据
        let scrollTop = this.$refs.singer.scrollTop;
        let clientHeight = this.$refs.singer.clientHeight;
        let scrollHeight = this.$refs.singer.scrollHeight;
        if (scrollTop + clientHeight >= scrollHeight) {
            this.pagenum++;
            this.axios.get("/artist/list?type="+this.type+"&area="+this.area+"&initial=-1&offset="+this.pagenum*30).then((res)=>{
              this.singerlist=this.singerlist.concat(res.data.artists);
            });
        }        
      }
    },
    mounted(){
      this.getsingerlist();
    },
    watch:{
      sort(){
        this.getsingerlist();
        this.pagenum=0; // 类型发生变化,page页重新开始计算
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
  .singer .singer-cont .singer-card .card-cover img{height: 186px;height: 186px;border-radius: 50%;border: 1px solid rgb(216,216,216);}
  .singer .singer-cont .singer-card .card-name{height: 20px;;line-height: 20px;}
</style>