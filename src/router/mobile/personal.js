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
    }
  ]
};
