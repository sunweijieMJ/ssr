<template>
    <!--<div v-html="productDetail.description"></div>-->
    <product-detail-component :response="productDetail"></product-detail-component>
</template>
<script>
import productModule from '../../../store/product/product';
import productDetailComponent from '../../../components/common/product/productDetail';

const product = 'product';
export default {
  components: {productDetailComponent},
  title() {
    return 'Lanehub - 商品详情模块';
  },
  meta() {
    return `<meta name="description" content="Lanehub 商品详情模块">
    <meta name="keywords" content="瓴里, 商品详情模块">`;
  },
  asyncData({store, route}) {
    console.log("start asyncData");
    store.registerModule(product, productModule);
    return Promise.all([
      store.dispatch(product+'/getProduct', route.params.id)
    ]);
  },
  destroyed () {
    this.$store.unregisterModule(product);
  },
  computed: {
    productDetail() {
      return this.$store.state.product.productabc;
    }
  }
};
</script>
<style lang="scss">
html {
  font-size: 10px;
}
a {
    text-decoration: none;
    color: #1980CE;
}
.contain {
  padding: 0 15px;
  word-wrap: break-word;
  font-size:1.5rem;
  p {
    margin-bottom: 30px;
    font-weight: 300;
    line-height: 220%;
    text-align: justify;
  }
  h2, h3, h4 {
    font-weight: 300 !important;
  }
  h2 {
    font-size: 1.7rem;
    line-height: 220%;
    padding:16px 0 6px 0;
  }
  h3 {
    font-size: 1.7rem;
    line-height: 220%;
    padding:16px 0 6px 0;
  }
  h4 {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    margin-top: -0.75rem;
    line-height:150%;
    color:#999;
  }
  .customvideo {
    padding: 0rem 1.5rem;
    margin-bottom: 1.5rem;
  }
  img {
    display: block;
    padding-bottom: 11px;
    width: 100%;
    border: none;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
}

</style>

