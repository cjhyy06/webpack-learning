import './base.css'
import { add, Person, sayHello } from './base.js'
// import _ from 'lodash'


console.log(add())

let zhangsan = new Person('张三')
console.log(zhangsan.name)

sayHello()
