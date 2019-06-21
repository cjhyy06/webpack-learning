const express = require('express')
const opn = require('opn')
const webpack = require('webpack')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
let config = require('../build/webpack.common.conf.js')('development')

let app = express()

// app.use('/', (req, res, next) => {
//   res.send('hello')
// })

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

let port = 9001

app.listen(port, () => {
  console.log(`server listening at port ${port}`)
  opn(`http://localhost:${port}`)
})
