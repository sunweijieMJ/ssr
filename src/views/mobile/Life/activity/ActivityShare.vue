<template>
  <div class="activity-share">
    <div class="share-header">
      <h3>小小小雨山 邀请你来参加</h3>
      <h4>Family Day</h4>
      <img src="" alt="">
    </div>
    <div class="share-btn"></div>
    <div class="share-detail">
      <h4>活动详情</h4>
      <li v-for="(item, index) in test" :key="index">{{item}}</li>
    </div>
  </div>
</template>
<script>
  export default {
    title() {
      return '活动报名分享';
    },
    meta() {
      return `<meta name="description" content="活动报名分享">
      <meta name="keywords" content="活动报名分享">`;
    },
    data() {
      return {
        test: [
          '- 年轻活力的Expert团队首秀',
          '- 探秘LANEHUB首家体验店',
          '- Family Party',
          '- LANEHUB特调饮品',
          '- 精致Buffet - 惊喜彩蛋 '
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .activity-share {
    padding: 0.5rem 0.3rem 0;
    .share-header {
      h3 {
        font-size: 0.32rem;
        font-weight: 400;
        line-height: 0.32rem;
        text-align: center;
        color: $themeColor;
      }
      h4 {
        margin: 0.3rem 0;
        font-size: 0.44rem;
        font-weight: 400;
        line-height: 0.5rem;
        text-align: center;
        color: $themeColor;
      }
      img {
        width: 100%;
      }
    }
    .share-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.7rem auto 0.64rem;
      width: 5.9rem;
      height: 0.96rem;
      border-radius: 0.48rem;
      background-color: $darkBlue;
      font-size: 0.4rem;
      color: #fff;
    }
    .share-detail {
      h4 {
        font-size: 0.34rem;
        font-weight: 400;
        line-height: 0.34rem;
        color: $themeColor;
      }
      li {
        font-size: 0.3rem;
        line-height: 150%;
        color: $themeColor;
      }
    }
  }
</style>
