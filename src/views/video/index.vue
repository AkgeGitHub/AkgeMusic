<template>
  <div id="wrapper">
    <Sidebar></Sidebar>
	<div id="right-wrap">
		<Header></Header>
		video
		<router-view/>
		<Footer></Footer>
	</div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";



export default {
	name: "video",
	components: {
		Sidebar,
		Header,
		Footer,
	},
	mounted(){
	}
};
</script>

<style>

</style>