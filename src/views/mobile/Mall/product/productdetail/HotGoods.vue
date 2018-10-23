<template>
  <div class="hot-goods" v-if="recommend_goods.length">
    <h3>热门商品</h3>
    <shop-list :shopList="recommend_goods"></shop-list>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {ShopList} from '../../../../../components/mobile/business';

  export default {
    components: {ShopList},
    computed: mapState({
      recommend_goods: (store) => store.product_detail.recommend_goods
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .hot-goods {
    padding: 0.4rem 0.3rem 0;
    margin-bottom: 0.2rem;
    background-color: #fff;
    h3 {
      margin-bottom: 0.4rem;
      font-size: 0.34rem;
      font-weight: 400;
      line-height: 0.34rem;
      color: $themeColor;
    }
  }
</style>
