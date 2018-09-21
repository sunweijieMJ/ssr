<template>
  <div class="product-detail XXcontainer" v-if="!cut_out" :class="sold_out ?  'sold-out' : ''">
    <life-style></life-style>
    <div v-if="!sold_out && product_info">
      <product-info :currentType="currentType" :currentSku="currentSku"></product-info>
      <product-dynamic></product-dynamic>
      <div class="desc-title" v-if="product_detail.description">
        <h4 v-if="product_info.joyful.shares_count">商品详情</h4>
        <description :response="product_detail"></description>
      </div>
      <!-- <product-params></product-params> -->
      <!-- <product-service></product-service> -->
      <majordomo></majordomo>
      <product-btn></product-btn>
      <sku-select @to-parent="getCurrentSku" @to-skuResult="getCurrentType"></sku-select>
    </div>
    <div v-else class="sold-out">
      <i class="iconfont icon-product_lb_error"></i>
      <p>商品已下架</p>
    </div>
  </div>
  <div v-else>
    <component :is="SpecParams"></component>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat';
  import titleFilter from '../../../../utils/filters/titleFilter.js';
  import product from '../../../../store/product/product.js';
  import product_detail from '../../../../store/mall/product_detail.js';
  import SpecParams from './SpecParams.vue';
  import Description from '../../../../components/common/product/productDetail.vue';
  import {LifeStyle, Majordomo} from '../../../../components/mobile/business';
  import {ProductInfo, ProductDynamic, ProductParams, ProductService, ProductBtn, SkuSelect} from './productdetail/index.js';

  export default {
    title() {
      return `${this.product_info.basic ? this.product_info.basic.title : '商品详情'}`;
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
        store.dispatch('product_detail/getDetail_with_basic', id),
        store.dispatch('product_detail/getDetail_with_joyful', id),
        store.dispatch('product_detail/getDetail_with_specs', id),
        store.dispatch('product_detail/getDetail_with_params', id),
        store.dispatch('product_detail/getDetail_with_options', id),
        store.dispatch('product_detail/getDetail_with_dynamics', id),
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
        SpecParams, // ETC 商品描述组件
        currentSku: [], // ETC 当前选中的sku
        currentType: [] // ETC 当前选择sku的类型
      };
    },
    mounted(){
      let that = this;
      that.$store.registerModule('product', product, {preserveState: true});
      that.$store.registerModule('product_detail', product_detail, {preserveState: true});

      // 微信分享
      if(!that.product_info.basic) return;
      const link = window.location.href;
      const title = that.product_info.basic.title;
      const desc = that.product_info.dynamics[0] ? titleFilter(that.product_info.dynamics[0].entity_brief) : '';
      const imgUrl = that.product_info.basic.list_headimg;
      that.wxInit(link, title, desc, imgUrl);
    },
    methods: {
      // 监听子组件事件
      getCurrentSku(data){
        this.currentSku = data;
      },
      // 选择sku
      getCurrentType(data){
        this.currentType = data;
      }
    },
    destroyed() {
      let that = this;
      that.$store.unregisterModule('product', product);
      that.$store.unregisterModule('product_detail', product_detail);
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
    margin-bottom: 1.28rem;
    background-color: $intervalColor;
    .detail_contain {
      margin-bottom: 0.2rem;
    }
    .desc-title {
      h4 {
        position: relative;
        height: 0.74rem;
        background-color: $intervalColor;
        font-size: 0.26rem;
        font-weight: 300;
        line-height: 0.74rem;
        text-align: center;
        color: #999;
        &::before {
          position: absolute;
          top: 0.37rem;
          transform: translateX(-120%);
          content: '';
          width: 1rem;
          height: 1px;
          background-color: $borderColor;
        }
        &::after {
          position: absolute;
          top: 0.37rem;
          transform: translateX(20%);
          content: '';
          width: 1rem;
          height: 1px;
          background-color: $borderColor;
        }
      }
    }
    &.sold-out {
      background-color: #fff;
    }
    .sold-out{
      padding-top: 1.1rem;
      text-align: center;
      i {
        font-size: 1.6rem;
        color: #d4d4d4;
      }
      p{
        margin-top: 0.2rem;
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


