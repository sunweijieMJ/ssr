<template>
  <div class="home">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="banner_msg"></Banner>
    <ImageText :imageText="image_text"></ImageText>
    <DownLoadBtn></DownLoadBtn>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import LaneHubHeader from '../../components/public/LaneHubHeader';
  import Banner from '../../components/public/Banner';
  import ImageText from '../../components/public/ImageText';
  import DownLoadBtn from '../../components/public/DownLoadBtn';
  import LaneHubFooter from '../../components/public/LaneHubFooter';

  import banner_url from '../../assets/img/index_img_banner.png';
  import home_img_01 from '../../assets/img/index_img_01.jpg';
  import home_img_02 from '../../assets/img/index_img_02.jpg';

  export default {
    components: {
      LaneHubHeader, Banner, ImageText, DownLoadBtn, LaneHubFooter
    },
    data(){
      return{
        image_text: [
          {
            title: ['匠心品质的家具家居产品', '极致的线上线下体验'],
            content: [
              {
                desc: [
                  'LANEHUB 瓴里，创造愉悦生活方式的全新用户品牌。致力于提供充满设计感、品质感、愉悦感的家具家居产品。',
                  '在瓴里 App，以及线下体验空间，与生活达人交流生活理念，和懂生活、有品位、爱分享的朋友们，一起发现更美好的生活。'
                ]
              }
            ],
            btn: true,
            btn_text: '了解瓴里',
            btn_href: 'AboutUs',
            img_url: home_img_01
          },
          {
            title: ['设计感 品质感 愉悦感'],
            content: [
              {
                desc: ['LANEHUB 瓴里产品包括家具、家居、休闲生活三个主类别。']
              },
              {
                desc: ['基于对生活方式的思考、对用户需求及使用场景的准确把握，瓴里精心打磨产品的各个方面，将功能、体验做到极致。让产品融入生活场景，让用户在使用时感受到发自内心的愉悦感。']
              }
            ],
            btn: true,
            btn_text: '更多产品',
            btn_href: 'LaneHubProduct',
            img_url: home_img_02
          },
          {
            title: ['LANEHUB 瓴里 App'],
            content: [
              {
                desc: ['生活达人分享，打开新世界大门，了解品质生活。和志趣相投的朋友一起讨论，碰撞出改造生活的新灵感。告诉瓴里你的想法，属于你的梦幻产品即将诞生。']
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
          logo: true,
          title: '',
          desc: ''
        }
      };
    }
  };
</script>
<style lang="scss" scoped>
  .home{
    .download_btn {
      margin: 0.8rem auto;
    }
  }
</style>

