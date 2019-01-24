<template>
  <product-desc :response="description"></product-desc>
</template>
<script>
  import {mapState} from 'vuex';
  import {couponInit} from '../../../utils/business/init.js';
  import product_desc from '../../../store/app/product_desc.js';
  import ProductDesc from '../../../components/app/ProductDesc';


  export default {
    components: {ProductDesc},
    title() {
      return 'Lanehub - 商品详情模块';
    },
    meta() {
      return `<meta name="description" content="Lanehub 商品详情模块">
              <meta name="keywords" content="瓴里, 商品详情模块">`;
    },
    asyncData({store, route}) {
      store.registerModule('product_desc', product_desc);
      return Promise.all([store.dispatch('product_desc/getProductDesc', route.params.id)]);
    },
    mounted() {
      this.$nextTick(() => {
        couponInit();
      });
    },
    destroyed() {
      this.$store.unregisterModule('product_desc', product_desc);
    },
    computed: mapState({
      description: (store) => store.product_desc.description
    })
  };
</script>

