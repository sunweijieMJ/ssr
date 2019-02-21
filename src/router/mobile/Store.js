export default [
  {
    path: 'Store',
    component: () => import('@/views/mobile/Store'),
    children: [
      // 店铺列表
      {
        path: '/store_list',
        name: 'StoreList',
        component: () => import('@/views/mobile/Store/store/StoreList')
      },
      // 店铺详情页
      {
        path: '/store_detail',
        name: 'StoreDetail',
        component: () => import('@/views/mobile/Store/StoreDetail')
      },
      // 店铺图片列表
      {
        path: '/store_img/:id?',
        name: 'StoreImg',
        component: () => import('@/views/mobile/Store/store/StoreImg')
      },
      // 食品体验秀
      {
        path: '/food_show',
        name: 'FoodShow',
        component: () => import('@/views/mobile/Store/food/FoodShow')
      },
      // 食品列表页
      {
        path: '/food_list',
        name: 'FoodList',
        component: () => import('@/views/mobile/Store/food/FoodList')
      },
      // 店铺公告
      {
        path: '/store_notice/:content/:brick_id',
        name: 'StoreNotice',
        component: () => import('@/views/mobile/Store/store/StoreNotice')
      }
    ]
  }
];
