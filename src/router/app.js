export default [
  {
    path: '/app\/product\/description/:id?',
    name: 'ProductDescription',
    component: () => import('@/views/app/product/description/')
  },
  {
    path: '*',
    redirect: '/'
  }
];
