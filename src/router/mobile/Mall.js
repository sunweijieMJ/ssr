export default [
  {
    path: 'Mall',
    component: resolve => require(['@/views/mobile/Mall'], resolve),
    children: [
      // 商城列表
      {
        path: '/shop_list',
        name: 'ShopList',
        component: resolve => require(['@/views/mobile/Mall/shopping/ShopList'], resolve)
      },
      // 商城搜索
      {
        path: '/search_content/:id?/:key?',
        name: 'SearchContent',
        component: resolve => require(['@/views/mobile/Mall/shopping/SearchContent'], resolve)
      },
      // 商品详情
      {
        path: '/product_detail/:id',
        name: 'ProductDetail',
        component: resolve => require(['@/views/mobile/Mall/product/ProductDetail'], resolve)
      },
      // 商品体验秀
      {
        path: '/buyershow/:id',
        name: 'BuyerShow',
        component: resolve => require(['@/views/mobile/Mall/product/BuyerShow'], resolve)
      },
      // 服务保障信息
      {
        path: '/service_info',
        name: 'ServiceInfo',
        component: resolve => require(['@/views/mobile/Mall/product/ServiceInfo'], resolve)
      },
      // 专业服务
      {
        path: '/profession_services',
        name: 'ProService',
        component: resolve => require(['@/views/mobile/Mall/product/ProService'], resolve)
      },
      // 新手大礼包
      {
        path: '/new_user_gift',
        name: 'NewUserGift',
        component: resolve => require(['@/views/mobile/Mall/coupon/NewUserGift'], resolve)
      },
      // 卡券规则
      {
        path: '/coupon_rules',
        name: 'CouponRules',
        component: resolve => require(['@/views/mobile/Mall/coupon/CouponRules'], resolve)
      },
      // 查看范例
      {
        path: '/transfer_accounts',
        name: 'TransferAccounts',
        component: resolve => require(['@/views/mobile/Mall/coupon/TransferAccounts'], resolve)
      },
      // 陈列码列表
      {
        path: '/product/store/:exhibition',
        name: 'ExhibitList',
        component: resolve => require(['@/views/mobile/Mall/exhibit/ExhibitList'], resolve)
      },
      // 新品发布
      {
        path: '/product/topic',
        name: 'NewProduct',
        component: resolve => require(['@/views/mobile/Mall/exhibit/NewProduct'], resolve)
      },
      // 陈列码下载页
      {
        path: '/product/download',
        name: 'ExhibitDownload',
        component: resolve => require(['@/views/mobile/Mall/exhibit/ExhibitDownload'], resolve)
      }
    ]
  }
];
