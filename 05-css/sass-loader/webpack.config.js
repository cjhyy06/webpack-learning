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
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', //url useable两个比较偏门的玩法
            options: {}
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
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
