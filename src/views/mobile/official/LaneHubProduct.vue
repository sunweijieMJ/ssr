<template>
  <div class="product">
    <template v-if="$route.path === '/Description/lanehub_product'">
      <life-style></life-style>
    </template>
    <template v-else>
      <laneHub-header></laneHub-header>
    </template>
    <banner :banner="productData.mobile.banner_msg"></banner>
    <image-text :imageText="productData.mobile.image_text"></image-text>
    <downLoad></downLoad>
    <laneHub-footer></laneHub-footer>
  </div>
</template>
<script>
  import productData from '../../../store/official/productData.js';
  import {LifeStyle} from '../../../components/mobile/business';
  import {LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter} from '../../../components/mobile/official';

  export default {
    title() {
      return 'Lanehub - 瓴里商品';
    },
    meta() {
      return `<meta name="description" content="Lanehub 瓴里商品">
      <meta name="keywords" content="瓴里商品">`;
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

