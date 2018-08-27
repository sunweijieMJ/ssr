export default {
  path: 'Life',
  component: resolve => require(['@/views/mobile/Official'], resolve),
  children: [
    {
      path: '/about/home',
      name: 'Home',
      component: () => import('@/views/mobile/official/Home')
    },
    {
      path: '/about/aboutus',
      name: 'AboutUs',
      component: () => import('@/views/mobile/official/AboutUs')
    },
    {
      path: '/about/lanehub_product',
      name: 'LaneHubProduct',
      component: () => import('@/views/mobile/official/LaneHubProduct')
    },
    {
      path: '/about/partners',
      name: 'Partners',
      component: () => import('@/views/mobile/official/Partners')
    },
    {
      path: '/about/joinus',
      name: 'JoinUs',
      component: () => import('@/views/mobile/official/JoinUs')
    },
  ]
};
