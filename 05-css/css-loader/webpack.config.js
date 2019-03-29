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
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true, //开启css module
              // localIdentName: '[path]-[name]-[local]-[hash:5]'//自定义class名
            }
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
