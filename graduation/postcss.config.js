module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375,//视窗宽度，对应的是设计稿的宽度
      viewportHeight: 667,//视口高度，对应设计稿的高度
      unitPrecision: 5,//指定px转换成视口单位值的最小数位数
      viewportUnit: 'vw',//指定转换的视口单位，建议用这个
      // selectorBlackList: '',//指定不需要转换的类
      minPixelValue: 1,//小于或等于1px不转换
      mediaQuery: false//允许在媒体中查询转换px
    }
  }
};
