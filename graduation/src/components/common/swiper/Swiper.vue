<template>
  <div class="swiper">
    <div class="swiper-container container">
      <div class="swiper-wrapper wrapper">
        <div class="swiper-slide" v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imgLoad">
          </a>
        </div>
      </div>
      <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <div class="swiper-pagination"></div>
    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper'

  export default {
    name: "Swiper",
    props: {
      banners: {
        type: Array,
        default() {
          return [1,2,3]
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
        // console.log( '---' );
        if (! this.isLoad)  {
          this.$emit('swiperImgLoad');
          this.isLoad = true
        }

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
    height: 150px;
  }

  img {
    height: 100%;
    width: 100%;
  }

</style>
