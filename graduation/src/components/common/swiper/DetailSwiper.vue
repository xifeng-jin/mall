<template>
  <div class="swiper-container container" ref="swiper">
    <div class="swiper-wrapper wrapper">
      <div class="swiper-slide" v-for="item in topImages">
          <img :src="item" alt="">
        <!--{{topImages}}-->
      </div>
    </div>
    <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods:{
      imgLoad() {
      }
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    }
  }
</script>

<style scoped>
  @import "swiper.css";

  .swiper-container{
    height: 180px;
  }

  img {
    height: 100%;
    width: 100%;
  }
</style>
