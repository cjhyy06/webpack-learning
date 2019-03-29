import './base.css'
import common from './common.css'

let el = document.createElement('div')
el.innerHTML = `
    <div class="${common.box}">
      I am a box
    </div>
`

document.body.appendChild(el)

el = document.createElement('div')
el.innerHTML = `
    <div class="${common.bigBox}">
      I am a big box
    </div>
`

document.body.appendChild(el)
