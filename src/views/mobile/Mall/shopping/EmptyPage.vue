<template>
  <div class="box">
    <div class="title">没有找到符合条件的商品</div>
    <div class="button" @click="goShopList">全部商品</div>
  </div>
</template>
<script>
export default {
  name: 'emptypage',
  methods: {
    goShopList(){
      console.log('全部商品')
      this.$router.push({name: 'ShopList'});
      // this.$emit('FromEmptyPage', true);
    }
  }
};
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: calc(100vh - 0.88rem);
  background-color: #f5f5f5;
  text-align: center;
  .title{
    padding-top: 2.6rem;
    color: #777777;
    font-size: 0.32rem;
    letter-spacing: 0.2px;
  }
  .button{
    // width: 1.56rem;
    display: inline-block;
    margin: auto;
    margin-top: 0.4rem;
    padding: 0.17rem 0.18rem;
    border-radius: 0.3rem;
    border: solid 1px #0072dd;
    color: #0072dd;
    font-size: 0.28rem;
    line-height: 0.28rem;
  }
}
</style>
