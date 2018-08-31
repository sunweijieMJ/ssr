<template>
  <div class="current" v-if="currentSku.length">
    <img :src="currentSku.length>0?currentSku[0].optionImgs[0]:'' | imageSize('330x330')" alt="">
    <p v-if="currentSku.length === 1">
      <i>¥</i><span>{{currentSku[0].optionPrice}}</span>
    </p>
  </div>
</template>
<script>
  export default {
    props: ['currentSku']
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../../assets/scss/_base.scss';

  .current {
    padding: 0.5rem 0;
    position: relative;
    >img {
      width: 3.3rem;
      margin: auto;
      border-radius: 0.04rem;
    }
    p {
      font-size: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      color: $mallRed;
      margin-top: 0.2rem;
      i {
        font-size: 0.36rem;
        font-style: normal;
      }
    }
  }
</style>
