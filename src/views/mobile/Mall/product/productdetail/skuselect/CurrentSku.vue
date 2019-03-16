<template>
  <div class="current" v-if="currentSku.length">
    <img :src="currentSku.length > 0 ? currentSku[0].optionImgs[0] : '' | imageSize('330x330')" alt="">
    <p>
      <i>¥</i>
      <span v-if="currentSku.length === 1">{{currentSku[0].optionPrice | divide(100)}}</span>
      <span class="delete" v-if="currentSku.length === 1">
        <i v-if="currentSku.length === 1 && currentSku[0].optionPrice !== currentSku[0].marketPrice" class="del-i">¥</i>
        <del v-if="currentSku.length === 1 && currentSku[0].optionPrice !== currentSku[0].marketPrice">{{currentSku[0].marketPrice | divide(100)}}</del>
      </span>
      <template v-else>
        <span v-if="product_info.optionsMinPrice === product_info.optionsMaxPrice">{{product_info.optionsMinPrice | divide(100)}}</span>
        <span v-else>{{product_info.optionsMinPrice | divide(100)}}-{{product_info.optionsMaxPrice | divide(100)}}</span>
        <span class="delete" v-if="product_info.marketMinPrice === product_info.marketMaxPrice">
          <i class="del-i">¥</i>
          <del>{{product_info.marketMinPrice | divide(100)}}</del>
        </span>
        <span class="delete" v-if="+product_info.marketMinPrice !== +product_info.optionsMinPrice && +product_info.marketMinPrice !== +product_info.marketMaxPrice"> 
          <i class="del-i">¥</i>
          <del>{{product_info.marketMinPrice | divide(100)}}-{{product_info.marketMaxPrice | divide(100)}}</del>
        </span>
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
    .delete{
      font-size: 0.26rem;
      color: #999;
      i{
        font-size: 0.26rem;
        font-style: normal;
      }
    }
  }
</style>
