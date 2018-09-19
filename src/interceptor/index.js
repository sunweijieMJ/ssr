const fs = require('fs');
let constant = require('../config/constant');

function initConfig(confPath, customPort) {
  let p;
  const dir = __dirname;
  const paths = [`${dir  }/../config/config.js`];
  if (/^\d+$/.test(confPath)) {
    p = parseInt(confPath, 10);
  } else {
    paths.push(confPath || '');
    p = parseInt(customPort || 0, 10);
  }
  let conf = {};
  // 启动时带入的配置的路径的配置，高于一切
  paths.forEach((element) => {
    if (element && fs.existsSync(element)) {
      let con = require(element);
      conf = Object.assign(conf, con || {});
    }
  });
  if (p) {
    conf.port = p;
  }
  let con = require('../config/server.config.js')(conf);
  return con;
}

function setCookie(ctx, name, value) {
  let config = initConfig();
  ctx.cookies.set(name, value, {
    domain: config.getCookieDomain(),
    httpOnly: false,
    path: '/'
  });
}
/**
 * 获取客户端IP地址
 * @param {context} ctx
 */
function getClientIp(ctx){
  let ips = ctx.ips;
  const ip = ctx.header['x-forwarded-for'] || ctx.ip || '';
  if((!ips || ips.length === 0) && ip) {
    ips = [];
  }
  return {
    ips,
    ip
  };
}
/**
 * 设置 request 请求信息
 * @param {*} ctx
 * @param {*} name
 * @param {*} val
 */
function setRequest(ctx, name, val) {
  ctx[name] = val;
}
/**
 * 获取当前设备系统类型
 * @param {context} ctx
 */
function getOsType(ctx){
  let ua = ctx.request.header['user-agent'];
  if(ua.match(/iPhone/i)) return 'ios';
  if(ua.match(/Android/i)) return 'android';
  if(ua.match(/Windows/i)) return 'win';
  return 'other';
}

function initSetRequest(ctx, init) {
  for(let key in init) {
    setRequest(ctx, key, init[key]);
  }
}

function initSiteType(){
  return async(ctx, next) => {
    let siteType = '';
    // add isfrom as param can force to change siteType
    let isFrom = ctx.request.query.isfrom;
    let swithVersion = ctx.request.query.swversion;
    let hostName = ctx.request.host;
    let fromApp = ctx.request.query.from;
    let preDomain = hostName.split('.')[0];
    let cookieSiteType = ctx.cookies.get('siteType');
    if(fromApp !== undefined && fromApp.toLowerCase() === constant.siteApp) {
      siteType = constant.siteApp;
    }
    if(isFrom !== undefined && [constant.siteApp, constant.siteMobile, constant.siteWeb].indexOf(isFrom) !== -1) {
      siteType = isFrom;
    }
    if(swithVersion !== undefined && ['ga', 'beta'].indexOf(swithVersion) !== -1) {
      setCookie(ctx, 'RELEASE_VERSION', swithVersion);
    }

    let osType = getOsType(ctx);
    if(cookieSiteType && constant.siteTypeMap[preDomain] === cookieSiteType && siteType === '') {
      siteType = cookieSiteType;
      initSetRequest(ctx, {siteType, osType});
      return await next();
    }
    // 根据域名判断设置 siteType 类型
    if(siteType === '' || siteType === undefined) {
      if(preDomain === constant.mDomainPre || osType.indexOf('ios', 'android') !== -1) {
        siteType = constant.siteMobile;
      } else {
        siteType = constant.siteWeb;
      }
    }
    setCookie(ctx, 'siteType', siteType);
    setCookie(ctx, 'osType', osType);
    initSetRequest(ctx, {siteType, osType});
    await next();
  };
}


module.exports = {
  initConfig,
  initSiteType
};
