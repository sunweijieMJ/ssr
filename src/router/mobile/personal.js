export default {
  path: 'Personal',
  component: () => import('@/views/mobile/Personal'),
  children: [
    // 领取会员
    {
      path: '/receive_member',
      name: 'ReceiveMember',
      component: () => import('@/views/mobile/personal/ReceiveMember')
    },
    // 规则页
    {
      path: '/rule_page',
      name: 'RulePage',
      component: () => import('@/views/mobile/personal/member/RulePage')
    },
    // 结果页
    {
      path: '/result_page',
      name: 'ResultPage',
      component: () => import('@/views/mobile/personal/member/ResultPage')
    },
    // 普通会员
    {
      path: '/ordinary_member',
      name: 'OrdinaryMember',
      component: () => import('@/views/mobile/personal/member/OrdinaryMember')
    },
    // 悦蓝会员
    {
      path: '/yue_blue_member',
      name: 'YueBlueMember',
      component: () => import('@/views/mobile/personal/member/YueBlueMember')
    },
    // 臻蓝会员
    {
      path: '/senior_member',
      name: 'SeniorMember',
      component: () => import('@/views/mobile/personal/member/SeniorMember')
    },
    // 瓴里值页
    {
      path: '/lin_li_value',
      name: 'LinLiValue',
      component: () => import('@/views/mobile/personal/member/LinLiValue')
    },

    // 优惠券领取
    {
      path: '/receive_coupon',
      name: 'ReceiveCoupon',
      component: () => import('@/views/mobile/personal/ReceiveCoupon')
    },

    // 优惠券领取结果页
    {
      path: '/coupon_result',
      name: 'CouponResult',
      component: () => import('@/views/mobile/personal/coupon/CouponResult')
    }
  ]
};
