<template>
  <div id="wrapper">
    <Sidebar></Sidebar>
	<div id="right-wrap">
		<Header></Header>
		<div id="main">
			<div class="main-header">
				<div class="title">视频</div>
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
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



export default {
	name: "Video",
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
</style>