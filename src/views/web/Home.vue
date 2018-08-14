<template>
  <div class="home">
    <Banner :banner="banner_msg"></Banner>
    <ImageText :imageText="image_text"></ImageText>
    <LaneHubApp></LaneHubApp>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import ImageText from '../../components/web/public/ImageText';
  import Banner from '../../components/web/public/Banner';
  import LaneHubApp from '../../components/web/other/LaneHubApp';
  import LaneHubFooter from '../../components/web/public/LaneHubFooter';

  import home_img_01 from '../../assets/web/img/index_img_01.jpg';
  import banner_url from '../../assets/web/img/index_img_banner.jpg';
  import banner_bg_url from '../../assets/web/img/index_img_banner_bg.jpg';

  export default {
    components: {
      Banner, ImageText, LaneHubApp, LaneHubFooter
    },
    data(){
      return{
        image_text: [
          {
            title: ['匠心品质的家具家居产品', '极致的线上线下体验'],
            content: [
              {
                desc: [
                  'LANEHUB 瓴里，创造愉悦生活方式的全新用户品牌。',
                  '致力于提供充满设计感、品质感、愉悦感的家具家居产品。',
                  '在瓴里 App，以及线下体验空间，与生活达人交流生活理念，',
                  '和懂生活、有品位、爱分享的朋友们，发现更美好的生活。',
                ]
              }
            ],
            btn: true,
            btn_text: '了解瓴里',
            btn_href: 'aboutUs',
            img_url: home_img_01
          },
          {
            title: ['设计感 品质感 愉悦感'],
            content: [
              {
                desc: [
                  'LANEHUB 瓴里产品包括家具、家居、休闲生活三个主类别。',
                  '基于对生活方式的思考、对用户需求及使用场景的准确把握，',
                  '瓴里精心打磨产品的各个方面，将功能、体验做到极致。',
                  '让产品融入生活场景，让用户在使用时感受到发自内心的愉悦感。'
                ]
              }
            ],
            btn: true,
            btn_text: '更多产品',
            btn_href: 'laneHubProduct',
            img_url: ''
          }
        ],
        banner_msg: {
          img: banner_url,
          bg_img: banner_bg_url,
          logo: true,
          title: ['创造愉悦的生活方式'],
          desc: 'To Create a Joyful Lifestyle'
        }
      };
    }
  };
</script>

