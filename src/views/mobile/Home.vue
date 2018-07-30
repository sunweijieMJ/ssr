<template>
  <div class="about_us">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="banner_msg"></Banner>
    <ImageText :imageText="image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import LaneHubHeader from '../../components/public/LaneHubHeader';
import Banner from "../../components/public/Banner";
import ImageText from "../../components/public/ImageText";
import DownLoad from '../../components/public/DownLoad';
import LaneHubFooter from '../../components/public/LaneHubFooter';

import about_img_01 from '../../assets/img/about_img_01.jpg';
import about_img_02 from '../../assets/img/about_img_02.jpg';
import about_img_03 from '../../assets/img/about_img_03.jpg';
import banner_url from '../../assets/img/about_img_banner.jpg';
export default {
  components: {
    LaneHubHeader,Banner,ImageText,DownLoad, LaneHubFooter
  },
  data() {
    return {
      image_text: [
        {
          title: ['来自互联网与家具家具行业的','顶尖创始团队'],
          content: [
            {
              desc:['LANEHUB 创始人梁伟平，同济大学硕士毕业。2017 年 9 月创建瓴里，团队聚集了来自安居客、蔚来、京东、宜家、罗莱等知名企业的优秀人才。',],
            },
            {
              desc: ['瓴里旨在重新定义和设计家庭产品，创造愉悦的生活方式。并引领中国制造向中国设计的产业升级，走向世界。']
            }
          ],
          btn: false,
          btn_text: "",
          btn_href: "",
          img_url: 'video',
          // img_url: about_img_01
        },
        {
          title: ['与用户做朋友'],
          content: [
            {
              desc:['我们希望成为用户心目中懂生活、有品位、爱分享的朋友。'],
            },
            {
              desc: ['通过线上的瓴里社区，用户可以学习、发现全新的生活理念、知识，找到志趣相投的好友，一起分享、交流、讨论。']
            },
            {
              desc: ['在线下的 LANEHUB 空间，用户除了能感受产品的质感、使用体验，还能参与内容丰富的活动，从休闲文化到健康美食，全方位提升生活理念。']
            }
          ],
          btn: false,
          btn_text: "",
          btn_href: "",
          img_url: about_img_02
        },
        {
          title: ['共生共赢的发展平台'],
          content: [
            {
              desc:[
                "我们重视与设计师、制造者等整个产业链上其他角色的关系。",
                "甄选最优秀的，有共同理念的合作者共同开创事业，更致力于为他们提供平台，实现长远的共同发展。"
              ],
            }
          ],
          btn: false,
          btn_text: "",
          btn_href: "",
          img_url: about_img_03
        },
        {
          title: ['全球化创新企业'],
          content: [
            {
              desc:['LANEHUB 瓴里是立足全球的中国品牌，计划在欧洲、日本等地设立研发、设计机构；以中国制造为依托，建立遍布全球的供应链体系。'],
            },
            {
              desc: ['2018 年初瓴里 App 将正式上线，并开设第一家线下体验店。']
            },
            {
              desc: ['2019 年全国一、二线城市覆盖体验中心二十家。']
            }
          ],
          btn: false,
          btn_text: "",
          btn_href: "",
          img_url: ""
        },
      ],
      banner_msg: {
        img: banner_url,
        logo: false,
        title: 'User Enterprise',
        desc: '设计 + 科技驱动的用户企业'
      }
    };
  }
};
</script>