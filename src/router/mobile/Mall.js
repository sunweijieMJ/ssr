export default [
  {
    path: 'Mall',
    component: resolve => require(['@/views/mobile/Mall'], resolve),
    children: [
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
      }
    ]
  }
];
