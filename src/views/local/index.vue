<template>
  <div id="wrapper">
    <Sidebar></Sidebar>
	<div id="right-wrap">
		<Header></Header>
		local
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
	name: "local",
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