<template>
    <div class="sidebar">
        <div class="logo">
            <img src="@/assets/QQMusic.png" alt="">
        </div>
        <div class="menu-list">
            <scroller>
                <div>

                    <div class="menu-item">
                        <div class="title">
                            <span>在线音乐</span>
                        </div>
                        <ul>
                            <router-link tag="li" to="/musichall">
                                <i class="fas fa-music fa-fw"></i>
                                音乐馆
                            </router-link>
                            <router-link tag="li" to="/video">
                                <i class="fas fa-video fa-fw"></i>
                                视频
                            </router-link>
                            <router-link tag="li" to="/radio">
                                <i class="fas fa-broadcast-tower fa-fw"></i>
                                电台
                            </router-link>
                        </ul>
                    </div>
                    <div class="menu-item">
                        <div class="title">
                            <span>我的音乐</span>
                        </div>
                        <ul>
                            <router-link tag="li" to="/like">
                                <i class="far fa-heart fa-fw"></i>
                                我喜欢
                            </router-link>
                            <router-link tag="li" to="/local">
                                <i class="fas fa-desktop fa-fw"></i>
                                本地和下载
                            </router-link>
                            <router-link tag="li" to="/history">
                                <i class="fas fa-history fa-fw"></i>
                                播放历史
                            </router-link>
                            <router-link tag="li" to="/songlist">
                                <i class="fas fa-headphones-alt fa-fw"></i>
                                试听列表
                            </router-link>
                        </ul>
                    </div>
                    <div class="menu-item">
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
                    <div class="menu-item">
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
    name:"sidebar"
}
</script>

<style scoped>
    .sidebar{display: flex;flex-direction: column;height: 100%;background: rgb(240, 240, 240);padding: 0px 24px;}
    .sidebar .logo{padding: 24px 0px;}
    .sidebar .logo img{height: 25px;padding-left: 12px;}
    .sidebar .menu-list{width: 170px;margin: 24px 0px 30px 0px; overflow: auto;}
    .sidebar .menu-list .menu-item{padding-bottom: 30px;}
    .sidebar .menu-list .menu-item .title{color:rgb(136, 136, 136);font-size: 12px;padding-left: 12px;position: relative;}
    .sidebar .menu-list .menu-item .title .add{position: absolute;right: 18px;top: 2px;}
    .sidebar .menu-list .menu-item .title .chevron{position: absolute;right: 0px;top: 2px;}
    .sidebar .menu-list .menu-item .title i:hover{color: rgb(0, 0, 0);}
    .sidebar .menu-list .menu-item ul li{height: 30px;margin-top: 10px;font-size: 14px;line-height: 30px;padding-left: 12px;border-radius: 6px;}
    .sidebar .menu-list .menu-item ul li.active{background: rgb(30, 208, 160);color: white;}
    .sidebar .menu-list .menu-item ul li.router-link-active{background: rgb(30, 208, 160);color: white;}
    .sidebar .menu-list .menu-item ul li:not(.active):hover{background: rgb(216, 216, 216)}
    .sidebar .menu-list .menu-item ul li.router-link-active:hover{background: rgb(30, 208, 160);}
    .sidebar .menu-list .menu-item ul li i{margin-right: 10px;}
</style>