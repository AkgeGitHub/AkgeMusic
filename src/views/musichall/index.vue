<template>
  <div id="wrapper">
    <Sidebar></Sidebar>
	<div id="right-wrap">
		<Header></Header>
		<div id="main">
			<div class="main-header">
				<div class="title">音乐馆</div>
				<div class="nav clearfix">
					<router-link tag="div" to="/musichall/jingxuan">精选</router-link>
					<router-link tag="div" to="/musichall/songrank">排行</router-link>
					<router-link tag="div" to="/musichall/singer">歌手</router-link>
					<router-link tag="div" to="/musichall/playlist">分类歌单</router-link>
					<router-link tag="div" to="/musichall/album">数字专辑</router-link>
				</div>
			</div>

			<keep-alive>
				<router-view/>
			</keep-alive>
			
		</div>
		<Footer></Footer>
	</div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";



export default {
	name: "musichall",
	components: {
		Sidebar,
		Header,
		Footer,
	},
	mounted(){
	}
};
</script>

<style scoped>
	.main-header{width: 100%; background: rgb(246,246,246);}
	.main-header .title{font-size: 30px;margin-bottom: 20px;}
    .main-header .nav{margin-bottom: 10px;}
    .main-header .nav div{float: left;height: 36px;margin-right: 54px; line-height: 36px;font-size: 14px;}
    .main-header .nav div.active{border-bottom: 1.5px solid rgb(30, 208, 160);color: rgb(30, 208, 160);}
	.main-header .nav div:hover{color: rgb(30, 208, 160);}
	.main-header .nav div.router-link-active{border-bottom: 1.5px solid rgb(30, 208, 160);color: rgb(30, 208, 160);}
</style>