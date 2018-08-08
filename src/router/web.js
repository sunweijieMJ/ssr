export default [
  {
    path: '/',
    redirect: '/aboutus'
  },
  {
    path: '/aboutus',
    component: () => import('@/views/404')
  }
]