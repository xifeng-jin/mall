import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

//安装toast插件
Vue.use(toast); //会去执行toast中的install函数

Vue.config.productionTip = false;

//解决移动端300ms延迟
FastClick.attach(document.body);
//图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/ling.png')
});

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
