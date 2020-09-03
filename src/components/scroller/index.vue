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
                probeType: 1,
                startX: 0,
                click: true,
                scrollX: true,
                scrollY: true,
                listenScroll:true,
            });
        })

    },

}
</script>

<style>
    .scroller{height: 100%;}
</style>