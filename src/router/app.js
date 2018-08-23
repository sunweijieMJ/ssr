import Life from './app/Life';

export default [
  {
    path: '/',
    redirect: '/moment_detail/37078'
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('@/views/mobile/AboutUs')
  },
  {
    path: '/lanehub_product',
    name: 'LaneHubProduct',
    component: () => import('@/views/mobile/LaneHubProduct')
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('@/views/mobile/Partners')
  },
  Life,
  {
    path: '*',
    redirect: '/'
  }
];
