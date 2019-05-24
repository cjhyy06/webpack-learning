let path = require('path')
var glob = require('glob-all')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let uglifyJsPlugin = require('uglifyjs-webpack-plugin')
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let PurifyCSSPlugin = require('purifycss-webpack')

module.exports = {
  mode: 'production',
  entry:
  {
    app: './app.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkHash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env']
            }
          }
        ]
      }
    ]
  },
  optimization: {
    //customized js optimization,shaking and so on
    // minimize: false,
    minimizer: [
      new uglifyJsPlugin(
      {
        uglifyOptions: {
          keep_classnames: true,
          keep_fnames: true
        },
      })
    ],
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除webpack打包目录

    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    }),

    //CSS Tree Shaking
    new PurifyCSSPlugin({
      paths: glob.sync([
            path.join(__dirname, './*.html')
        ])
    })
  ]
}
