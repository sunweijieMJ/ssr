export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/web/Home')
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    component: () => import('@/views/web/AboutUs')
  },
  {
    path: '/laneHubProduct',
    name: 'LaneHubProduct',
    component: () => import('@/views/web/LaneHubProduct')
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('@/views/web/Partners')
  },
  {
    path: '*',
    redirect: '/'
  }
];
