<template>
  <div class="recommend">
    <div v-for="item in recommends" class="item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;

    text-align: center;
    padding: 10px 0 20px;
    width: 100%;

    border-bottom: 8px solid #eeeeee;
  }
  .item {
    flex: 1;
  }
  .item img {
    width: 65px;
    height: 65px;
  }

  .item .title {
    font-size: 12px;
    margin-top: 5px;
  }
</style>
