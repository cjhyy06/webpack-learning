import './base.css'
import { add } from './base.js'
// import _ from 'lodash'

let div = document.createElement('div')

div.innerText = ` 1 + 2 = ${add(1,2)}`
document.body.appendChild(div)
