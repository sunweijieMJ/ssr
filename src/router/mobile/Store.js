export default [
  {
    path: 'Store',
    component: resolve => require(['@/views/mobile/Store'], resolve),
    children: [
      // 店铺详情页
      {
        path: '/store_detail/:id?',
        name: 'StoreDetail',
        component: resolve => require(['@/views/mobile/Store/StoreDetail'], resolve)
      },
      // 食品详情页
      {
        path: '/food_detail/:id',
        name: 'FoodDetail',
        component: resolve => require(['@/views/mobile/Store/food/FoodDetail'], resolve)
      },
      // 食品列表页
      {
        path: '/food_list',
        name: 'FoodList',
        component: resolve => require(['@/views/mobile/Store/food/FoodList'], resolve)
      }
    ]
  }
];
