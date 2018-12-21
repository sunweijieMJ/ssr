import mobile_banner_url from '../../../static/mobile/img/office/index_img_banner.png';
import mobile_home_img_01 from '../../../static/mobile/img/office/index_img_01.png';
import mobile_home_img_02 from '../../../static/mobile/img/office/index_img_02.png';

import web_home_img_01 from '../../../static/web/img/index_img_01.png';
import web_banner_url from '../../../static/web/img/index_img_banner.png';
import web_banner_bg_url from '../../../static/web/img/index_img_banner_bg.jpg';

export default {
  state: () => ({
    mobile: {
      image_text: [
        {
          title: ['瓴里是生活方式新零售品牌', '更是一个用户企业'],
          content: [
            {
              desc: ['“瓴”出自“高屋建瓴”，代表高品质居家生活，饱含着人们对圆满生活的憧憬与希望。']
            },
            {
              desc: ['瓴里始终如一地坚持设计驱动，提供全球化、场景化、系列化的生活方式提案，将健康、积极向上的人生态度传播给对品质生活有向往的人们。']
            }
          ],
          btn: true,
          btn_text: '了解瓴里',
          btn_href: 'AboutUs',
          img_url: mobile_home_img_01
        },
        {
          title: ['设计感 品质感 愉悦感'],
          content: [
            {
              desc: ['从全球化的视角出发，整合全球资源，在米兰成立设计中心，并与丹麦、日本等全球各地的优秀设计师合作。']
            },
            {
              desc: ['以简约、现代、艺术的设计感，追求匠心工艺的品质感为产品研发基准，为人们带来愉悦的使用体验和生活方式。']
            }
          ],
          btn: true,
          btn_text: '更多产品',
          btn_href: 'LaneHubProduct',
          img_url: mobile_home_img_02
        },
        {
          title: ['LANEHUB 瓴里 App'],
          content: [
            {
              desc: ['生活达人分享，打开新世界大门，了解品质生活。 和志趣相投的朋友一起讨论，碰撞出改造生活的新灵感。一起探访体验店，App 下单，免费送到家。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: ''
        }
      ],
      banner_msg: {
        img: mobile_banner_url,
        logo: true,
        title: '',
        desc: ''
      }
    },
    web: {
      image_text: [
        {
          title: ['瓴里是生活方式新零售品牌', '更是一个用户企业'],
          content: [
            {
              desc: [
                '“瓴”出自“高屋建瓴”，',
                '代表高品质居家生活，饱含着人们对圆满生活的憧憬与希望。 ',
                '瓴里始终如一地坚持设计驱动，',
                '提供全球化、场景化、系列化的生活方式提案，',
                '将健康、积极向上的人生态度传播给对品质生活有向往的人们。'
              ]
            }
          ],
          btn: true,
          btn_text: '了解瓴里',
          btn_href: 'aboutus',
          img_url: web_home_img_01
        },
        {
          title: ['充满设计感、品质感、愉悦感的产品'],
          content: [
            {
              desc: [
                '瓴里从全球化的视角出发，整合全球资源，在米兰成立设计中心，',
                '并与丹麦、日本等全球各地的优秀设计师合作。',
                '以简约、现代、艺术的设计感，追求匠心工艺的品质感为产品研发基准，',
                '为人们带来愉悦的使用体验和生活方式。'
              ]
            }
          ],
          btn: true,
          btn_text: '更多产品',
          btn_href: 'lanehub_product',
          img_url: ''
        }
      ],
      banner_msg: {
        img: web_banner_url,
        bg_img: web_banner_bg_url,
        logo: true,
        title: ['创造愉悦的生活方式'],
        desc: 'To Create a Joyful Lifestyle'
      }
    }
  })
};
