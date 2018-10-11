<template>
  <div class="hot-goods">
    <h3>LANEHUB 热门商品</h3>
    <shop-list :shopList="shopList.slice(0,4)"></shop-list>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {ShopList} from '../../../../../components/mobile/business';

  export default {
    components: {ShopList},
    data() {
      return {
        shopList: []
      };
    },
    mounted() {
      fetch('http://api.mall.dev.weiheinc.com/mall/product/list?page=1&with_dynamics=0&with_option_skus=0&with_option_stocks=1&with_options=1&with_params=0&with_specs=0&__platform=m&sign=fa1134f710ca9e9e8bcfd988257f0f3b').then(res => {
        res.json().then(data => {
          this.shopList = data.data.data;
        });
      });
    },
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .hot-goods {
    padding: 0.4rem 0.3rem 0.1rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
    h3 {
      margin-bottom: 0.4rem;
      font-size: 0.34rem;
      font-weight: 400;
      color: $themeColor;
    }
  }
</style>
