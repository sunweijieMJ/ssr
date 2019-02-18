<template>
  <div class="recomment" v-if="product_info.content.recommend_read.lengths">
    <h4>推荐内容</h4>
    <image-text :imgText="product_info.content.recommend_read"></image-text>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import ImageText from './ImageText.vue';
  import imageSize from '../../../../../utils/filters/imageSize.js';

  export default {
    components: {ImageText},
    data() {
      return {
        imageSize
      };
    },
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .recomment {
    padding: 0.4rem 0.3rem 0.1rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
    h4 {
      margin-bottom: 0.1rem;
      font-size: 0.34rem;
      font-weight: 400;
      line-height: 1;
      color: $themeColor;
    }
  }
</style>


