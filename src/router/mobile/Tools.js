export default [
  {
    path: 'Tools',
    component: resolve => require(['@/views/mobile/Tools'], resolve),
    children: [
      // 选择国家和地区
      {
        path: '/tools/select_country_code',
        name: 'CountryCode',
        component: resolve => require(['@/views/mobile/Tools/CountryCode'], resolve)
      },
      // ios微信拦截
      {
        path: '/wechat/applink',
        name: 'AppLink',
        component: () => import('@/views/mobile/official/AppLink')
      }
    ]
  }
];
