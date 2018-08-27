<template>
  <footer :style="{borderTop:border_top}">
    <p>&copy;2018 LANEHUB<span>·沪ICP备17049047号</span></p>
  </footer>
</template>
<script>
  export default {
    data(){
      return {
        border_top: 'none'
      };
    },
    created(){
      if(this.$route.name === 'Home') this.border_top = '1px solid #e5e5e5';
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  footer{
    @include boxSize(100%, 0.4rem);
    @include distance(0, (0.6rem 0));
    p{
      @include fontStyle(0.24rem, 500);
      span{
        @include fontStyle(0.24rem, 100, #777);
      }
    }
  }
</style>

