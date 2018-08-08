<template>
  <div class="banner" v-if="banner">
    <img v-if="banner.img" :src="banner.img" alt="banner图">
    <div class="introduce">
      <img v-if="banner.logo" src="../../assets/icon/index_ic_logo_white_tw.svg" alt="logo">
      <h3 v-if="banner.title">{{banner.title}}</h3>
      <p v-if="banner.desc">{{banner.desc}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['banner']
  };
</script>
<style lang="scss" scoped>
  .banner{
    width: 7.5rem;
    height: 9rem;
    position: relative;
    >img{
      width: 100%;
      position: absolute;
    }
    .introduce{
      padding-top: 2.8rem;
      position: relative;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: 2.2rem;
      }
      h3{
        margin-top: 0.4rem;
        font-size: 0.6rem;
        line-height: 0.6rem;
        color: #ffffff;
        font-weight: normal;
        text-align: center;
      }
      p{
        margin-top: 0.3rem;
        font-size: 0.44rem;
        color: #ffffff;
        line-height: 0.44rem;
        text-align: center;
      }
    }
  }
</style>

