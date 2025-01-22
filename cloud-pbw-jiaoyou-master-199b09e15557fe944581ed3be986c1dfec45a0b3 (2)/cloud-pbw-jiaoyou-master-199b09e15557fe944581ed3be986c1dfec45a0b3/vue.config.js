
var webpack = require('webpack')
module.exports = {
  transpileDependencies: ['uview-ui', 'z-paging'],
  chainWebpack: config => {
    //忽略console
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    }),
      config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); //忽略/moment/locale 多语言下的所有文件
  },
  configureWebpack: {
    //去除打包依赖
    externals: {
    },
  }
}

