import mobile_products_img_01 from '../../../static/mobile/img/office/products_img_01.png';
import mobile_products_img_02 from '../../../static/mobile/img/office/products_img_02.png';
import mobile_products_img_03 from '../../../static/mobile/img/office/products_img_03.jpg';
import mobile_banner_url from '../../../static/mobile/img/office/products_img_banner.jpg';

import web_products_img_01 from '../../../static/web/img/products_img_01.png';
import web_products_img_02 from '../../../static/web/img/products_img_02.png';
import web_products_img_03 from '../../../static/web/img/products_img_03.jpg';
import web_banner_url from '../../../static/web/img/products_img_banner.jpg';
import web_banner_bg_url from '../../../static/web/img/products_img_banner_bg.jpg';

export default {
  state: () => ({
    mobile: {
      image_text: [
        {
          title: ['轻松置家的用户体验'],
          content: [
            {
              desc: ['家是生活场景中最温暖的空间，我们希望通过探索场景，启发人们的生活灵感。用简单、完整的系列产品，为用户提供最适合的生活方式提案。']
            },
            {
              desc: ['瓴里不仅要求产品的外形和功能设计达到极致的水平，也十分注重产品的内涵和灵魂。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: mobile_products_img_01
        },
        {
          title: ['三种系列家具，满足不同用户需求'],
          content: [
            {
              desc: ['以简约、现代、艺术的设计感，追求匠心工艺的品质感为研发基准，为用户带来愉悦的使用体验。']
            },
            {
              desc: ['在瓴里，用户无需考虑各个产品之间的搭配问题， 从大件的家具到小件的家居饰品都为你提供新的灵感，实现一站式、轻松置家的用户体验。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: mobile_products_img_02
        },
        {
          title: ['全品类生活方式产品'],
          content: [
            {
              desc: ['从出行到居家，从工作到休闲，从日用品到食品， 瓴里将为用户提供最优质的、最贴心的生活方式产品。生活的每个细节我们都努力将它变得更好。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: mobile_products_img_03
        },
        {
          title: ['顶级品质 顶级服务'],
          content: [
            {
              desc: [
                '最优质的原材料，环保的生产工艺，全球化采购，保证产品顶级品质，以及合理的价格成本。',
                '严格保证配送运输的安全高效，以及更多超出用户预期的增值服务体验。'
              ]
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
        logo: false,
        title: 'Redesign',
        desc: '重新定义和设计家居生活'
      }
    },
    web: {
      image_text: [
        {
          title: ['轻松置家的用户体验'],
          content: [
            {
              desc: [
                '家是生活场景中最温暖的空间，',
                '我们希望通过对家场景的探索，启发人们的生活灵感。',
                '用简单、完整的系列产品，为用户提供最适合的生活方式提案。',
                '瓴里不仅要求产品的外形和功能设计达到极致的水平，',
                '也十分注重产品的内涵和灵魂。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: web_products_img_01
        },
        {
          title: ['三种系列家具，满足不同用户需求'],
          content: [
            {
              desc: [
                '以简约、现代、艺术的设计感，追求匠心工艺的品质感为产品研发基准，',
                '为用户带来愉悦的使用体验。',
                '在瓴里，用户无需考虑各个产品之间的搭配问题，',
                '从大件的家具到小件的家居饰品都为你提供新的灵感，',
                '实现一站式、轻松置家的用户体验。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: web_products_img_02
        },
        {
          title: ['全品类生活方式产品'],
          content: [
            {
              desc: [
                '从出行到居家，从工作到休闲，从日用品到食品，',
                '瓴里将为用户提供最优质的、最贴心的生活方式产品。',
                '生活的每个细节我们都努力将它变得更好。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: web_products_img_03
        },
        {
          title: ['顶级品质 顶级服务'],
          content: [
            {
              desc: [
                '最优质的原材料，环保的生产工艺，全球化采购，',
                '保证产品顶级品质，以及合理的价格成本。',
                '严格保证配送运输的安全高效，以及更多超出用户预期的增值服务体验。'
              ]
            }
          ],
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
        title: ['Redesign', '重新定义和设计家居生活'],
        desc: ''
      }
    }
  })
};
