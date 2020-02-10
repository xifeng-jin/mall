<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      //滚动时时监听
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log( position );
          this.$emit('scroll',position)
        });
      }

      //监听滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          // console.log( 'haah' );
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      scrollTo(x,y,time=500) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      refresh() {
        // console.log( '-ii--' );
        this.scroll && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll.y ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
