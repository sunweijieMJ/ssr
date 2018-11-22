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
        // 发现列表
        {
          path: '/life/discovery',
          name: 'Discovery',
          component: resolve => require(['@/views/mobile/Life/lifenav/DiscoveryList'], resolve)
        },
        // 动态列表
        {
          path: '/life/moment',
          name: 'Moment',
          component: resolve => require(['@/views/mobile/Life/lifenav/MomentList'], resolve)
        }
      ]
    },
    // 用户搜索
    {
      path: '/user_search',
      name: 'UserSearch',
      component: resolve => require(['@/views/mobile/Life/lifenav/discovery/UserSearch'], resolve)
    },
    // 全部活动
    {
      path: '/activity_list',
      name: 'ActivityList',
      component: resolve => require(['@/views/mobile/Life/lifenav/discovery/ActivityList'], resolve)
    },
    // 全部文章
    {
      path: '/article_list',
      name: 'ArticleList',
      component: resolve => require(['@/views/mobile/Life/lifenav/discovery/ArticleList'], resolve)
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
    // 话题详情
    {
      path: '/topic_detail/:id',
      name: 'TopicDetail',
      component: resolve => require(['@/views/mobile/Life/topic/TopicDetail'], resolve)
    },
    // 活动详情
    {
      path: '/activity_detail/:id',
      name: 'ActivityDetail',
      component: resolve => require(['@/views/mobile/Life/activity/ActivityDetail'], resolve)
    },
    // 活动秀
    {
      path: '/activityshow/:id',
      name: 'ActivityShow',
      component: resolve => require(['@/views/mobile/Life/activity/ActivityShow'], resolve)
    },
    // 活动地图
    {
      path: '/activity_map',
      name: 'ActivityMap',
      component: resolve => require(['@/views/mobile/Life/activity/AMap'], resolve)
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
    },
    // 领取会员
    {
      path: '/receive_member',
      name: 'ReceiveMember',
      component: resolve => require(['@/views/mobile/personal/ReceiveMember'], resolve)
    },

    // 规则页
    {
      path: '/rule_page',
      name: 'RulePage',
      component: resolve => require(['@/views/mobile/personal/member/RulePage'], resolve)
    },
    // 结果页
    {
      path: '/result_page',
      name: 'ResultPage',
      component: resolve => require(['@/views/mobile/personal/member/ResultPage'], resolve)
    }
  ]
};
