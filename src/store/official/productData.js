import mobile_products_img_01 from '../../assets/mobile/img/products_img_01.jpg';
import mobile_products_img_02 from '../../assets/mobile/img/products_img_02.jpg';
import mobile_products_img_03 from '../../assets/mobile/img/products_img_03.jpg';
import mobile_banner_url from '../../assets/mobile/img/products_img_banner.jpg';

import web_products_img_01 from '../../assets/web/img/products_img_01.jpg';
import web_products_img_02 from '../../assets/web/img/products_img_02.jpg';
import web_products_img_03 from '../../assets/web/img/products_img_03.jpg';
import web_banner_url from '../../assets/web/img/products_img_banner.jpg';
import web_banner_bg_url from '../../assets/web/img/products_img_banner_bg.jpg';

export default {
  mobile: {
    image_text: [
      {
        title: ['LANEHUB 瓴里产品'],
        content: [
          {
            desc: ['我们看到了中国用户的生活标准在不断提高，生活内容更加丰富，以及日益增强的文化内涵和深度。']
          },
          {
            desc: ['我们认真思考用户的生活场景和需求，把现代的设计、审美理念，和最先进的科技、数据技术结合，通过最高标准的生产工艺，将品质产品呈现给用户。']
          }
        ],
        btn: false,
        btn_text: '',
        btn_href: '',
        img_url: mobile_products_img_01
      },
      {
        title: ['多套系家具 轻松置家的用户体验'],
        content: [
          {
            desc: ['LANEHUB 家具以现代风格为主，在多种主题下进行演绎，为用户提供整体的家具解决方案，每件产品即有个性，又都是融洽的风格，实现一站式、轻松置家的用户体验。']
          }
        ],
        btn: false,
        btn_text: '',
        btn_href: '',
        img_url: mobile_products_img_02
      },
      {
        title: ['涵盖生活方方面面的家居系列'],
        content: [
          {
            desc: ['LANEHUB 家居及生活系列涵盖家纺、卫浴、收纳、餐厨、灯具、窗帘、饰品、数码、健康、运动、儿童、母婴、及旅行等系列。生活的每个细节我们都努力将它变得更好。']
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
        title: ['LANEHUB 瓴里产品'],
        content: [
          {
            desc: [
              '我们看到了中国用户的生活标准在不断提高，生活内容更加丰富，',
              '以及日益增强的文化内涵和深度。我们认真思考用户的生活场景和需求，',
              '把现代的设计、审美理念，和最先进的科技、数据技术结合，',
              '通过最高标准的生产工艺，将品质产品呈现给用户。'
            ]
          }
        ],
        btn: false,
        btn_text: '',
        btn_href: '',
        img_url: web_products_img_01
      },
      {
        title: ['多套系家具 轻松置家的用户体验'],
        content: [
          {
            desc: [
              'LANEHUB 家具以现代风格为主，在多种主题下进行演绎，',
              '为用户提供整体的家具解决方案，每件产品即有个性，又都是融洽的风格，',
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
        title: ['涵盖生活方方面面的家居系列'],
        content: [
          {
            desc: [
              'LANEHUB 家居及生活系列涵盖家纺、卫浴、收纳、餐厨、灯具、',
              '窗帘、饰品、数码、健康、运动、儿童、母婴、及旅行等系列。',
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
};
