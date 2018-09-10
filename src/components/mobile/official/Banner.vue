<template>
  <div class="banner" v-if="banner">
    <img v-if="banner.img" :src="banner.img" alt="banner图">
    <div class="introduce">
      <i v-if="banner.logo" class="iconfont icon-index_ic_logo_white_"></i>
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
  @import '../../../assets/scss/_base.scss';

  .banner{
    @include boxSize(100%);
    position: relative;
    >img{
      @include boxSize(100%);
    }
    .introduce{
      @include distance(0, (2.8rem 0 0));
      position: absolute;
      top: 0;
      @include boxSize(100%);
      @include flex(column);
      img{
        @include boxSize(2.2rem);
      }
      i {
        font-size: 2.2rem;
        color: #fff;
      }
      h3{
        @include fontStyle(0.6rem, normal, #fff);
        @include distance((0.4rem 0 0), 0);
      }
      p{
        @include distance((0.3rem 0 0), 0);
        @include fontStyle(0.44rem, 300, #fff);
      }
    }
  }
</style>

