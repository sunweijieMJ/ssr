export default [
  {
    path: 'Store',
    component: resolve => require(['@/views/mobile/Store'], resolve),
    children: [
      // 店铺列表
      {
        path: '/store_list',
        name: 'StoreList',
        component: resolve => require(['@/views/mobile/Store/store/StoreList'], resolve)
      },
      // 店铺详情页
      {
        path: '/store_detail',
        name: 'StoreDetail',
        component: resolve => require(['@/views/mobile/Store/StoreDetail'], resolve)
      },
      // 店铺图片列表
      {
        path: '/store_img/:id?',
        name: 'StoreImg',
        component: resolve => require(['@/views/mobile/Store/store/StoreImg'], resolve)
      },
      // 食品秀
      {
        path: '/food_show',
        name: 'FoodShow',
        component: resolve => require(['@/views/mobile/Store/food/FoodShow'], resolve)
      },
      // 食品列表页
      {
        path: '/food_list',
        name: 'FoodList',
        component: resolve => require(['@/views/mobile/Store/food/FoodList'], resolve)
      },
      // 店铺公告
      {
        path: '/store_notice',
        name: 'StoreNotice',
        component: resolve => require(['@/views/mobile/Store/store/StoreNotice'], resolve)
      }
    ]
  }
];
