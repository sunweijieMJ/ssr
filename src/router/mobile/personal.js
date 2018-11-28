export default {
  path: 'Personal',
  component: resolve => require(['@/views/mobile/Personal'], resolve),
  children: [
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
    },
    // 普通会员
    {
      path: '/ordinary_member',
      name: 'OrdinaryMember',
      component: resolve => require(['@/views/mobile/personal/member/OrdinaryMember'], resolve)
    },
    // 悦蓝会员
    {
      path: '/yue_blue_member',
      name: 'YueBlueMember',
      component: resolve => require(['@/views/mobile/personal/member/YueBlueMember'], resolve)
    },
    // 臻蓝会员
    {
      path: '/senior_member',
      name: 'SeniorMember',
      component: resolve => require(['@/views/mobile/personal/member/SeniorMember'], resolve)
    },
    // 瓴里值页
    {
      path: '/lin_li_value',
      name: 'LinLiValue',
      component: resolve => require(['@/views/mobile/personal/member/LinLiValue'], resolve)
    }
  ]
};
