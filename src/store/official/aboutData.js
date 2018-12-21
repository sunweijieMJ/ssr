import mobile_about_img_02 from '../../../static/mobile/img/office/about_img_02.jpg';
import mobile_about_img_03 from '../../../static/mobile/img/office/about_img_03.jpg';
import mobile_about_img_04 from '../../../static/mobile/img/office/about_img_04.png';
import mobile_banner_url from '../../../static/mobile/img/office/about_img_banner.png';

import web_about_img_01 from '../../../static/web/img/about_img_01.jpg';
import web_about_img_02 from '../../../static/web/img/about_img_02.jpg';
import web_about_img_03 from '../../../static/web/img/about_img_03.jpg';
import web_about_img_04 from '../../../static/web/img/about_img_04.png';
import web_banner_url from '../../../static/web/img/about_img_banner.png';
import web_banner_bg_url from '../../../static/web/img/about_img_banner_bg.jpg';

export default {
  state: () => ({
    mobile: {
      image_text: [
        {
          title: ['来自互联网与家具家居行业的', '顶尖创始团队'],
          content: [
            {
              desc: ['LANEHUB 创始人梁伟平，同济大学硕士毕业。2017 年 9 月创建瓴里，团队聚集了来自安居客、蔚来、京东、宜家、罗莱等知名企业的优秀人才。']
            },
            {
              desc: ['瓴里旨在重新定义和设计家庭产品，创造愉悦的生活方式。并引领中国制造向中国设计的产业升级，走向世界。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: 'video'
        },
        {
          title: ['与用户做朋友'],
          content: [
            {
              desc: ['我们希望成为用户心目中懂生活、有品位、爱分享的朋友。']
            },
            {
              desc: ['通过线上的瓴里社区，用户可以学习、发现全新的生活理念、知识，找到志趣相投的好友，一起分享、交流、讨论。']
            },
            {
              desc: ['在线下的 LANEHUB 空间，用户除了能感受产品的质感、使用体验，还能参与内容丰富的活动，从休闲文化到健康美食，全方位提升生活理念。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: mobile_about_img_02
        },
        {
          title: ['共生共赢的发展平台'],
          content: [
            {
              desc: [
                '我们重视与设计师、制造者等整个产业链上其他角色的关系。',
                '甄选最优秀的、有共同理念的合作者共同开创事业，更致力于为他们提供平台，实现长远的共同发展。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: mobile_about_img_03
        },
        {
          title: ['全球化创新企业'],
          content: [
            {
              desc: ['瓴里是立足全球的中国品牌，从全球化的视角出发，整合全球资源，在米兰成立设计中心，并与丹麦、日本等全球各地的优秀设计师合作。']
            },
            {
              desc: ['2018 年初瓴里 App 上线，2018 年 12 月开设了第一家线下体验店。']
            },
            {
              desc: ['2019 年全国一、二线城市覆盖体验中心20家。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: mobile_about_img_04
        },
        {
          title: ['LANEHUB 体验店'],
          content: [
            {
              desc: ['2018 年 12 月底，瓴里首家体验店在上海白玉兰广场揭开面纱，1500 平米的空间内集合呈现了多维度的丰富业态。']
            },
            {
              desc: ['瓴里创造的不仅是一种全新的家居新零售模式，更是一次线上线下融合体验的大胆尝试。']
            },
            {
              desc: ['地址：上海市虹口区东大名路 501 号 L1-09']
            }
          ],
          link: {
            v: 2,
            w: 0
          },
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: ''
        }
      ],
      banner_msg: {
        img: mobile_banner_url,
        logo: false,
        title: 'User Enterprise',
        desc: '设计 + 科技驱动的用户体验'
      }
    },
    web: {
      image_text: [
        {
          title: ['来自互联网与家具家居行业的顶尖创始团队'],
          content: [
            {
              desc: [
                'LANEHUB 创始人梁伟平，同济大学硕士毕业。2017 年 9 月创建瓴里，',
                '团队聚集了来自安居客、蔚来、京东、宜家、罗莱等知名企业的优秀人才。',
                '瓴里旨在重新定义和设计家庭产品，创造愉悦的生活方式。',
                '并引领中国制造向中国设计的产业升级，走向世界。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: web_about_img_01,
          video: true
        },
        {
          title: ['与用户做朋友'],
          content: [
            {
              desc: [
                '我们希望成为用户心目中懂生活、有品位、爱分享的朋友。',
                '通过线上的瓴里社区，用户可以学习、发现全新的生活理念、知识，',
                '找到志趣相投的好友，一起分享、交流、讨论。',
                '在线下的 LANEHUB 空间，用户除了能感受产品的质感、使用体验，',
                '还能参与内容丰富的活动，从休闲文化到健康美食，全方位提升生活理念。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: web_about_img_02
        },
        {
          title: ['共生共赢的发展平台'],
          content: [
            {
              desc: [
                '我们重视与设计师、制造者等整个产业链上其他角色的关系。',
                '甄选最优秀的、有共同理念的合作者共同开创事业，',
                '更致力于为他们提供平台，实现长远的共同发展。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: web_about_img_03
        },
        {
          title: ['全球化创新企业'],
          content: [
            {
              desc: [
                '瓴里是立足全球的中国品牌，从全球化的视角出发，整合全球资源，',
                '在米兰成立设计中心，并与丹麦、日本等全球各地的优秀设计师合作。',
                '2018 年初瓴里 App 上线，2018 年 12 月开设了第一家线下体验店。',
                '2019 年全国一、二线城市覆盖体验中心 20 家。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: web_about_img_04
        },
        {
          title: ['LANEHUB 体验店'],
          content: [
            {
              desc: [
                '2018 年 12 月底，瓴里首家体验店在上海白玉兰广场揭开面纱，',
                '1500 平米的空间内集合呈现了多维度的丰富业态。',
                '瓴里创造的不仅是一种全新的家居新零售模式，',
                '更是一次线上线下融合体验的大胆尝试。'
              ]
            },
            {
              desc: [
                '期待大家前来体验',
                '上海市虹口区东大名路 501 号 L1-09'
              ]
            }
          ],
          link: {
            v: 1,
            w: 1
          },
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: ''
        }
      ],
      banner_msg: {
        img: web_banner_url,
        bg_img: web_banner_bg_url,
        logo: false,
        title: ['User Enterprise', '设计 + 科技驱动的用户体验'],
        desc: ''
      }
    }
  })
};
