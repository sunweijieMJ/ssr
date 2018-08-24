<template>
  <div class="product">
    <LaneHubHeader></LaneHubHeader>
    <Banner :banner="productData.mobile.banner_msg"></Banner>
    <ImageText :imageText="productData.mobile.image_text"></ImageText>
    <DownLoad></DownLoad>
    <LaneHubFooter></LaneHubFooter>
  </div>
</template>
<script>
import LaneHubHeader from '../../../components/mobile/official/LaneHubHeader';
import ImageText from '../../../components/mobile/official/ImageText';
import Banner from '../../../components/mobile/official/Banner';
import DownLoad from '../../../components/mobile/official/DownLoad';
import LaneHubFooter from '../../../components/mobile/official/LaneHubFooter';
import productData from '../../../store/official/productData.js';

export default {
  title() {
    return 'Lanehub - 瓴里商品';
  },
  meta() {
    return `<meta name="description" content="Lane hub 瓴里商品">
    <meta name="keywords" content="lanehub-product">`;
  },
  asyncData({store}) {
    store.registerModule('productData', productData);
  },
  components: {
    LaneHubHeader, Banner, ImageText, DownLoad, LaneHubFooter
  },
  computed: {
    productData() {
      return this.$store.state.productData;
    }
  }
};
</script>

