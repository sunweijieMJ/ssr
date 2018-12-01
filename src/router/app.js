export default [
  {
    path: '/app/product/description/:id?',
    name: 'ProductDesc',
    component: () => import('@/views/app/product/description')
  },
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
