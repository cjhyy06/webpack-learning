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

//cmd
let cmd = require('./cmd.js')
cmd.sum(1, 2)

//non moduled
let sayHello1 = require('exports-loader?sayHello!./non-module.js')
sayHello1()

require('script-loader!./non-module.js')
sayHello()
