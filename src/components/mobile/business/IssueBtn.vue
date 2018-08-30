<template>
  <div class="issue-btn lh-footer">
    <img src="../../../../static/mobile/svg/common/toolbar _ic_keyboard_emoji.svg" alt="">
    <p placeholder="添加评论…" @click.stop="intercept"></p>
    <a href="javascript:;">发布</a>
  </div>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';

  export default {
    mixins: [frequent]
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .issue-btn {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    padding: 0.15rem 0.2rem;
    background-color: #fafafa;
    box-shadow: 0 -0.01rem 0.01rem 0 #eeeeee;
    img {
      width: 0.52rem;
    }
    p {
      width: 5.4rem;
      height: 0.68rem;
      font-size: 0.3rem;
      line-height: 0.68rem;
      border-radius: 0.04rem;
      background-color: #ffffff;
      border: solid 0.01rem #eeeeee;
      color: $themeColor;
      &:empty:before{
        content: attr(placeholder);
        font-size: 0.32rem;
        letter-spacing: 0.2px;
        color: #b6b6b6;
        margin-left: 0.1rem;
      }
      &:focus:before{
        content:none;
      }
    }
    a{
      font-size: 0.36rem;
      letter-spacing: 0.2px;
      text-align: center;
      color: #06379f;
    }
  }
</style>
