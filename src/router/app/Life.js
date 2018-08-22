export default {
  path: 'Life',
  component: resolve => require(['@/views/app/Life'], resolve),
  children: [
    // 动态
    {
      path: 'Moment',
      component: resolve => require(['@/views/app/Life/Moment'], resolve),
      children: [
        {
          path: '/moment_detail/:id',
          name: 'MomentDetail',
          component: resolve => require(['@/views/app/Life/moment/MomentDetail'], resolve),
          meta: {
            pageTitle: '',
            requireAuth: false
          }
        }
      ]
    }
  ]
};
