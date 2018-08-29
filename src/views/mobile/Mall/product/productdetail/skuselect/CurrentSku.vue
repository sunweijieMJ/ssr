<template>
  <div class="current" v-if="currentSku.length">
    <img :src="currentSku.length>0?currentSku[0].optionImgs[0]:'' | imageSize('330x330')" alt="">
  </div>
</template>
<script>
  export default {
    props: ['currentSku']
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../../assets/scss/_base.scss';

  .current{
    padding: 0.5rem 0;
    position: relative;
    >img{
      width: 3.3rem;
      margin: auto;
      border-radius: 0.04rem;
    }
  }
</style>
