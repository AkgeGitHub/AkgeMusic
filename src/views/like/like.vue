<template>
	<div id="main">
		<div class="main-header">
			<div class="title">我喜欢</div>
			<div class="nav clearfix">
				<router-link tag="div" to="/like/songs">歌曲</router-link>
				<router-link tag="div" to="/like/playlist">歌单</router-link>
				<router-link tag="div" to="/like/album">专辑</router-link>
				<router-link tag="div" to="/like/video">视频</router-link>
			</div>
		</div>

		<keep-alive>
			<router-view/>
		</keep-alive>
		
	</div>
</template>

<script>
export default {
	name: "Like",
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