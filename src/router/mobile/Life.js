export default {
  path: 'Life',
  component: resolve => require(['@/views/mobile/Life'], resolve),
  children: [
    // life tab切换
    {
      path: 'LifeNav',
      component: resolve => require(['@/views/mobile/Life/LifeNav'], resolve),
      children: [
        // 关注列表
        {
          path: '/life/choiceness',
          name: 'Choiceness',
          component: resolve => require(['@/views/mobile/Life/lifenav/Choiceness'], resolve)
        },
        // 动态列表
        {
          path: '/life/moment',
          name: 'Moment',
          component: resolve => require(['@/views/mobile/Life/lifenav/MomentList'], resolve)
        }
      ]
    },
    // 动态详情
    {
      path: '/moment_detail/:id',
      name: 'MomentDetail',
      component: resolve => require(['@/views/mobile/Life/moment/MomentDetail'], resolve)
    },
    // 文章详情
    {
      path: '/article_detail/:id/:preview?',
      name: 'ArticleDetail',
      component: resolve => require(['@/views/mobile/Life/article/ArticleDetail'], resolve)
    },
    // 活动详情
    {
      path: '/activity_detail/:id',
      name: 'ActivityDetail',
      component: resolve => require(['@/views/mobile/Life/activity/ActivityDetail'], resolve)
    },
    // 话题详情
    {
      path: '/topic_detail/:id',
      name: 'TopicDetail',
      component: resolve => require(['@/views/mobile/Life/topic/TopicDetail'], resolve)
    },
    {
      path: 'Personal',
      component: resolve => require(['@/views/mobile/Life/Personal'], resolve),
      children: [
        // 个人主页
        {
          path: '/profile/:id',
          name: 'Profile',
          component: resolve => require(['@/views/mobile/Life/personal/Profile'], resolve)
        },
        {
          path: '/personalintro/:id',
          name: 'ProfileIntro',
          component: resolve => require(['@/views/mobile/Life/personal/ProfileIntro'], resolve)
        },
        // 关注列表
        {
          path: '/attention/:id',
          name: 'Attention',
          component: resolve => require(['@/views/mobile/Life/personal/Attention'], resolve)
        },
        // 粉丝列表
        {
          path: '/fanslist/:id',
          name: 'FansList',
          component: resolve => require(['@/views/mobile/Life/personal/FansList'], resolve)
        },
        // 赞列表
        {
          path: '/thumbup',
          name: 'ThumbList',
          component: resolve => require(['@/views/mobile/Life/personal/ThumbList'], resolve)
        },
        {
          path: '/identifying',
          name: 'Identifying',
          component: resolve => require(['@/views/mobile/Life/personal/Identifying'], resolve)
        }
      ]
    }
  ]
};
