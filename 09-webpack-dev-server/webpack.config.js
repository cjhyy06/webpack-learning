let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')

let extractCss = new MiniCssExtractPlugin({
  filename: 'css/[name].bundle.css'
})

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: ''
  },
  devServer: {
    port: '9001',
    contentBase: './dist',
    hot: true,
    proxy: {
      "/qxb": {
        target: 'https://b.qixin.com',
        secure: false,
        changeOrigin: true
      }
    },
    // historyApiFallback: true
    historyApiFallback: {
      verbose: true,
      rewrites: [
        {
          from: /\/test$/,
          to: function(context) {
            console.log(context.parsedUrl, context.match)
            return '/'
          }
        }
      ]
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
              // publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              import: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                  require('postcss-sprites')({
                  retina: true,
                  verbose: false,
                  stylesheetPath: './dist/css/',
                  spritePath: './dist/images/'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 9000,
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                })
              ]
            }
          }
         ]
      }
    ]
  },
  plugins: [
    extractCss,
    new HtmlWebpackPlugin({
      template: './src/index.html',
      cache: false,
      minify: {
        collapseWhitespace: false
      }
    }),
    new CleanWebpackPlugin({
      verbose: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
