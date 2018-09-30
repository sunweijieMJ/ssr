<template>
  <div class="product website">
      <Banner :banner="productData.web.banner_msg"></Banner>
      <ImageText :imageText="productData.web.image_text"></ImageText>
      <DownLoad></DownLoad>
      <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import {Banner, ImageText, DownLoad, LaneHubFooter} from '../../components/web/public';
  import productData from '../../store/official/productData.js';

  export default {
    title() {
      return 'Lanehub - 瓴里商品';
    },
    meta() {
      return `<meta name="description" content="Lanehub 瓴里商品">
      <meta name="keywords" content="lanehub-product">`;
    },
    asyncData({store}) {
      store.registerModule('productData', productData);
    },
    mounted() {
      this.$store.registerModule('productData', productData);
    },
    components: {
      ImageText, Banner, DownLoad, LaneHubFooter
    },
    computed: {
      productData() {
        return this.$store.state.productData;
      }
    },
    destroyed() {
      this.$store.unregisterModule('productData', productData);
    }
  };
</script>
