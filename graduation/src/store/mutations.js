import {
  ADD_TO_CART,
  ADD_COUNTER
} from './mutations-type'

export default {
  //一个是store中state的数据,一个是发送过来的数据
  addCounter(state,payLoad) {
    payLoad.count ++;//用于跟踪
  },
  addToCart(state,payLoad) {
    payLoad.checked = true
    state.cartList.push(payLoad)
  }
}
