<template>
  <div class="back">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back {
    position: fixed;
    right: 8px;
    bottom: 50px;
  }
  .back img {
    width: 45px;
    height: 45px;

    z-index: 999;
  }
</style>
