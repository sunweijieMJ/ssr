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
    }
  },
  created(){
    if(this.$route.name === 'Home') this.border_top = '1px solid #e5e5e5';
  }
}
</script>

<style lang="scss" scoped>
  footer{
    width: 7.5rem;
    height: 0.4rem;
    padding: 0.6rem 0;
    p{
      font-size: 0.24rem;
      text-align: center;
      span{
        font-size: 0.24rem;
        font-weight: 100;
        color: #777777;
      }
    }
  }
</style>

