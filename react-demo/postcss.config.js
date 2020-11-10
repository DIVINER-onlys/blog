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
  ],
}
