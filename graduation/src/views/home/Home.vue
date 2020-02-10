<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 ref="tabControl2"
                 class="copyTab"
                 v-show="isTabFixed"
                 @tabClick="tabClick"></tab-control>
   <scroll class="content"
           :probe-type="3"
           :pull-up-load="true"
           @pullingUp="loadMore"
           @scroll="contentScroll"
           ref="scroll">
     <swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control :titles="['流行','新款','精选']"
                  ref="tabControl"
                  @tabClick="tabClick"></tab-control>
     <good-list :goods="goods[currentType].list"></good-list>
   </scroll>
    <back-top @click.native="backTop()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import Swiper from 'common/swiper/Swiper'
  import RecommendView from './childComp/RecommendView'
  import FeatureView from './childComp/FeatureView'
  import Scroll from 'common/scroll/Scroll'

  import NavBar from 'common/navbar/NavBar.vue'
  import TabControl from 'common/tabControl/TabControl'
  import GoodList from 'content/goods/GoodsList'

  import {getHomeMultidata,getHomeGoods} from "network/home";

  import {itemListenerMinin,BackTopMaxin} from '@/common/maxin'


  export default {
    name: "Home",
    data() {
      return {
        banners:[],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    mixins:[itemListenerMinin,BackTopMaxin],
    components: {
      NavBar,
      Swiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();

      //2请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell'
        }

        //更新index
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      contentScroll(position) {
        // if (- position.y > 500 ) {
        //   this.isShow = true
        // }
        // console.log( '--' );
        //判断BackTop组件是否显示
        this.monitorShowBackTop(-position.y);

        //判断tabControl吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log( 'haha' );
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      /**
       * 网络传输
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log( res );
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          console.log( res );

          this.$refs.scroll.finishPullUp();
        })
      }
    },
    destroyed() {
    },
    deactivated() {
      //记录离开时的位置
      this.saveY = this.$refs.scroll.getScrollY();
      console.log( this.saveY );
    },
    activated() {
      //返回页面时进行的操作
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 49px;
  }

  .copyTab {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;

    z-index: 999;
  }
  /*.fixed {*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*left: 0;*/
    /*right: 0;*/

    /*z-index: 999;*/
  /*}*/
</style>
