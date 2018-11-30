export default [
  {
    path: 'Official',
    component: resolve => require(['@/views/mobile/Official'], resolve),
    children: [
      // 官网
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
      // h5
      {
        path: '/Description/about_us',
        component: () => import('@/views/mobile/official/AboutUs')
      },
      {
        path: '/Description/lanehub_product',
        component: () => import('@/views/mobile/official/LaneHubProduct')
      },
      {
        path: '/Description/partners',
        component: () => import('@/views/mobile/official/Partners')
      },
      {
        path: '/Description/joinus',
        component: () => import('@/views/mobile/official/JoinUs')
      },
      // 下载页
      {
        path: '/download',
        name: 'Download',
        component: () => import('@/views/mobile/official/Download')
      }
    ]
  }
];
