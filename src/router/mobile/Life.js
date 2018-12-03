export default {
  path: 'Life',
  component: () => import('@/views/mobile/Life'),
  children: [
    // life tab切换
    {
      path: 'LifeNav',
      component: () => import('@/views/mobile/Life/LifeNav'),
      children: [
        // 推荐列表
        {
          path: '/life/choiceness',
          name: 'Choiceness',
          component: () => import('@/views/mobile/Life/lifenav/Choiceness')
        },
        // 热门列表
        {
          path: '/life/discovery',
          name: 'Discovery',
          component: () => import('@/views/mobile/Life/lifenav/DiscoveryList')
        },
        // 动态列表
        {
          path: '/life/moment',
          name: 'Moment',
          component: () => import('@/views/mobile/Life/lifenav/MomentList')
        }
      ]
    },
    // 全部活动
    {
      path: '/activity_list',
      name: 'ActivityList',
      component: () => import('@/views/mobile/Life/lifenav/discovery/ActivityList')
    },
    // 全部文章
    {
      path: '/article_list',
      name: 'ArticleList',
      component: () => import('@/views/mobile/Life/lifenav/discovery/ArticleList')
    },
    // 动态详情
    {
      path: '/moment_detail/:id',
      name: 'MomentDetail',
      component: () => import('@/views/mobile/Life/moment/MomentDetail')
    },
    // 文章详情
    {
      path: '/article_detail/:id/:preview?',
      name: 'ArticleDetail',
      component: () => import('@/views/mobile/Life/article/ArticleDetail')
    },
    // 话题详情
    {
      path: '/topic_detail/:id',
      name: 'TopicDetail',
      component: () => import('@/views/mobile/Life/topic/TopicDetail')
    },
    // 活动详情
    {
      path: '/activity_detail/:id',
      name: 'ActivityDetail',
      component: () => import('@/views/mobile/Life/activity/ActivityDetail')
    },
    // 活动体验秀
    {
      path: '/activityshow/:id',
      name: 'ActivityShow',
      component: () => import('@/views/mobile/Life/activity/ActivityShow')
    },
    // 活动报名分享页
    {
      path: '/activity_share',
      name: 'ActivityShare',
      component: () => import('@/views/mobile/Life/activity/ActivityShare')
    },
    {
      path: 'Personal',
      component: () => import('@/views/mobile/Life/Personal'),
      children: [
        // 个人主页
        {
          path: '/profile/:id',
          name: 'Profile',
          component: () => import('@/views/mobile/Life/personal/Profile')
        },
        // 个人简介
        {
          path: '/personalintro/:id',
          name: 'ProfileIntro',
          component: () => import('@/views/mobile/Life/personal/ProfileIntro')
        },
        // 关注列表
        {
          path: '/attention/:id',
          name: 'Attention',
          component: () => import('@/views/mobile/Life/personal/Attention')
        },
        // 粉丝列表
        {
          path: '/fanslist/:id',
          name: 'FansList',
          component: () => import('@/views/mobile/Life/personal/FansList')
        },
        // 赞列表
        {
          path: '/thumbup',
          name: 'ThumbList',
          component: () => import('@/views/mobile/Life/personal/ThumbList')
        },
        // 标识说明
        {
          path: '/identifying',
          name: 'Identifying',
          component: () => import('@/views/mobile/Life/personal/Identifying')
        }
      ]
    }
  ]
};
