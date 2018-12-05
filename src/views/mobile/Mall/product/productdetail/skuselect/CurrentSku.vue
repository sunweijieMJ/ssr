<template>
  <div class="current" v-if="currentSku.length">
    <img :src="currentSku.length > 0 ? currentSku[0].optionImgs[0] : '' | imageSize('330x330')" alt="">
    <p>
      <i>¥</i>
      <span v-if="currentSku.length === 1">{{currentSku[0].optionPrice | divide(100)}}</span>
      <template v-else>
        <span v-if="product_info.optionsMinPrice === product_info.optionsMaxPrice">{{product_info.optionsMinPrice | divide(100)}}</span>
        <span v-else>{{product_info.optionsMinPrice | divide(100)}}-{{product_info.optionsMaxPrice | divide(100)}}</span>
      </template>
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
