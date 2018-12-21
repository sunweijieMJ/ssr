<template>
  <div class="banner" v-if="banner" :style="{backgroundImage:`url(${banner.bg_img})`}">
    <LaneHubHeader></LaneHubHeader>
    <img v-if="banner.img" :src="banner.img" alt="banner大图">
    <div class="introduce">
      <i v-if="banner.logo" class="iconfont icon-footer_ic_logo"></i>
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
  @import '../../../assets/scss/_base.scss';

  .banner{
    min-width: 1280px;
    min-height: 689px;
    position: relative;
    background-size: cover;
    >img{
      @include boxSize(100%);
    }
    .introduce{
      @include boxSize(100%, 350px);
      position: absolute;
      left:0; top: 34%;
      z-index: 2000;
      text-align: center;
      margin: auto;
      i {
        font-size: 90px;
        color: #fff;
      }
      h3{
        @include fontStyle(60px, 400, #fff);
        letter-spacing: 3px;
        padding-top: 50px;
        &:nth-of-type(2){
          padding-top: 30px;
        }
      }
      p{
        @include fontStyle(32px, 300, #fff);
        margin-top: 30px;
        font-family: Helvetica;
        letter-spacing: 1.6px;
      }
    }
  }
</style>

