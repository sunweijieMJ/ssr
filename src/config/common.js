let con
let instance

function Config(conf) {
  con = conf
  if (process.env.VUE_ENV !== 'client') {
    console.log('it is common config:', con)
  }
}

['port', 'nodeENV', 'serverApiHost', 'clientApiHost', 'cookieDomain'].forEach(function(element) {
  let ele = element.substring(0, 1).toUpperCase() + element.substring(1)
  Config.prototype['get' + ele] = function() {
    return con[element]
  }
})

module.exports = Config