<template>
	<div id="main">
		<div class="main-header">
			<div class="title">视频</div>
		</div>

		<keep-alive>
			<router-view/>
		</keep-alive>
		
	</div>
</template>

<script>
export default {
	name: "Video",
	mounted(){
	}
};
</script>

<style scoped>
	.main-header{width: 100%; background: rgb(246,246,246);}
	.main-header .title{font-size: 30px;margin-bottom: 20px;}
</style>