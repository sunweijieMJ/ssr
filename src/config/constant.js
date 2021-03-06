module.exports = {
  siteApp: 'app', // ETC APP 内嵌类型
  siteWeb: 'web', // ETC PC
  siteMobile: 'mobile', // ETC H5版本
  mDomainPre: 'm', // ETC 移动端使用m.**lanehub.cn
  pcDomainPre: 'www', // ETC PC 使用 www.**lanehub.cn
  siteTypeMap: {'m': 'mobile', 'www': 'web'},
  mMeta: `<meta name="mobile-web-app-capable" content="yes">
          <meta name="apple-itunes-app" content="app-id=1319173852, app-argument=lanehub://homepage/1">
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">
          <meta name="format-detection" content="telephone=no, email=no"/>`, // ETC 移动端meta信息
  pcMeta: ''  // ETC PC 端Meta信息
};
