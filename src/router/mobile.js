export default [
    { path: '/', redirect: '/aboutus' },
    { path: '/home', component: () => import('@/views/mobile/Home') },
    { path: '/aboutus', component: () => import('@/views/mobile/AboutUs') },
    { path: '*', redirect: '/' }
]