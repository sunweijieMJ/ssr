<template>
  <div class="module-desc rich-text">
    <div v-html="response"></div>
    <vue-video :noHaveDiv="1"></vue-video>
  </div>
</template>
<script>
  import {VueVideo} from '../mobile/public';
  import {couponInit} from '../../utils/business/init.js';

  export default {
    props: ['response'],
    components: {VueVideo},
    mounted() {
      this.$nextTick(() => {
        couponInit();
      });
    }
  };
</script>
<style lang="scss">
  @import '../../assets/scss/component/_richtext.scss';
</style>

