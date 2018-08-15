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
import LaneHubHeader from '../../components/mobile/public/LaneHubHeader';
import ImageText from '../../components/mobile/public/ImageText';
import Banner from '../../components/mobile/public/Banner';
import DownLoad from '../../components/mobile/public/DownLoad';
import LaneHubFooter from '../../components/mobile/public/LaneHubFooter';

export default {
  title() {
    return 'Lanehub - 瓴里商品';
  },
  meta() {
    return `<meta name="description" content="Lane hub 瓴里商品">
    <meta name="keywords" content="lanehub-product">`;
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

