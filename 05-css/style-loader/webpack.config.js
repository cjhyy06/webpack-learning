let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')

let path = require('path')

module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              //insertInto: () => document.getElementById('app'), //插入到指定的元素
              insertAt: 'bottom', //插入到指定元素的指定位置
              singleton: true, //每个模块默认一个style，指定true，合并到一个style标签
              // transform: './transform.js' //在webpack打包完成后，页面加载前执行
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    new CleanWebpackPlugin(), // 清除webpack打包目录
  ]
}
