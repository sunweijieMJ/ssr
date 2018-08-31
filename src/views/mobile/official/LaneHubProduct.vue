<template>
  <div class="product">
    <template v-if="$route.path === '/lanehub_product'">
      <life-style></life-style>
    </template>
    <template v-else>
      <LaneHubHeader></LaneHubHeader>
    </template>
    <Banner :banner="productData.mobile.banner_msg"></Banner>
    <ImageText :imageText="productData.mobile.image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
  import {LifeStyle} from '../../../components/mobile/business';
  import {LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter} from '../../../components/mobile/official';
  import productData from '../../../store/official/productData.js';

  export default {
    title() {
      return 'Lanehub - 瓴里商品';
    },
    meta() {
      return `<meta name="description" content="Lane hub 瓴里商品">
      <meta name="keywords" content="lanehub-瓴里商品">`;
    },
    asyncData({store}) {
      store.registerModule('productData', productData);
    },
    mounted() {
      this.$store.registerModule('productData', productData);
    },
    components: {
      LifeStyle, LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
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

