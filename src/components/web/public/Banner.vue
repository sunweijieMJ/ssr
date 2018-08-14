<template>
  <div class="banner" v-if="banner" :style="{backgroundImage:`url(${banner.bg_img})`}">
    <LaneHubHeader></LaneHubHeader>
    <img v-if="banner.img" :src="banner.img" alt="banner大图">
    <div class="introduce">
      <img v-if="banner.logo" src="../../../assets/web/icon/banner_ic_logo.png" alt="公司名称">
      <h3 v-for="(val,index) in banner.title" :key="index">{{val}}</h3>
      <p v-if="banner.desc">{{banner.desc}}</p>
    </div>
  </div>
</template>
<script>
  import LaneHubHeader from './LaneHubHeader';

  export default {
    props: ['banner'],
    components: {
      LaneHubHeader
    }
  };
</script>

<style lang="scss" scoped>
  .banner{
    min-width: 1280px;
    min-height: 689px;
    position: relative;
    >img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .introduce{
      width: 100%;
      height: 350px;
      position: absolute;
      left:0; top: 34%;
      z-index: 2000;
      text-align: center;
      margin: auto;
      img{
        width: 485px;
        margin: auto;
      }
      h3{
        font-size: 60px;
        font-weight: 400;
        line-height: 60px;
        letter-spacing: 3px;
        text-align: center;
        color: #ffffff;
        padding-top: 50px;
        &:nth-of-type(2){
          padding-top: 30px;
        }
      }
      p{
        margin-top: 30px;
        font-family: Helvetica;
        font-size: 32px;
        font-weight: 300;
        line-height: 32px;
        letter-spacing: 1.6px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
</style>

