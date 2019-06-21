// var webpack = require('webpack')
var PurifyWebpack = require('purifycss-webpack')
// var HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

module.exports = {

  optimization: {
    splitChunks: {

      cacheGroups: { //缓存组 缓存公共代码

        vendor: {
          test: /[\\/]node_modules[\\/](lodash|jquery)[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 1
        },

        commons: { //公共模块 
          name: "commons",
          chunks: "initial", //入口处开始提取代码
          minSize: 0, //代码最小多大，进行抽离
          minChunks: 2, //代码复 2 次以上的抽离
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },


  plugins: [
    // new PurifyWebpack({
    //   paths: glob.sync([
    //             './*.html',
    //             './src/*.js'
    //         ])
    // }),

    // new HtmlInlinkChunkPlugin({
    //   inlineChunks: ['manifest']
    // }),

    new CleanWebpackPlugin()
    ]
}
