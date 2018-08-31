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
            pageTitle: '精选'
          }
        },
        {
          path: '/life/moment',
          name: 'Moment',
          component: resolve => require(['@/views/mobile/Life/lifenav/MomentList'], resolve),
          meta: {
            pageTitle: '动态'
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
            pageTitle: ''
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
            pageTitle: ''
          }
        },
        {
          path: '/identifying',
          name: 'Identifying',
          component: resolve => require(['@/views/mobile/Life/personal/Identifying'], resolve),
          meta: {
            pageTitle: '标识说明'
          }
        }
      ]
    },
    {
      path: '/article_detail/:id/:preview?',
      name: 'ArticleDetail',
      component: resolve => require(['@/views/mobile/Life/article/ArticleDetail'], resolve),
      meta: {
        pageTitle: ''
      }
    },
    {
      path: '/activity_detail/:id',
      name: 'ActivityDetail',
      component: resolve => require(['@/views/mobile/Life/activity/ActivityDetail'], resolve),
      meta: {
        pageTitle: ''
      }
    },
    // 话题
    {
      path: '/topic_detail/:id',
      name: 'TopicDetail',
      component: resolve => require(['@/views/mobile/Life/topic/TopicDetail'], resolve),
      meta: {
        pageTitle: '话题详情'
      }
    },
    // 关注列表
    {
      path: '/attention/:id?',
      name: 'AttentionList',
      component: resolve => require(['@/views/mobile/Life/list/AttentionList'], resolve),
      meta: {
        pageTitle: '关注列表'
      }
    },
    // 粉丝列表
    {
      path: '/fanslist/:id?',
      name: 'FansList',
      component: resolve => require(['@/views/mobile/Life/list/FansList'], resolve),
      meta: {
        pageTitle: '粉丝列表'
      }
    },
    // 赞列表
    {
      path: '/thumbup/:id?',
      name: 'ThumbUpList',
      component: resolve => require(['@/views/mobile/Life/list/ThumbUpList'], resolve),
      meta: {
        pageTitle: '赞列表'
      }
    }
  ]
};
