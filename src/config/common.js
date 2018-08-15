let con;
let instance;

function Config(conf) {
  con = conf;
  if (process.env.VUE_ENV !== 'client') {
    console.log('it is common config:', con);
  }
}

['port', 'nodeENV', 'envVersion', 'serverApiHost', 'clientApiHost', 'cookieDomain'].forEach((element) => {
  let ele = element.substring(0, 1).toUpperCase() + element.substring(1);
  Config.prototype['get' + ele] = () => {
    return con[element];
  };
});

module.exports = Config;
