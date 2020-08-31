<template>
  <div class="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name:"scroller",
    mounted(){
        this.$nextTick(()=>{
            this.scroll=new BScroll(this.$refs.wrapper,{
                tap:true,
                probeType: 1,
            });
        })

    },

}
</script>

<style>
    .wrapper{height: 100%;}
</style>