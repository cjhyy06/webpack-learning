let moduleName = ''

let fun = (moduleName) => {
  if (moduleName === 'moduleA') {
    import( /* webpackChunkName:'moduleA' */ './moduleA.js')
      .then(() => {
        console.log(`module A loaded`);
      })
  } else if (moduleName === 'moduleB') {
    import( /* webpackChunkName:'moduleB' */ './moduleB.js')
      .then(() => {
        console.log(`module B loaded`);
      })
  }
}

fun('moduleA')

setTimeout(() => {
  fun('moduleB')
}, 2000)



export default 'this is page A'
