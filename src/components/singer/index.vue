<template>
	<div class="main-content">
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
            <!-- <div class="popular">
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字名字名字名字名字名字名字名字名字名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <img src="" alt="">
                    <div>名字</div>
                </div>
            </div>
            <div class="other">
                <div class="singerinfo">
                    <div>名字名字名字名字名字名字名字名字名字名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
                <div class="singerinfo">
                    <div>名字</div>
                </div>
            </div> -->
            <div class="singer-card" v-for="hotsinger in hotsingerlist" :key="hotsinger.id">
              <div class="card-cover">
                <img :src="hotsinger.img1v1Url" alt="">
              </div>
              <div class="card-name">{{hotsinger.name}}</div>
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
        hotsingerlist:[],
      }
    },
    computed:{ 
      sort(){ // 因为要同时监听area和type所以把它变成一个对象来监听
        const {area,type}=this;
        return {area,type};
      }
    },
    methods:{
      handleToLang(area,index){
        this.langchoice=index;
        this.area=area;
      },
      handleToSex(type,index){
        this.sexchoice=index;
        this.type=type;
      },
    },
    mounted(){
      this.axios.get("/artist/list?type=-1&area=-1&initial=-1").then((res)=>{
        this.hotsingerlist=res.data.artists;
      })
    },
    watch:{
      sort(){
        this.axios.get("/artist/list?type="+this.type+"&area="+this.area+"&initial=-1").then((res)=>{
          this.hotsingerlist=res.data.artists;
        })
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
  /* .singer .singer-cont .popular{display: flex;flex-wrap: wrap;text-align: center;}
  .singer .singer-cont .popular .singerinfo{width: 190px;line-height: 40px;margin-right: 12px;flex-flow: 1;margin-bottom: 10px;}
  .singer .singer-cont .popular .singerinfo img{display: block;width: 190px;height: 190px; ;border-radius: 50%;}
  .singer .singer-cont .other{display: flex;flex-wrap: wrap;text-align: center;margin-top: 10px;}
  .singer .singer-cont .other .singerinfo{width: 190px;line-height: 40px;margin-right: 12px;flex-flow: 1;margin-bottom: 10px;}
  .singer .singer-cont .singerinfo div{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;} */
  .singer .singer-cont{width: 1238px; display: flex;flex-wrap: wrap;}
  .singer .singer-cont .singer-card{width: 188px;text-align: center;margin-left: 22px;margin-bottom: 22px;}
  .singer .singer-cont .singer-card:nth-of-type(6n+1){margin-left: 0px;}
  .singer .singer-cont .singer-card .card-cover{width: 188px;height: 188px;margin-bottom: 8px;}
  .singer .singer-cont .singer-card .card-cover img{height: 186px;height: 186px;border-radius: 50%;border: 1px solid rgb(216,216,216);}
  .singer .singer-cont .singer-card .card-name{height: 20px;;line-height: 20px;}
</style>