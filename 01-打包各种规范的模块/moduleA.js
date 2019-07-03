define(function(require, exports, module) {
  'use strict'
  let mimus = function(a, b) {
    console.log(`${a} - ${b} = ${a - b}`)
  }

  module.exports = mimus
})
