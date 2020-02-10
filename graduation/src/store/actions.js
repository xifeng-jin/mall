import {
  ADD_TO_CART,
  ADD_COUNTER
} from './mutations-type'
export default {
  addCart(context, payLoad) {
    return new Promise((resolve,reject) => {
      // let oldProduct = null;
      // for ( let item of state.cartList) {
      //   if (item.iid === payLoad.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find( item => item.iid === payLoad.iid );
      if (oldProduct) {
        context.commit('addCounter',oldProduct);

        resolve('当前商品数量加一')
      } else {
        payLoad.count = 1;
        // context.state.cartList.push( payLoad )
        context.commit('addToCart',payLoad);
        resolve('添加了新的商品')
      }
    })
  }
}
