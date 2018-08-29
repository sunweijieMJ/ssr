export default {
  path: 'Life',
  component: resolve => require(['@/views/mobile/Life'], resolve),
  children: [
    // life tab切换
    {
      path: 'LifeNav',
      component: resolve => require(['@/views/mobile/Life/LifeNav'], resolve),
      children: [
        {
          path: '/life/choiceness',
          name: 'Choiceness',
          component: resolve => require(['@/views/mobile/Life/lifenav/Choiceness'], resolve),
          meta: {
            pageTitle: '精选',
            requireAuth: false
          }
        },
        {
          path: '/life/moment',
          name: 'Moment',
          component: resolve => require(['@/views/mobile/Life/lifenav/MomentList'], resolve),
          meta: {
            pageTitle: '动态',
            requireAuth: false
          }
        }
      ]
    },
    // 动态
    {
      path: 'Moment',
      component: resolve => require(['@/views/mobile/Life/Moment'], resolve),
      children: [
        {
          path: '/moment_detail/:id',
          name: 'MomentDetail',
          component: resolve => require(['@/views/mobile/Life/moment/MomentDetail'], resolve),
          meta: {
            pageTitle: '',
            requireAuth: false
          }
        }
      ]
    },
    {
      path: 'Personal',
      component: resolve => require(['@/views/mobile/Life/Personal'], resolve),
      children: [
        {
          path: '/profile/:id',
          name: 'Profile',
          component: resolve => require(['@/views/mobile/Life/personal/Profile'], resolve),
          meta: {
            pageTitle: '',
            requireAuth: false
          }
        }
      ]
    },
    // 话题
    {
      path: '/activity_detail/:id',
      name: 'ActivityDetail',
      component: resolve => require(['@/views/mobile/Life/activity/ActivityDetail'], resolve),
      meta: {
        pageTitle: '',
        requireAuth: false
      }
    },
    {
      path: '/topic_detail',
      name: 'TopicDetail',
      component: resolve => require(['@/views/mobile/Life/topic/TopicDetail'], resolve),
      meta: {
        pageTitle: '话题详情',
        requireAuth: false
      }
    },
    // 关注列表
    {
      path: '/attention_list',
      name: 'AttentionList',
      component: resolve => require(['@/views/mobile/Life/list/AttentionList'], resolve),
      meta: {
        pageTitle: '关注列表',
        requireAuth: false
      }
    }
  ]
};
