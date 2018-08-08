import banner_url from '../assets/img/cooperate_img_banner.jpg';
import banner_bg_url from '../assets/img/cooperate_img_banner_bg.jpg';
export default {
  state: () => ({
    partners: {
      title: 'LANEHUB 瓴里-Partners',
      meta: [
        {name: 'keywords', content: 'partners keywords'},
        {name: 'description', content: 'partners description'}
      ],
      banner_msg: {
        img: banner_url,
        bg_img: banner_bg_url,
        logo: false,
        title: ['Where are you', '一起创造新的生活方式'],
        desc: ''
      },
      image_text: [
        {
          title: ['共生共赢的发展平台'],
          content: [
            {
              desc: [
                'LANEHUB 瓴里，是由顶尖设计师、互联网专家、与资深家具家居供应链管理者，',
                '共同创建的生活方式品牌。',
                '旨在提供设计感、品质感、愉悦感的产品，为用户创造愉悦的生活方式。',
                '加入 LANEHUB 平台，和我们分享创造新世界的激情。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: ''
        }
      ]
    }
  }),
  actions: {},
  mutations: {},
  getters: {}
};
