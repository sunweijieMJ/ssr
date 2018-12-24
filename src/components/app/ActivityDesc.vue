<template>
  <div class="activity-desc rich-text">
    <div v-html="response.activity_description"></div>
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

  .activity-desc {
    padding: 0.3rem 0;
  }
</style>

