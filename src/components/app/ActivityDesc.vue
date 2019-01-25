<template>
  <div class="activity-desc rich-text" v-if="response">
    <div v-html="response.activity_description"></div>
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

  .activity-desc {
    padding: 0.3rem 0;
  }
</style>

