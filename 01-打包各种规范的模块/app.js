//common js
let sum1 = require('./commonjs')
sum1(1, 2)

//es module
import sum3 from './es-module.js'
sum3(1, 2)

//AMD
require(['./amd.js'], function(sum2) {
  sum2(1, 2)
})

//non moduled
let sayHello = require('exports-loader?sayHello!./non-module.js')
sayHello()
