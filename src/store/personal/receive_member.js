// import PersonalApi from '../../api/mobile/personal';

export default {
  namespaced: true,
  actions: {
    // async getNewUserGift({commit}) {
    //   await LifeApi().getNewUserGift().then(res => {
    //     if (res.status) commit('NEW_USER_GIFT', res.data);
    //   });
    // }
  },
  mutations: {
    // NEW_USER_GIFT: (state, res) => {
    //   state.gift_info = res;
    // }
  },
  state: () => ({
    data: {
      headImg: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
      member_name: '小小玉山',
      content: '送你瓴里悦蓝会员 尊享至高礼遇',
      con2: '一起享受愉悦的生活方式',
      bg: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
      title1: '瓴里LANHUB Make Your Day',
      p1: 'LANEHUB 是生活方式新零售品牌，整合全球设计资源，在米兰成立设计中心，并与丹麦、日本等全球各地优秀设计师合作，提供生活方式全新选择，创造超越期待的多维度体验。',
      title2: '瓴里LANHUB 悦蓝礼遇',
      icon: 'https://s3m.mediav.com/galileo/178079-288d58f99bcc9e50a4b8a63e2d6e836a.png',
      gift: [
        {
          head: '购物返 5% 积分',
          img: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
          sub: '购物即可返与实际支付金额的 5% 等值的积分及瓴里值'
        },
        {
          head: '礼券福利',
          img: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
          sub: '2 张咖啡券/月；不定期优惠券发放'
        },
        {
          head: '亲友邀请卡',
          img: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
          sub: '可邀请 1 个朋友成为悦蓝会员 (邀请人瓴里值需 ≥5000 才可邀请)'
        },
        {
          head: '生日惊喜',
          img: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
          sub: ''
        },
        {
          head: '限量商品优先购买',
          img: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
          sub: ''
        },
        {
          head: '品牌活动优先报名',
          img: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
          sub: '瓴里品牌活动限时限量，悦蓝会员可优先报名'
        },
        {
          head: 'VIP DAY',
          img: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
          sub: '瓴里每年的 VIP DAY 邀请您参加'
        },
        {
          head: '优先客服',
          img: 'https://ps.ssl.qhimg.com/sdmt/178_135_100/t012467df27cac43ab4.jpg',
          sub: '提供优先客服，保证您在瓴里的体验'
        }
      ]
    }
  })
};
