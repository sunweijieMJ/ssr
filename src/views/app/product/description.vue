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
a {
    text-decoration: none;
    color: #1980CE;
}

</style>

