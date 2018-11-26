<template>
  <div class="applink">
    <div class="guide">
      <i class="iconfont icon-download_ic_arrow"></i>
      <div class="guide-text">
        <p>点击右上角<i class="iconfont icon-download_ic_operatio"></i></p>
        <p>选择在 Safari 中打开</p>
      </div>
    </div>
    <img src="../../../../static/mobile/img/h5_bg_open.png" alt="">
    <div class="wechat-btn">
      <div class="btn-left">
        <i class="iconfont icon-app_ic_white_"></i>
        <div class="desc">
          <h3>瓴里</h3>
          <p>一起开创新生活方式</p>
        </div>
      </div>
      <a href="javascript:;" @click="querySkip('Download')">下载App</a>
    </div>
  </div>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';

  export default {
    title() {
      return '打开App';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
      <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - APP 下载页">`;
    },
    mixins: [frequent]
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .applink {
    box-sizing: border-box;
    position: relative;
    height: 100vh;
    overflow: hidden;
    padding-top: 1.6rem;
    .guide {
      >i{
        position: absolute;
        top: 0.16rem;right: 0rem;
        font-size: 2rem;
        color: $themeColor;
      }
      .guide-text{
        p {
          margin-bottom: 0.2rem;
          font-size: 0.36rem;
          line-height: 0.36rem;
          color: $themeColor;
          text-align: center;
        }
        i {
          font-size: 0.12rem;
        }
      }
    }
    img {
      width: 5.6rem;
      margin: 0.96rem auto 0;
    }
    .wechat-btn {
      position: sticky;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 5.5rem;
      height: 1.32rem;
      margin: auto;
      padding: 0 0.2rem 0 0.3rem;
      border-radius: 0.22rem;
      background:$darkBlue;
      .btn-left {
        display: flex;
        align-items: center;
        i {
          font-size: 0.8rem;
          color: #fff;
        }
        .desc {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 0.8rem;
          margin-left: 0.17rem;
          color: #fff;
          h3 {
            font-size: 0.36rem;
            font-weight: 400;
          }
          p {
            font-size: 0.26rem;
          }
        }
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.58rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.26rem;
        font-weight: 400;
        color: $darkBlue;
        background-color: #fff;
      }
    }
  }
</style>
