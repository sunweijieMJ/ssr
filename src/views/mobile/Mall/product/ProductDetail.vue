<template>
  <div class="product-detail" v-if="!cut_out" :class="sold_out ?  'sold-out' : ''">
    <life-style></life-style>
    <div v-if="!sold_out">
      <product-info :currentType="currentType"></product-info>
      <description v-if="product_detail.description" :response="product_detail.description"></description>
      <product-dynamic></product-dynamic>
      <product-params></product-params>
      <product-service></product-service>
      <majordomo></majordomo>
      <product-btn></product-btn>
      <sku-select @to-parent="getCurrentSku" @to-skuResult="getCurrentType"></sku-select>
    </div>
    <div v-else class="sold-out">
      <img src="../../../../../static/mobile/svg/product/product_lb_error.svg" alt="">
      <p>商品已下架</p>
    </div>
  </div>
  <div v-else>
    <component :is="SpecParams"></component>
  </div>
</template>
<script>
  import wechat from '../../../../mixins/wechat';
  import SpecParams from './SpecParams.vue';
  import Description from '../../../../components/common/product/productDetail.vue';
  import {LifeStyle, Majordomo} from '../../../../components/mobile/business';
  import {ProductInfo, ProductDynamic, ProductParams, ProductService, ProductBtn, SkuSelect} from './productdetail/index.js';

  import product_detail from '../../../../store/mall/product_detail.js';
  import product from '../../../../store/product/product';
  import {mapState} from 'vuex';

  export default {
    title() {
      return `${this.product_info ? this.product_info.basic.title : '商品详情'}`;
    },
    meta() {
      return `<meta name="description" content="商品详情">
      <meta name="keywords" content="商品详情">`;
    },
    asyncData({store, route}) {
      store.registerModule('product', product);
      store.registerModule('product_detail', product_detail);
      const id = route.params.id;
      return Promise.all([
        store.dispatch('product_detail/getProductDetail', id),
        store.dispatch('product/getProduct', id),
        store.dispatch('getGlobal')
      ]);
    },
    components: {
      LifeStyle, ProductInfo, Description, ProductDynamic, ProductParams, ProductService, Majordomo, ProductBtn, SkuSelect
    },
    mixins: [wechat],
    data() {
      return {
        SpecParams,
        currentSku: [], // ETC 当前选中的sku
        currentType: [] // ETC 当前选择sku的类型
      };
    },
    mounted(){
      let that = this;
      that.$store.registerModule('product', product, {preserveState: true});
      that.$store.registerModule('product_detail', product_detail, {preserveState: true});
      if(!that.product_info) return;
      const link = window.location.href;
      const title = that.product_info.basic.title;
      const desc = that.product_info.dynamics[0].entity_brief;
      const imgUrl = that.product_info.dynamics[0].entity_photos[0];
      that.wxInit(link, title, desc, imgUrl);
    },
    methods: {
      // 监听子组件事件
      getCurrentSku(data){
        this.currentSku = data;
      },
      getCurrentType(data){
        this.currentType = data;
      }
    },
    destroyed() {
      this.$store.unregisterModule('product', product);
      this.$store.unregisterModule('product_detail', product_detail);
    },
    computed: mapState({
      product_detail: (store) => store.product.productabc,
      product_info: (store) => store.product_detail.product_info,
      sold_out: (store) => store.product_detail.sold_out,
      cut_out: (store) => store.product_detail.cut_out
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .product-detail{
    width: 100%;
    padding-bottom: 1.08rem;
    background-color: #f1f1f1;
    &.sold-out {
      background-color: #fff;
    }
    .sold-out{
      img{
        width: 1.6rem;
        margin: 1.1rem auto 0.2rem;
      }
      p{
        font-size: 0.4rem;
        font-weight: 300;
        letter-spacing: 0.3px;
        text-align: center;
        color: $themeColor;
        text-align: center;
      }
    }
  }
</style>
<style lang="scss">
  @import '../../../../assets/scss/_base.scss';

  @include pc(1440px);
  @include pc(1280px);
  @include pc(1024px);
  @include pc(961px);
</style>


