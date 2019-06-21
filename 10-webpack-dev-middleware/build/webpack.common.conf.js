let webpackMerge = require('webpack-merge')
let path = require('path')
let productionConfig = require('./webpack.prod.conf')
let developmentConfig = require('./webpack.dev.conf')
let miniCssExtractPlugin = require('mini-css-extract-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')

const generateConfig = env => {

  const extractCss = new miniCssExtractPlugin({
    filename: 'css/[name]-bundle-[hash:5].css'
  })

  //script loader for js
  const scriptLoader = [{
    loader: 'babel-loader'
  }]

  //css loader  
  const cssLoader = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: env === 'development'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: env === 'development',
        plugins: [
          require('autoprefixer')
        ]
      }
    }
  ]

  //style loader
  const styleLoader = env === 'production' ? [{
    loader: miniCssExtractPlugin.loader,
    options: {
      singleton: true
    }
  }].concat(cssLoader) : [
    {
      loader: 'style-loader'
    }
    ].concat(cssLoader)

  const fileLoader = outPath => {
    return env === 'development' ? [{
      loader: 'file-loader',
      options: {
        name: '[name]-[hash:5].[ext]',
        outputPath: outPath
      }
      }] : [{
      loader: 'url-loader',
      options: {
        name: '[name]-[hash:5].[ext]',
        limit: 1000,
        outputPath: outPath,
        publicPath: '../images/'
      }
      }]
  }


  return {
    mode: env,

    context: path.resolve(__dirname, '../src/'),

    entry: () => {
      if (env === 'production') {
        return { app: ['./app.js'] }
      } else {
        return { app: ['webpack-hot-middleware/client', './app.js'] }
      }
    },

    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].bundle.[hash:8].js'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: scriptLoader
        },
        {
          test: /\.css$/,
          use: styleLoader
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: fileLoader('images/').concat(
            env === 'production' ?
            {
              loader: 'img-loader',
              options: {
                pngquant: {
                  quality: 80
                }
              }
            } : []
          )
        }
      ]
    },
    plugins: [
      extractCss,

      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: {
          collapseWhitespace: env === 'production' ? true : false
        }
      }),

      new CleanWebpackPlugin({
        verbose: false
      })
    ]
  }

}

module.exports = env => {
  let config = env === 'production' ?
    productionConfig : developmentConfig

  return webpackMerge(generateConfig(env), config)
}
