<template>
  <div class="product-desc rich-text">
    <div v-html="response.description"></div>
    <vue-video :noHaveDiv="1"></vue-video>
  </div>
</template>
<script>
  import {VueVideo} from '../mobile/public';

  export default {
    props: ['response'],
    components: {VueVideo}
  };
</script>
<style lang="scss">
  @import '../../assets/scss/component/_richtext.scss';

  .product-desc div {
    padding: 0;
  }
</style>

