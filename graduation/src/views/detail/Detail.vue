<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    ref="nav"
                    @titleClick="titleClick"></detail-nav-bar>
    <scroll ref="scroll"
            class="detail-scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="GoodsInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        @imageLoad="imageLoad"
        :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="list"></goods-list>

    </scroll>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <!--<toast :message="toastMessage" :show="toastShow"></toast>-->
  </div>
</template>

<script>
  import {getDetail,GoodsInfo,Shop,GoodsParam,getRecommend} from "network/detail";


  import DetailNavBar from './detailComp/DetailNavBar'
  import DetailBaseInfo from './detailComp/DetailBaseInfo'
  import DetailShopInfo from './detailComp/DetailShopInfo'
  import DetailGoodsInfo from './detailComp/DetailGoodsInfo'
  import DetailParamInfo from './detailComp/DetailParamInfo'
  import DetailCommentInfo from './detailComp/DetailCommentInfo'
  import DetailBottomBar from './detailComp/DetailBottomBar'

  import DetailSwiper from 'common/swiper/DetailSwiper'
  import Scroll from 'common/scroll/Scroll'
  import GoodsList from 'content/goods/GoodsList'

  import {itemListenerMinin,BackTopMaxin} from '@/common/maxin'

  // import Toast from 'common/toast/Toast'

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        GoodsInfo: {},
        shop: {},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends: [],
        themTopYs:[0,400,800,1200],
        getThemTopY: null,
        currentIndex:0,
        // toastMessage: '',
        // toastShow: false
      }
    },
    mixins:[itemListenerMinin,BackTopMaxin],
    // mounted() {
    //   this.$bus.$on('getIid',iid => {
    //     this.iid = iid;
    //     console.log( this.iid );
    //   })
    // },
    created() {
      this.iid = this.$route.params.iid;

      //请求detail中详情数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
        // console.log( res );
      });
      console.log( this.iid );
      //根据iid获取数据
      getDetail(this.iid).then(res => {
        //顶部数据
        const data = res.result;
        console.log( data );
        this.topImages = data.itemInfo.topImages;
        // console.log( res.result.itemInfo.topImages );

        //获取商品信息
        this.GoodsInfo = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services);

        //创建店铺信息
        this.shop = new Shop(data.shopInfo);

        //获取detailInfo信息
        this.detailInfo = data.detailInfo;

        //获取参数信息
        this.paramInfo = new  GoodsParam(data.itemParams.info,data.itemParams.rule);

        //获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // this.$forceUpdate()
      })
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // Toast
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      },
      titleClick(index) {
        console.log( index );
        this.$refs.scroll.scrollTo(0,-this.themTopYs[index],600)
      },
      contentScroll(position) {
        const positionY = -position.y;

        const length = this.themTopYs.length;
        for ( var i = 0 ; i < length - 1 ; i ++ ) {
          // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themTopYs[i] && positionY < this.themTopYs[i+1]) || (i === length - 1 && positionY >= this.themTopYs[i]))) {
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex;
          //   console.log( this.currentIndex );
          // }

          //这种方法相当于是扩大数组一项，来减少判断情况
          if (this.currentIndex !== i && (positionY >= this.themTopYs[i] && positionY < this.themTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        // console.log( positionY );
        //判断是否返回顶部

        this.monitorShowBackTop(positionY);
      },
      addToCart() {
        //获取商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.GoodsInfo.title;
        product.desc = this.GoodsInfo.desc;
        product.price = this.GoodsInfo.realPrice;
        product.iid = this.iid;

        // console.log( product );

        //添加购物信息
        // this.$store.commit('addCart',product)
        //添加购物成功不能直接写，应该在vuex程序编译完后
        this.$store.dispatch('addCart',product).then( res => {
          // this.toastShow = true;
          // this.toastMessage = res;
          //
          // setTimeout(() => {
          //   this.toastShow = false;
          //   this.toastMessage = ''
          // },1500);

          this.$toast.show(res,2000);
          console.log( this.$toast );
        })
      }

    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    updated() {
      this.themTopYs = [];
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.param.$el.offsetTop);
      this.themTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themTopYs.push(this.$refs.list.$el.offsetTop);
      this.themTopYs.push(Number.MAX_VALUE);
      // console.log( this.themTopYs );
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }
  .detail-scroll {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 999;
  }
</style>
