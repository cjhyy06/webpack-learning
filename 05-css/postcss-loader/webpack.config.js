let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')


module.exports = {
  context: path.resolve(__dirname),
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
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')(), //该插件需要设置浏览器环境才会生效：https://browserl.ist/?q=%3E+.1%25%2C+ie%3E%3D8+and+last+2+versions
                require('precss')(), //https://github.com/jonathantneal/precss
                require('cssnano') //压缩优化css https://cssnano.co/optimisations/
                // require('postcss-advanced-variables')()
              ]
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

    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }), // 清除webpack打包目录

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ]
}
