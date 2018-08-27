<template>
  <div class="smart-banner">
    <div class="banner-img">
      <img :src="bannerMsg.img" alt="banner图">
      <h3>{{bannerMsg.title}}</h3>
    </div>
    <div class="banner-desc">
      <p v-for="(val, index) in bannerMsg.desc" :key="index">{{val}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['bannerMsg']
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .smart-banner {
    .banner-img {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        background-size: cover;
      }
      h3 {
        position: absolute;
        top: 2.07rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.6rem;
        font-weight: 300;
        text-align: center;
        color: #ffffff;
      }
    }
    .banner-desc {
      padding: 0 0.4rem;
      margin: 0.5rem 0 0.8rem;
      p {
        font-size: 0.3rem;
        line-height: 0.45rem;
        color: #363636;
      }
    }
  }
</style>


