<template>
  <div class="products">
    <Banner :banner="banner_msg"></Banner>
    <ImageText :imageText="image_text"></ImageText>
    <PartnerContent></PartnerContent>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import Banner from '../../components/web/public/Banner';
import ImageText from '../../components/web/public/ImageText';
import PartnerContent from '../../components/web/other/PartnerContent';
import DownLoad from '../../components/web/public/DownLoad';
import LaneHubFooter from '../../components/web/public/LaneHubFooter';

import banner_url from '../../assets/web/img/cooperate_img_banner.jpg';
import banner_bg_url from '../../assets/web/img/cooperate_img_banner_bg.jpg';

export default {
  title() {
    return 'Lanehub关于我们';
  },
  meta() {
    return `<meta name="description" content="Lane hub 关于我们">
    <meta name="keywords" content="home">`;
  },
  components: {Banner, ImageText, PartnerContent, DownLoad, LaneHubFooter},
  data() {
    return {
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
    };
  }
};
</script>
