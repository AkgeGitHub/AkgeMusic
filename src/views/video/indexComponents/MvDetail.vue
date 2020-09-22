<template>
  <div class="video">
      <div class="video-body">
        <div class="video-main">
          <video :src="mvUrl" controls autoplay></video>
        </div>
        <CommentsList :commentsList='commentsList' :hotCommentsList='hotCommentsList'></CommentsList>
      </div>
      <div class="video-description">
        <div class="desc-intro">
          <div class="intro-cover">
            <img :src="mvDetail.cover" alt="">
          </div>
          <div class="intro-cont">
            <div>名称：{{mvDetail.name}}</div>
            <div>作者：{{mvDetail.artists | arname}}</div>
            <div>发布时间：{{mvDetail.publishTime}}</div>
            <div>播放次数：{{mvDetail.playCount}} 次</div>
          </div>
        </div>
        <div class="desc-cont">
          {{mvDetail.desc}}
        </div>

      </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        mvUrl:"",
        mvDetail:{},
        hotCommentsList:[],
        commentsList:[],
      }
    },
    computed:{
          mvId(){
              return this.$route.params.mvid
          }
    },
    methods:{
      getVideoDetail(){
        // 获取mv播放地址
        this.axios.get("/mv/url?id="+this.mvId).then((res)=>{
          this.mvUrl=res.data.data.url
        }),
        // 获取mv介绍
        this.axios.get("/mv/detail?mvid="+this.mvId).then((res)=>{
          this.mvDetail=res.data.data
        }),
        // 获取mv评论
        this.axios.get("/comment/mv?id="+this.mvId).then((res)=>{
          this.commentsList=res.data.comments
          this.hotCommentsList=res.data.hotComments.slice(0,5)
        })
      }
    },
    mounted(){
      this.getVideoDetail()
    },
    watch:{
        $route(newvalue){
            if (newvalue) {
                this.getVideoDetail()
            }
        }
    },

}
</script>

<style scoped>
  .video{display: flex;}
  .video-body{width: 810px; margin-right: 35px;}
  .video-body .video-main{width: 810px;height: 460px;background: black;}
  .video-body .video-main video{width: 100%; height: 100%;}
  .video-body .video-comment{margin-top: 40px;}
  .video-description{width: 393px;padding: 0px 20px;}
  .video-description .desc-intro{background: rgb(240, 240, 240);border-radius: 10px;}
  .video-description .desc-intro .intro-cover img{width: 100%;border-radius: 10px;}
  .video-description .desc-intro .intro-cont{padding:10px 15px; font-size: 13.5px;color: rgb(131, 131, 131);}
  .video-description .desc-intro .intro-cont div{line-height: 30px;}
  .video-description .desc-cont{margin-top: 15px; font-size: 13px;color: rgb(131, 131, 131);}
</style>