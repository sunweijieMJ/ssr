<template>
  <div class="product-dynamic" v-if="product_info.joyful.shares_count">
    <div class="dynamic-title" @click="assign('buyershow', product_info.basic.id)">
      <p>{{`体验秀 (${product_info.joyful.shares_count})`}}</p>
      <p v-if="product_info.joyful.buyers">
        <img :src="item.avatar | imageSize('56x56')" v-for="(item,index) in product_info.joyful.buyers.slice(0, 8)" :key="index" alt="">
        <i class="iconfont icon-shopping_next"></i>
      </p>
    </div>
    <smart-list :listData="product_info.dynamics.slice(0,2)"></smart-list>
  </div>
</template>
<script>
  import {SmartList} from '../../../../../components/mobile/business';
  import frequent from '../../../../../mixins/frequent.js';

  import {mapState} from 'vuex';

  export default {
    mixins: [frequent],
    components: {SmartList},
    computed: {
      ...mapState({
        product_info: (store) => store.product_detail.product_info
      })
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-dynamic{
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    .dynamic-title {
      height: 0.96rem;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid $borderColor;
      p {
        display: flex;
        align-items: center;
        font-size: 0.34rem;
        color: $themeColor;
        img {
          height: 0.46rem;
          border-radius: 50%;
          margin-right: 0.08rem;
        }
        i {
          font-size: 0.14rem;
          margin: 0 0 0 0.16rem;
        }
      }
    }
  }
</style>

