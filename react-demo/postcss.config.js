module.exports = {
  // plugins: {
  //   autoprefixer: {
  //     overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7'],
  //   },
  //   'postcss-pxtorem': {
  //     rootValue: 16, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
  //     propList: ['*'],
  //   },
  // },
  plugins: [
    require('postcss-cssnext')(), // cssnext 中已经包含了对 Autoprefixer 的使用，因此使用了 cssnext 就不再需要使用 Autoprefixer
    // require('autoprefixer')({overrideBrowserslist: ['iOS >= 9', 'Android >= 4.4']}),
    require('cssnano')(), // 压缩css
    require('postcss-pxtorem')({
      rootValue: 32, //结果为：设计稿元素尺寸/32，比如元素宽750px,最终页面会换算成 23.4375rem
      propList: ['*'], // 哪些需要进行px转rem
      unitPrecision: 5, // 转换为rem后保留的小数点位数
      selectorBlackList: ['ignore_'], // 排除哪些开头的，如ignore_btn 等
      minPixelValue: 2, // 最小转换，低于 2px 不会进行转rem
      exclude: /index_ignore\.module\.scss/, // 不对匹配上的文件进行转换
    }),
    // require('postcss-px-to-viewport')({
    //   // 参考 https://juejin.im/post/6844903903478153224
    //   viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度
    //   unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
    //   // propList: ['*'], // 能转化为vw的属性列表
    //   selectorBlackList: ['.ignore', '.hairlines'],
    //   minPixelValue: 1,
    //   mediaQuery: false, // 允许在媒体查询中转换`px`
    //   exclude: [/index_ignore\.module\.scss/],
    // }),
  ],
}
