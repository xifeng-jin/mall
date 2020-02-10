<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <!--说明：使用keep-alive会对组件内容进行保存，但实际上，每个详情页面内容是不一样的，如果进行保存了就会导致获取不到相应的详情数据。解决方案一:如上方法，解决方案二：在activated中重新获取数据。这里用第一种方法可以提高性能-->
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'content/mainTabbar/MainTabBar.vue'
export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
