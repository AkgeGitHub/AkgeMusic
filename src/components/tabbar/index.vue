<template>
    <div class="tabbar">
        <div class="logo">
            <img src="@/assets/QQMusic.png" alt="">
        </div>
        <div class="menugroup">
            <scroller>
                <div>

                    <div class="menu">
                        <div class="title">
                            <span>在线音乐</span>
                        </div>
                        <ul>
                            <li class="active"><i class="fas fa-music fa-fw"></i>音乐馆</li>
                            <li><i class="fas fa-video fa-fw"></i>视频</li>
                            <li><i class="fas fa-broadcast-tower fa-fw"></i>电台</li>
                        </ul>
                    </div>
                    <div class="menu">
                        <div class="title">
                            <span>我的音乐</span>
                        </div>
                        <ul>
                            <li><i class="far fa-heart fa-fw"></i>我喜欢</li>
                            <li><i class="fas fa-desktop fa-fw"></i>本地和下载</li>
                            <li><i class="fas fa-history fa-fw"></i>播放历史</li>
                            <li><i class="fas fa-headphones-alt fa-fw"></i>试听列表</li>
                        </ul>
                    </div>
                    <div class="menu">
                        <div class="title">
                            <span>创建的歌单</span>
                            <i class="far fa-plus-square add"></i>
                            <i class="fas fa-chevron-up chevron"></i>
                        </div>
                        <ul>
                            <li>新建歌单1</li>
                            <li>新建歌单2</li>
                            <li>新建歌单3</li>
                        </ul>
                    </div>
                    <div class="menu">
                        <div class="title">
                            <span>收藏的歌单</span>
                            <i class="far fa-plus-square add"></i>
                            <i class="fas fa-chevron-down chevron"></i>
                        </div>
                        <ul>
                            <li>收藏歌单1</li>
                            <li>收藏歌单2</li>
                            <li>收藏歌单3</li>
                        </ul>
                    </div>

                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
export default {
    name:"tabbar"
}
</script>

<style scoped>
    .tabbar{display: flex;flex-direction: column;}
    .tabbar .logo{padding: 24px;background: rgb(240, 240, 240);}
    .tabbar .logo img{height: 25px;padding-left: 12px;}
    .tabbar .menugroup{width: 170px;height: 100%; padding: 24px;background: rgb(240, 240, 240);overflow: auto;display: flex;flex-direction: column;}
    .tabbar .menugroup .menu{padding-bottom: 46px;}
    .tabbar .menugroup .menu .title{color:rgb(136, 136, 136);font-size: 12px;padding-left: 12px;position: relative;}
    .tabbar .menugroup .menu .title .add{position: absolute;right: 18px;top: 2px;}
    .tabbar .menugroup .menu .title .chevron{position: absolute;right: 0px;top: 2px;}
    .tabbar .menugroup .menu .title i:hover{color: rgb(0, 0, 0);}
    .tabbar .menugroup .menu ul li{height: 30px;margin-top: 10px;font-size: 14px;line-height: 30px;padding-left: 12px;border-radius: 6px;}
    .tabbar .menugroup .menu ul li.active{background: rgb(30, 208, 160);color: white;}
    .tabbar .menugroup .menu ul li:not(.active):hover{background: rgb(216, 216, 216)}
    .tabbar .menugroup .menu ul li i{margin-right: 10px;}
</style>