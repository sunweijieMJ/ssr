<template>
  <div class="current" v-if="currentSku.length">
    <img :src="currentSku.length > 0 ? currentSku[0].optionImgs[0] : '' | imageSize('330x330')" alt="">
    <p>
      <i>¥</i>
      <span v-if="currentSku.length === 1">{{Math.round(currentSku[0].optionPrice / 100)}}</span>
      <span v-else>{{product_info.optionsMinPrice === product_info.optionsMaxPrice ? Math.round(product_info.optionsMinPrice / 100) : Math.round(product_info.optionsMinPrice / 100) + '-' + Math.round(product_info.optionsMaxPrice / 100)}}</span>
    </p>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    props: ['currentSku'],
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../../assets/scss/_base.scss';

  .current {
    padding: 0.4rem 0;
    position: relative;
    >img {
      width: 3.3rem;
      margin: auto;
      border-radius: 0.04rem;
    }
    p {
      font-size: 0.4rem;
      font-weight: 400;
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
