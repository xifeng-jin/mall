<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{cartLength}}）</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import CartList from './childCom/CartList'
  import CartBottomBar from './childCom/CartBottomBar'


  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength','cartList'])
      // ...mapGetters({
      //   length:'cartLength',
      //   list: 'cartList'
      // })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: #ff1433;
    color: white;
  }

</style>
