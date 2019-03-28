<template>
  <div class="openapp">
    <div class="desc">
      <h4>1800 元新手大礼包</h4>
      <p>一起重新发现生活</p>
    </div>
    <a href="javascript:;" v-if="type === 2" @click.stop="querySkip('ExhibitDownload', {code: params.exhibition, from: 'exhibition'})">下载App</a>
    <a href="javascript:;" v-else @click.stop="queryAssign('new_gift', {from: 'h5-productdetail'})">立即领取</a>
  </div>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';

  export default {
    mixins: [frequent],
    props: ['type']
  };
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/animate.css';
  @import '../../../assets/scss/_base.scss';

  .openapp {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 2000;
    left: 0;right: 0;
    margin: auto;
    bottom: 0.9rem;
    width: 6.9rem;
    height: 1.32rem;
    padding: 0 0.3rem;
    border-radius: 0.22rem;
    animation: fadeInUp 0.5s ease-in-out both;
    background-color: $darkBlue;
    .desc {
      h4 {
        font-size: 0.36rem;
        font-weight: 500;
        line-height: 0.5rem;
        color: #fff;
      }
      p {
        font-size: 0.26rem;
        line-height: 0.37rem;
        color: #fff;
      }
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.96rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      background-color: #fff;
      font-size: 0.32rem;
      font-weight: 400;
      color: $darkBlue;
    }
  }
</style>

