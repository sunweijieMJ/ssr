<template>
  <div class="product-dynamic" v-if="product_info.joyful.shares_count">
    <div class="dynamic-title" @click="paramsSkip('BuyerShow', {id: product_info.basic.id})">
      <p>{{product_info.joyful.shares_count ? `${product_info.joyful.shares_count}条体验秀` : '活动报名中，等你来体验'}}</p>
      <p v-if="product_info.joyful.buyers">
        <img :src="item.avatar | imageSize('56x56')" v-for="(item,index) in product_info.joyful.buyers.slice(0, 8)" :key="index" alt="">
        <img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt="">
      </p>
    </div>
    <public-list :listData="product_info.dynamics"></public-list>
    <div class="read-more" v-if="product_info.joyful && product_info.joyful.shares_count > 3">
      <a href="javascript:;">查看 {{product_info.joyful.shares_count}} 条体验秀</a>
    </div>
  </div>
</template>
<script>
  import {PublicList} from '../../../../../components/mobile/business';
  import frequent from '../../../../../mixins/frequent.js';

  import {mapState} from 'vuex';

  export default {
    mixins: [frequent],
    components: {PublicList},
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
        font-size: 0.34rem;
        color: $themeColor;
        img {
          height: 0.46rem;
          border-radius: 50%;
          margin-right: 0.08rem;
          &:last-child {
            width: 0.12rem;
            margin-right: 0;
          }
        }
      }
    }
    .read-more{
      display: flex;
      justify-content: center;
      align-items: center;
      height:1.08rem;
      a {
        font-size: 0.28rem;
        font-family: Helvetica;
        font-weight: 300;
        color: $cambridgeBlue;
      }
    }
  }
</style>

