export default [
  {
    path: 'Tools',
    component: () => import('@/views/mobile/Tools'),
    children: [
      // 地图组件
      {
        path: '/tools/map',
        name: 'ToolsMap',
        component: () => import('@/views/mobile/Tools/Map')
      },
      // 内嵌高德地图
      {
        path: '/tools/amap',
        name: 'ToolsAMap',
        component: () => import('@/views/mobile/Tools/AMap')
      },
      // 选择国家和地区
      {
        path: '/tools/select_country_code',
        name: 'CountryCode',
        component: () => import('@/views/mobile/Tools/CountryCode')
      },
      // ios微信拦截
      {
        path: '/wechat/applink',
        name: 'AppLink',
        component: () => import('@/views/mobile/Tools/AppLink')
      }
    ]
  }
];
