let webpack = require('webpack')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'none',
  entry: {
    pageA: './pageA.js',
    pageB: './pageB.js'
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

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

    new BundleAnalyzerPlugin(),

    new cleanWebpackPlugin() // 清除webpack打包目录

  ]
}
