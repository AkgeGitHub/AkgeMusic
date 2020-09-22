<template>
    <div class="sidebar">
        <div class="logo">
            <img src="@/assets/AkgeMusic.png" alt="">
        </div>
        <div class="menu-list">
            <scroller>
                <div>
                    <div class="menu-item" v-for="item in sideData" :key="item.title">
                        <div class="title">
                            <span>{{item.title}}</span>
                        </div>
                        <div>
                            <router-link tag="a" :to="tab.id?(tab.to+tab.id):tab.to" v-for="tab in item.tabs" :key="tab.name">
                                <i v-if="tab.icon" :class="tab.icon"></i>
                                {{tab.name}}
                            </router-link>
                        </div>
                    </div>

                    <div class="menu-item">
                        <div class="title">
                            <span>收藏的歌单</span>
                            <i class="far fa-plus-square add"></i>
                            <i class="fas fa-chevron-down chevron"></i>
                        </div>
                        <div>
                            <a>收藏歌单1</a>
                            <a>收藏歌单2</a>
                            <a>收藏歌单3</a>
                        </div>
                    </div>

                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
export default {
    name:"Sidebar",
    data(){ // 测试数据
        return{
            sideData:[
                {
                    title:"在线音乐",
                    tabs:[
                        {name:"音乐馆",icon:"fas fa-music fa-fw",to:'/musichall'},
                        {name:"视频",icon:"fas fa-video fa-fw",to:'/video'},
                        {name:"电台",icon:"fas fa-broadcast-tower fa-fw",to:'/radio'}
                    ]
                },
                {
                    title:"我的音乐",
                    tabs:[
                        {name:"我喜欢",icon:"far fa-heart fa-fw",to:"/like"},
                        {name:"本地和下载",icon:"fas fa-desktop fa-fw",to:"/local"},
                        {name:"播放历史",icon:"fas fa-history fa-fw",to:"/history"},
                        {name:"试听列表",icon:"fas fa-headphones-alt fa-fw",to:"/shitin"}
                    ]
                },
                {
                    title:"创建的歌单",
                    tabs:[
                        {name:"官方华语歌单",id:2829883282,icon:"",to:"/playlist/detail/"},
                        {name:"官方欧美歌单",id:2829816518,icon:"",to:"/playlist/detail/"},
                        {name:"官方日语歌单",id:2829896389,icon:"",to:"/playlist/detail/"},
                    ]
                },
            ],
            playlist:[
                {name:"官方华语歌单",id:2829883282},
                {name:"官方欧美歌单",id:2829816518},
                {name:"官方日语歌单",id:2829896389}
            ]
        }
    },
    methods:{
    }
}
</script>

<style scoped>
    .sidebar{display: flex;flex-direction: column;height: 100%;background: rgb(240, 240, 240);padding: 0px 24px;}
    .sidebar .logo{padding: 15px 0px;}
    .sidebar .logo img{width: 170px;margin: 0 auto;}
    .sidebar .menu-list{width: 170px;margin: 24px 0px 30px 0px; overflow: auto;}
    .sidebar .menu-list .menu-item{padding-bottom: 30px;}
    .sidebar .menu-list .menu-item .title{color:rgb(136, 136, 136);font-size: 12px;padding-left: 12px;position: relative;}
    .sidebar .menu-list .menu-item .title .add{position: absolute;right: 18px;top: 2px;}
    .sidebar .menu-list .menu-item .title .chevron{position: absolute;right: 0px;top: 2px;}
    .sidebar .menu-list .menu-item .title i:hover{color: rgb(0, 0, 0);}
    .sidebar .menu-list .menu-item div a{display: block; height: 30px;margin-top: 10px;font-size: 14px;line-height: 30px;padding-left: 12px;border-radius: 6px;}
    .sidebar .menu-list .menu-item div a.active{background: rgb(30, 208, 160);color: white;}
    .sidebar .menu-list .menu-item div a.router-link-active{background: rgb(30, 208, 160);color: white;}
    .sidebar .menu-list .menu-item div a:not(.active):hover{background: rgb(216, 216, 216)}
    .sidebar .menu-list .menu-item div a.router-link-active:hover{background: rgb(30, 208, 160);}
    .sidebar .menu-list .menu-item div a i{margin-right: 10px;}
</style>