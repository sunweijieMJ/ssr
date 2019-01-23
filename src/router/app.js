export default [
  // 商品描述
  {
    path: '/app/product/description/:id?',
    name: 'ProductDesc',
    component: () => import('@/views/app/product/description')
  },
  // 活动描述
  {
    path: '/app/activity/description/:id?',
    name: 'ActivityDesc',
    component: () => import('@/views/app/activity/description')
  },
  // 文章详情
  {
    path: '/app/article/description/:id?',
    name: 'ArticleDesc',
    component: () => import('@/views/app/article/description')
  },
  // 榜单详情
  {
    path: '/app/module/description/:id?',
    name: 'ModuleDesc',
    component: () => import('@/views/app/module/description')
  },
  {
    path: '*',
    redirect: '/'
  }
];
