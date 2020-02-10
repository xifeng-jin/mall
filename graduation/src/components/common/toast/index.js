import Toast from './Toast' //可能成为了渲染函数

const obj = {};

obj.install = function (Vue) {
  // Vue.extend(Toast);

  // document.body.appendChild(Toast.$el); //组件可能被渲染，创建不了，返回undefined

  //1创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor();

  //3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
  console.log( Vue );
};
export default obj
