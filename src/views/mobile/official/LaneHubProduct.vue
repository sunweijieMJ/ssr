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
      return 'Lanehub 瓴里生活 JoyFull LifeStyle - 瓴里产品';
    },
    meta() {
      return `<meta name="description" content="LANEHUB 瓴里，创造愉悦生活方式的用户品牌。通过匠心品质的家具家居产品，极致的>    线上线下体验，和懂生活、有品位、爱分享的朋友们，共同创造更美好的生活。">
      <meta name="keywords" content="LANEHUB, 瓴里, 瓴里生活, LANEHUB Lifestyle, 家具, 家居, 新零售, 生活方式 - 瓴里产品">`;
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
<style lang="scss" scoped>
  .product {
    background-color: #fff;
  }
</style>
