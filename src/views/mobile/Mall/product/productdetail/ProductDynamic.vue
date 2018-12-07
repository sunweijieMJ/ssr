<template>
  <div class="product-dynamic" v-if="product_info.joyful.shares_count">
    <div class="dynamic-title" @click="assign('buyershow', product_info.basic.id)">
      <h4>{{`体验秀 (${product_info.joyful.shares_count})`}}</h4>
      <p v-if="product_info.joyful.buyers">
        <img v-lazy="imageSize(item.avatar, '56x56')" v-for="(item,index) in product_info.joyful.buyers.slice(0, 5)" :key="index" alt="">
        <i class="iconfont icon-shopping_next"></i>
      </p>
    </div>
    <smart-list :listData="product_info.dynamics.slice(0,2)"></smart-list>
  </div>
</template>
<script>
  import {SmartList} from '../../../../../components/mobile/business';
  import frequent from '../../../../../mixins/frequent.js';
  import imageSize from '../../../../../utils/filters/imageSize.js';

  import {mapState} from 'vuex';

  export default {
    mixins: [frequent],
    components: {SmartList},
    data() {
      return {
        imageSize
      };
    },
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-dynamic{
    background-color: #fff;
    .dynamic-title {
      height: 0.9rem;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid $borderColor;
      h4 {
        font-size: 0.34rem;
        font-weight: 400;
        color: $themeColor;
      }
      p {
        display: flex;
        align-items: center;
        img {
          width: 0.46rem;
          height: 0.46rem;
          border-radius: 50%;
          margin: 0 0.04rem;
        }
        i {
          font-size: 12px;
          color: rgba(106,106,106,1);
          margin: 0 0 0 0.16rem;
        }
      }
    }
  }
</style>

