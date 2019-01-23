<template>
  <div class="article-desc rich-text">
    <div v-html="response"></div>
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
</style>

