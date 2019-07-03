define(function(require, exports, module) {
  'use strict'
  let sum = function(a, b) {
    console.log(`${a} + ${b} = ${a + b}`)
  }

  let minus = require('./moduleA.js')

  exports.sum = sum
  exports.minus = minus
})
