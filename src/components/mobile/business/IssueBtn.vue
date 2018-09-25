<template>
  <div class="issue-btn lh-footer">
    <section class="lh-footer">
      <i class="iconfont icon-tab_ic_keyboard_emo"></i>
      <p placeholder="添加评论…" @click.stop="intercept"></p>
      <a href="javascript:;">发布</a>
    </section>
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
    width: 100%;
    height: 1rem;
    position: relative;
    section {
      position: fixed;
      bottom: 0;
      z-index: 2000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 7.1rem;
      height: 1rem;
      padding: 0 0.2rem;
      background-color: #fafafa;
      box-shadow: 0 -0.01rem 0.01rem 0 #eeeeee;
      i {
        font-size: 0.5rem;
        line-height: 1rem;
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
        font-weight: 400;
        letter-spacing: 0.2px;
        text-align: center;
        color: rgba(6,55,159, 0.5);
      }
    }
  }
</style>
