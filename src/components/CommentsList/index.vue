<template>
    <div class="cont-comment">
        <div class="cont-comment-block" v-if="hotCommentsList.length>0">
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

        <div class="cont-comment-block">
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
</template>

<script>
export default {
    name:'CommentsList',
    props:['commentsList','hotCommentsList'],
}
</script>

<style scoped>
    .cont-comment-block{margin: 15px 0px 25px 0px;}
    .cont-comment-block .block-title{height: 20px;line-height: 20px;font-size: 14.5px;margin-bottom: 10px;}
    .cont-comment-block .block-commentlist{margin-top: 10px;padding: 15px; background: rgb(240, 240, 240);border-radius: 15px;}
    .cont-comment-block .block-commentlist .comment{display: flex;margin-bottom: 15px;}
    .cont-comment-block .block-commentlist .comment .comment-avatar{margin-top: 4px; margin-right: 10px;}
    .cont-comment-block .block-commentlist .comment .comment-avatar img{width: 35px; height: 35px;border-radius: 50%;border: 1px solid rgb(201, 201, 201);}
    .cont-comment-block .block-commentlist .comment .comment-cont{width: 1188px;font-size: 13px;}
    .cont-comment-block .block-commentlist .comment .comment-cont .cont-body{color: rgb(60,60,60);}
    .cont-comment-block .block-commentlist .comment .comment-cont .cont-body .detail-nickname{color: rgb(24, 185, 115);}
    .cont-comment-block .block-commentlist .comment .comment-cont .cont-footer{height: 33px;line-height: 33px;color: rgb(149,149,149);}
    .cont-comment-block .block-commentlist .comment .comment-cont .cont-footer span{margin-right: 20px;}
    .cont-comment-block .block-commentlist .comment .comment-cont .cont-footer .time{display: inline-block;width: 140px;}
</style>