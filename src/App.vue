<template>
  <div id="wrapper">
    <Sidebar></Sidebar>
    <div id="right-wrap">
      <Header></Header>
      <keep-alive>
        <router-view/>
      </keep-alive>
      <Footer></Footer>
    </div>
  </div>
</template>

<style>

</style>
