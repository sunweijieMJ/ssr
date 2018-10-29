export default [
  {
    path: 'Store',
    component: resolve => require(['@/views/mobile/Store'], resolve),
    children: [
      // 店铺列表
      {
        path: '/store_list/:id?',
        name: 'StoreList',
        component: resolve => require(['@/views/mobile/Store/store/StoreList'], resolve)
      },
      // 店铺详情页
      {
        path: '/store_detail/:id?',
        name: 'StoreDetail',
        component: resolve => require(['@/views/mobile/Store/StoreDetail'], resolve)
      },
      // 店铺图片列表
      {
        path: '/store_img/:id?',
        name: 'StoreImg',
        component: resolve => require(['@/views/mobile/Store/store/StoreImg'], resolve)
      },
      // 食品详情页
      {
        path: '/food_show/:id',
        name: 'FoodShow',
        component: resolve => require(['@/views/mobile/Store/food/FoodShow'], resolve)
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
