<template>
  <div class="product">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="banner_msg"></Banner>
    <ImageText :imageText="image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import LaneHubHeader from '../../components/mobile/public/LaneHubHeader';
import ImageText from '../../components/mobile/public/ImageText';
import Banner from '../../components/mobile/public/Banner';
import DownLoad from '../../components/mobile/public/DownLoad';
import LaneHubFooter from '../../components/mobile/public/LaneHubFooter';

import products_img_01 from '../../assets/mobile/img/products_img_01.jpg';
import products_img_02 from '../../assets/mobile/img/products_img_02.jpg';
import products_img_03 from '../../assets/mobile/img/products_img_03.jpg';
import banner_url from '../../assets/mobile/img/products_img_banner.jpg';

export default {
  title() {
    return 'Lanehub关于我们';
  },
  meta() {
    return `<meta name="description" content="Lane hub 关于我们">
    <meta name="keywords" content="home">`;
  },
  components: {
    LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
  },
  data() {
    return {
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
          img_url: products_img_01
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
          img_url: products_img_02
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
          img_url: products_img_03
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
        img: banner_url,
        logo: false,
        title: 'Redesign',
        desc: '重新定义和设计家居生活'
      }
    };
  }
};
</script>

