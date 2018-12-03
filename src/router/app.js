export default [
  // 商品描述富文本
  {
    path: '/app/product/description/:id?',
    name: 'ProductDesc',
    component: () => import('@/views/app/product/description')
  },
  // 活动描述富文本
  {
    path: '/app/activity/description/:id?',
    name: 'ActivityDesc',
    component: () => import('@/views/app/activity/description')
  },
  {
    path: '*',
    redirect: '/'
  }
];
