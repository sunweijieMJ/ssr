export default [
  {
    path: 'Mall',
    component: resolve => require(['@/views/mobile/Mall'], resolve),
    children: [
      {
        path: '/shop_list',
        name: 'ShopList',
        component: resolve => require(['@/views/mobile/Mall/shopping/ShopList'], resolve)
      },
      {
        path: '/product_detail/:id',
        name: 'ProductDetail',
        component: resolve => require(['@/views/mobile/Mall/product/ProductDetail'], resolve)
      },
      {
        path: '/buyershow/:id',
        name: 'BuyerShow',
        component: resolve => require(['@/views/mobile/Mall/product/BuyerShow'], resolve)
      },
      {
        path: '/service_info',
        name: 'ServiceInfo',
        component: resolve => require(['@/views/mobile/Mall/product/ServiceInfo'], resolve)
      },
      {
        path: '/profession_services',
        name: 'ProService',
        component: resolve => require(['@/views/mobile/Mall/product/ProService'], resolve)
      },
      {
        path: '/new_user_gift',
        name: 'NewUserGift',
        component: resolve => require(['@/views/mobile/Mall/coupon/NewUserGift'], resolve)
      },
      {
        path: '/coupon_rules',
        name: 'CouponRules',
        component: resolve => require(['@/views/mobile/Mall/coupon/CouponRules'], resolve)
      }
    ]
  }
];
