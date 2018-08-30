export default [
  {
    path: 'Mall',
    component: resolve => require(['@/views/mobile/Mall'], resolve),
    children: [
      {
        path: '/product_detail/:id',
        name: 'ProductDetail',
        component: resolve => require(['@/views/mobile/Mall/product/ProductDetail'], resolve),
        meta: {
          pageTitle: '',
          requireAuth: false
        }
      },
      {
        path: '/buyershow/:id',
        name: 'BuyerShow',
        component: resolve => require(['@/views/mobile/Mall/product/BuyerShow'], resolve),
        meta: {
          pageTitle: '',
          requireAuth: false
        }
      },
      {
        path: '/spec_params/:id',
        name: 'SpecParams',
        component: resolve => require(['@/views/mobile/Mall/product/SpecParams'], resolve),
        meta: {
          pageTitle: '',
          requireAuth: false
        }
      }
    ]
  }
];
