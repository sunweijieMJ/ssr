<template>
  <div class="profession-services">
    <public-title :pageTitle="'专业服务'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <ul class="services-content">
      <li v-for="(item, index) in text" :key="index">
        <h4>{{item.title}}</h4>
        <p v-for="(val, i) in item.content" :key="i">{{val}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import {PublicTitle} from '../../../../components/mobile/business';
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';

  export default {
    title() {
      return '专业服务';
    },
    meta() {
      return `<meta name="description" content="专业服务">
      <meta name="keywords" content="专业服务">`;
    },
    components: {
      PublicTitle
    },
    data() {
      return {
        response: {},
        isTencent: false,
        text: [
          {
            title: '生产过程远程监控',
            content: [
              '坐垫选用 35kg/m3 高回弹海绵，轮廓挺阔，给你全方位的倚靠；来自欧洲最高标准 A 级白橡木的精准打造，设有调整垫，提供人体最舒适的位置。',
              '坐垫选用 35kg/m3 高回弹海绵，轮廓挺阔，给你全方位的倚靠；来自欧洲最高标准'
            ]
          },
          {
            title: '管家级上门安装',
            content: [
              '坐垫选用 35kg/m3 高回弹海绵，轮廓挺阔，给你全方位的倚靠；来自欧洲最高标准 A 级白橡木的精准打造，设有调整垫，提供人体最舒适的位置。',
              '坐垫选用 35kg/m3 高回弹海绵，轮廓挺阔，给你全方位的倚靠；来自欧洲最高标准'
            ]
          },
          {
            title: '管家级上门安装',
            content: [
              '坐垫选用 35kg/m3 高回弹海绵，轮廓挺阔，给你全方位的倚靠；来自欧洲最高标准 A 级白橡木的精准打造，设有调整垫，提供人体最舒适的位置。',
              '坐垫选用 35kg/m3 高回弹海绵，轮廓挺阔，给你全方位的倚靠；来自欧洲最高标准'
            ]
          }
        ]
      };
    },
    mounted(){
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
    }
  };
</script>
<style lang="scss" scoped>
 @import '../../../../assets/scss/_base.scss';

  .profession-services {
    .services-content {
      padding: 0.4rem 0.3rem;
      background-color: #fff;
      li {
        margin-bottom: 0.4rem;
        &:last-child {
          margin-bottom: 0;
        }
        h4 {
          margin-bottom: 0.2rem;
          font-size: 0.34rem;
          font-weight: 400;
          line-height: 150%;
          color: $themeColor;
        }
        p {
          margin-bottom: 0.2rem;
          font-size: 0.32rem;
          line-height: 150%;
          letter-spacing: 0.1px;
          color: $subColor;
        }
      }
    }
  }
</style>

