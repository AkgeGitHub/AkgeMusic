<template>
  <div class="scroller" ref="scroller">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name:"scroller",
    mounted(){
        this.$nextTick(()=>{
            this.scroll=new BScroll(this.$refs.scroller,{
                tap:true,
                probeType: 1,
            });
        })

    },

}
</script>

<style>
    .scroller{height: 100%;}
</style>