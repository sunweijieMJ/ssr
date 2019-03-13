<template>
  <div class="discount-module">
    <public-title :pageTitle="'瓴里新品专区'"></public-title>
    <vue-swiper :images="['https://pic2.lanehub.cn/production/7467c39a2538cd0f722d5bc5e7a8244b.jpg?x-oss-process=style/m-00007']"></vue-swiper>
    <hot-module-list :list="3"></hot-module-list>
  </div>
</template>
<script>
  import {VueSwiper} from '../../../../components/mobile/public';
  import {PublicTitle, HotModuleList} from '../../../../components/mobile/business';

  export default {
    title() {
      return '瓴里新品专区';
    },
    meta() {
      return `<meta name="description" content="瓴里新品专区">
      <meta name="keywords" content="瓴里新品专区">`;
    },
    components: {
      PublicTitle, VueSwiper, HotModuleList
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';
</style>

