<template>
  <div class="video">
      <div class="video-body">
        <div class="video-main">
          <video :src="mvUrl" controls autoplay></video>
        </div>
        <div class="video-comment">
          <div class="comment-block" v-if="hotCommentsList.length>0">
            <div class="block-title">精彩评论</div>
            <div class="block-commentlist">
                <div class="comment" v-for="comment in hotCommentsList" :key="comment.commentId">
                <div class="comment-avatar">
                    <img :src="comment.user.avatarUrl" alt="">
                </div>
                <div  class="comment-cont">
                    <div class="cont-body">
                        <span class="detail-nickname">{{comment.user.nickname}} : </span>
                        <span>{{comment.content}}</span>
                    </div>
                    <div class="cont-footer">
                        <span class="time">{{comment.time | time}}</span>
                        <span><i class="far fa-thumbs-up fa-fw"></i>({{comment.likedCount}})</span>
                        <span><i class="fas fa-share-alt fa-fw"></i>分享</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
          <div class="comment-block">
            <div class="block-title">全部评论</div>
              <div class="block-commentlist">
                  <div class="comment" v-for="comment in commentsList" :key="comment.commentId">
                      <div class="comment-avatar">
                          <img :src="comment.user.avatarUrl" alt="">
                      </div>
                      <div  class="comment-cont">
                          <div class="cont-body">
                              <span class="detail-nickname">{{comment.user.nickname}} : </span>
                              <span>{{comment.content}}</span>
                          </div>
                          <div class="cont-footer">
                              <span class="time">{{comment.time | exactTime}}</span>
                              <span><i class="far fa-thumbs-up fa-fw"></i>({{comment.likedCount}})</span>
                              <span><i class="fas fa-share-alt fa-fw"></i>分享</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <div class="video-description">
        <div class="desc-intro">
          <div class="intro-cover">
            <img :src="mvDetail.cover" alt="">
          </div>
          <div class="intro-cont">
            <div class="cont-name">名称：{{mvDetail.name}}</div>
            <div class="cont-ar">作者：{{mvDetail.artists | arname}}</div>
            <div class="cont-time">发布时间：{{mvDetail.publishTime}}</div>
            <div class="cont-playcount">播放次数：{{mvDetail.playCount}} 次</div>
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
        this.axios.get("/mv/url?id="+this.mvId).then((res)=>{
          this.mvUrl=res.data.data.url
        }),
        this.axios.get("/mv/detail?mvid="+this.mvId).then((res)=>{
          this.mvDetail=res.data.data
        }),
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
  .video-body .video-comment .comment-block{margin-bottom: 20px;}
  .video-body .video-comment .comment-block .block-title{height: 20px;line-height: 20px; font-size: 14.5px;}
  .video-body .video-comment .comment-block .block-commentlist{margin-top: 10px;padding: 15px; background: rgb(238, 238, 238);border-radius: 10px;}
  .video-body .video-comment .comment-block .block-commentlist .comment{display: flex;margin-bottom: 15px;}
  .video-body .video-comment .comment-block .block-commentlist .comment .comment-avatar{margin-top: 4px; margin-right: 10px;}
  .video-body .video-comment .comment-block .block-commentlist .comment .comment-avatar img{width: 35px; height: 35px;border-radius: 50%;border: 1px solid rgb(201, 201, 201);}
  .video-body .video-comment .comment-block .block-commentlist .comment .comment-cont{font-size: 13px;}
  .video-body .video-comment .comment-block .block-commentlist .comment .comment-cont .cont-body{color: rgb(60,60,60);}
  .video-body .video-comment .comment-block .block-commentlist .comment .comment-cont .cont-body .detail-nickname{color: rgb(24, 185, 115);}
  .video-body .video-comment .comment-block .block-commentlist .comment .comment-cont .cont-footer{height: 33px;line-height: 33px;color: rgb(149,149,149);}
  .video-body .video-comment .comment-block .block-commentlist .comment .comment-cont .cont-footer span{margin-right: 20px;}
  .video-body .video-comment .comment-block .block-commentlist .comment .comment-cont .cont-footer .time{display: inline-block;width: 140px;}
  .video-description{width: 393px;padding: 0px 20px;}
  .video-description .desc-intro{background: rgb(238, 238, 238);border-radius: 10px;}
  .video-description .desc-intro .intro-cover img{width: 100%;border-radius: 10px;}
  .video-description .desc-intro .intro-cont{padding:10px 15px; font-size: 13.5px;color: rgb(131, 131, 131);}
  .video-description .desc-intro .intro-cont div{line-height: 30px;}
  .video-description .desc-cont{margin-top: 15px; font-size: 13px;color: rgb(131, 131, 131);}
</style>