export default {
  path: 'Life',
  component: resolve => require(['@/views/mobile/Official'], resolve),
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/mobile/official/Home')
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: () => import('@/views/mobile/official/AboutUs')
    },
    {
      path: '/lanehub_product',
      name: 'LaneHubProduct',
      component: () => import('@/views/mobile/official/LaneHubProduct')
    },
    {
      path: '/partners',
      name: 'Partners',
      component: () => import('@/views/mobile/official/Partners')
    },
  ]
};
