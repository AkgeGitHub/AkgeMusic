<template>
    <div id="main">
        <div class="title">
                音乐馆
        </div>
        <div class="nav">
            <ul>
                <li class="active">精选</li>
                <li>排行</li>
                <li>歌手</li>
                <li>分类歌单</li>
                <li>数字专辑</li>
            </ul>
        </div>
        <div class="banner">
            轮播图
        </div>
        <div class="selection-list">
            <div class="selection-item">
                <div class="selection-item-header">
                    <div class="selection-item-name">推荐歌单</div>
                    <div class="selection-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="selection-item-cont">
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                </div>
            </div>
            <div class="selection-item">
                <div class="selection-item-header">
                    <div class="selection-item-name">推荐视频</div>
                    <div class="selection-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="selection-item-cont video">
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                </div>
            </div>
             <div class="selection-item">
                <div class="selection-item-header">
                    <div class="selection-item-name">推荐歌单</div>
                    <div class="selection-item-more">
                        <span>更多</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="selection-item-cont">
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                    <div class="item-cont-card">
                        <img src="" alt="">
                        <div>第n个</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
      .title{font-size: 30px;margin-bottom: 22px;}
      .nav{margin-bottom: 12px;}
      .nav ul li{float: left;height: 36px;margin-right: 54px; line-height: 36px;font-size: 14px;}
      .nav ul li.active{border-bottom: 1.5px solid rgb(30, 208, 160);color: rgb(30, 208, 160);}
      .nav ul li:not(.active):hover{color: rgb(30, 208, 160);}
      .banner{height: 185px;background-color: rgb(159,159,159);font-size: 40px;text-align: center;line-height: 200px;}
      .selection-list .selection-item{margin-top: 24px;margin-bottom: 10px;}
      .selection-list .selection-item .selection-item-header{display: flex;justify-content: space-between;margin-bottom: 20px;}
      .selection-list .selection-item .selection-item-header .selection-item-name{font-size: 22px;}
      .selection-list .selection-item .selection-item-header .selection-item-more{font-size: 14px;color: rgb(159,159,159);}
      .selection-list .selection-item .selection-item-header .selection-item-more:hover{color: rgb(30, 208, 160);}
      .selection-list .selection-item .selection-item-header .selection-item-more span{margin-right: 10px;}
      .selection-list .selection-item .selection-item-cont{overflow: hidden;display: flex;}
      .selection-list .selection-item .selection-item-cont .item-cont-card{margin-right: 22px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card:last-child{margin-right: 0px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card img{width: 188px;height: 188px;margin-bottom: 10px;border-radius: 12px;}
      .selection-list .selection-item .selection-item-cont .item-cont-card div{font-size: 15px;height: 22px;line-height: 22px;}
      .selection-list .selection-item .selection-item-cont.video .item-cont-card img{width: 293px;}
</style>