let moduleName = 'moduleA'

if (moduleName === 'moduleA') {
  import('./moduleA.js')
    .then(() => {
      console.log(`module A loaded`);
    })
} else if (moduleName === 'moduleB') {
  import('./moduleB.js')
    .then(() => {
      console.log(`module B loaded`);
    })
}

export default 'this is page A'
