<template>
	<keep-alive>
		<router-view :key="playId" />
	</keep-alive>
</template>

<script>
export default {
	name: "SongList",
	computed:{
        playId(){
            return this.$route.params.playid // 给视图加上当前歌单的id作为key值，以此作为区分
        }
    },
	mounted(){
	}
};
</script>

<style>

</style>