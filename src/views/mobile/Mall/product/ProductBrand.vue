<template>
  <div class="product-brand">
    <public-title :pageTitle="`${query.brand}`" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading">
      <shop-list :shopList="brand_list"></shop-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import product_brand from '../../../../store/mall/product_brand.js';
  import {PublicTitle, ShopList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return `${this.query.brand}`;
    },
    meta() {
      return `<meta name="description" content="商品品牌">
              <meta name="keywords" content="商品品牌">`;
    },
    asyncData({store, route}) {
      store.registerModule('product_brand', product_brand);
      return Promise.all([store.dispatch('product_brand/getProductBrand', route.query.product_id)]);
    },
    components: {PublicTitle, ShopList, Loading},
    mixins: [hidetitle],
    data() {
      return {
        query: this.$route.query
      };
    },
    mounted() {
      let that = this;
      that.$store.registerModule('product_brand', product_brand, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('product_brand', product_brand);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('product_brand/getProductBrand', that.query.product_id);
      }
    },
    computed: mapState({
      brand_list: (store) => store.product_brand.brand_list,
      loadInfo: (store) => store.product_brand.loadInfo,
      loading: (store) => store.product_brand.loadInfo.loading
    })
  };
</script>
