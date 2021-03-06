export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/web/Home')
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('@/views/web/AboutUs')
  },
  {
    path: '/lanehub_product',
    name: 'lanehub_product',
    component: () => import('@/views/web/LaneHubProduct')
  },
  {
    path: '/partners',
    name: 'partners',
    component: () => import('@/views/web/Partners')
  },
  {
    path: '/joinus',
    name: 'joinus',
    component: () => import('@/views/web/JoinUs')
  },
  // 下载页
  {
    path: '/download',
    name: 'Download',
    component: () => import('@/views/mobile/official/Download')
  },
  {
    path: '*',
    redirect: '/'
  }
];
