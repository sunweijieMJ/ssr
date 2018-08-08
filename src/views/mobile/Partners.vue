<template>
  <div class="products">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="banner_msg"></Banner>
    <ImageText :imageText="image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import LaneHubHeader from '../../components/public/LaneHubHeader';
import ImageText from '../../components/public/ImageText';
import Banner from '../../components/public/Banner';
import DownLoad from '../../components/public/DownLoad';
import LaneHubFooter from '../../components/public/LaneHubFooter';

import cooperation_img_01 from '../../assets/img/cooperation_img_01.jpg';
import cooperation_img_02 from '../../assets/img/cooperation_img_02.jpg';
import cooperation_img_03 from '../../assets/img/cooperation_img_03.jpg';
import banner_url from '../../assets/img/cooperation_img_banner.jpg';
export default {
  components: {
    LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
  },
  data() {
    return {
      image_text: [
        {
          title: ['共生共赢的发展平台'],
          content: [
            {
              desc: ['LANEHUB 瓴里，是由顶尖设计师、互联网专家、与资深家具家居供应链管理者，共同创建的生活方式品牌。旨在提供设计感、品质感、愉悦感的产品，为用户创造愉悦的生活方式。']
            },
            {
              desc: ['加入 LANEHUB 平台，和我们分享创造新世界的激情。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: cooperation_img_01
        },
        {
          title: ['设计师'],
          content: [
            {
              desc: ['如果你有改变世界的想法，如果你有足够的想法支撑你去改变世界，瓴里有许多跟你一样的人，期待你为这个团队增添更多色彩。']
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: cooperation_img_02
        },
        {
          title: ['供应链'],
          content: [
            {
              desc: [
                '建立以中国为依托，全球化的供应链体系。',
                '如果你在家具、家居产品领域有优秀的生产能力，或在仓储物流领域有领先实力，我们愿意和你共同成长。'
              ]
            }
          ],
          btn: false,
          btn_text: '',
          btn_href: '',
          img_url: cooperation_img_03
        },
        {
          title: ['高端物业'],
          content: [
            {
              desc: [
                '计划 2019 年覆盖全国一、二线城市，建成体验中心 20 家。',
                '期待与新颖高端、有文化品位、追求更好用户互动的商业体，共创全新线下体验。'
              ]
            }
          ],
          btn: true,
          btn_text: '联系我们',
          btn_href: 'Partners',
          img_url: ''
        }
      ],
      banner_msg: {
        img: banner_url,
        logo: false,
        title: 'Where Are You',
        desc: '一起创造新的生活方式'
      }
    };
  }
};
</script>
