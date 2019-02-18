<template>
  <div class="relevant" v-if="product_info.content.relevant_content.length">
    <h4>相关内容</h4>
    <image-text :imgText="product_info.content.relevant_content"></image-text>
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

  .relevant {
    padding: 0.4rem 0.3rem 0.1rem;
    margin: 0.2rem 0;
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


