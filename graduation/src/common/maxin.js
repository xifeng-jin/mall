import {debounce} from "@/common/utils";

import BackTop from 'content/backTop/BackTop'

export const itemListenerMinin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    //1.监听item图片加载完成
    this.refresh =  debounce(this.$refs.scroll.refresh,600);
    this.itemImgListener = () => {
      this.refresh()
    };
    this.$bus.$on('itemImgLoad',this.itemImgListener);
    console.log( '这是混入的' );
  },
};

export const BackTopMaxin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    monitorShowBackTop(position) {
      this.isShowBackTop = position > 500
    }
  },
  components: {
    BackTop
  }
};
