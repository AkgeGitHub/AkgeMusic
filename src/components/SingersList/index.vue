<template>
  <div class="singer">
    <slot></slot>
    <div class="singer-cont">
        <div class="singer-card" v-for="(item,index) in list" :key="item.id">
        <div class="card-cover" v-if="index<12"> <!-- 设置前12名才有图片 -->
            <img :src="item.img1v1Url" alt="">
        </div>
        <div class="card-name">{{item.name}}</div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
      name:'SingersList',
      props:['list']
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