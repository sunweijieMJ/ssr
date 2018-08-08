export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/mobile/Home')
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('@/views/mobile/AboutUs')
  },
  {
    path: '/laneHub_product',
    name: 'LaneHubProduct',
    component: () => import('@/views/mobile/LaneHubProduct')
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('@/views/mobile/Partners')
  },
  {
    path: '*',
    redirect: '/'
  }
]