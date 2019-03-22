let common = require('./css/common.css')

console.log(common)

module.exports = function addClass() {

  //LOCAL
  let local = document.getElementById('local')
  local.setAttribute('class', common.green)

  //COMPOSE

  let smallBox = document.createElement('div')
  smallBox.innerHTML = `
  <div class="${common.box}">
  I am a box
  </div>
  `
  document.body.appendChild(smallBox)

  let largeBox = document.createElement('div')
  largeBox.innerHTML = `
  <div class="${common.large}">
  I am a box
  </div>
  `
  document.body.appendChild(largeBox)
}
