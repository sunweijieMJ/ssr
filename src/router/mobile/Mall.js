export default [
  {
    path: 'Mall',
    component: () => import('@/views/mobile/Mall'),
    children: [
      // 商城列表
      {
        path: '/shop_list',
        name: 'ShopList',
        component: () => import('@/views/mobile/Mall/shopping/ShopList')
      },
      // 商城搜索
      {
        path: '/search_content/:id?/:key?',
        name: 'SearchContent',
        component: () => import('@/views/mobile/Mall/shopping/SearchContent')
      },
      // 商品详情
      {
        path: '/product_detail/:id',
        name: 'ProductDetail',
        component: () => import('@/views/mobile/Mall/product/ProductDetail')
      },
      // 商品体验秀
      {
        path: '/buyershow/:id',
        name: 'BuyerShow',
        component: () => import('@/views/mobile/Mall/product/BuyerShow')
      },
      // 服务保障信息
      {
        path: '/service_info',
        name: 'ServiceInfo',
        component: () => import('@/views/mobile/Mall/product/ServiceInfo')
      },
      // 专业服务
      {
        path: '/profession_services',
        name: 'ProService',
        component: () => import('@/views/mobile/Mall/product/ProService')
      },
      // 新手大礼包
      {
        path: '/new_user_gift',
        name: 'NewUserGift',
        component: () => import('@/views/mobile/Mall/coupon/NewUserGift')
      },
      // 卡券规则
      {
        path: '/coupon_rules',
        name: 'CouponRules',
        component: () => import('@/views/mobile/Mall/coupon/CouponRules')
      },
      // 查看范例
      {
        path: '/transfer_accounts',
        name: 'TransferAccounts',
        component: () => import('@/views/mobile/Mall/coupon/TransferAccounts')
      },
      // 陈列码列表
      {
        path: '/product/store/:exhibition',
        name: 'ExhibitList',
        component: () => import('@/views/mobile/Mall/exhibit/ExhibitList')
      },
      // 新品发布
      {
        path: '/product/topic',
        name: 'NewProduct',
        component: () => import('@/views/mobile/Mall/exhibit/NewProduct')
      },
      // 陈列码下载页
      {
        path: '/product/download',
        name: 'ExhibitDownload',
        component: () => import('@/views/mobile/Mall/exhibit/ExhibitDownload')
      }
    ]
  }
];
