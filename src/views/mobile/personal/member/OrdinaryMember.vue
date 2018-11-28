<template>
  <div class="ordinary">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-Graphics_CustomIc3"></use>
      </svg>
      <span>现金购物返 5% 积分</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OrdinaryMember',
  data(){
    return {

    };
  },
  title() {
    return '普通会员';
  },
  meta() {
    return `<meta name="description" content="普通会员">
    <meta name="keywords" content="普通会员">`;
  }
};
</script>
<style lang="scss" scoped>
.ordinary{
  padding: 0.38rem 0.44rem;
  .item{
    font-size:0.34rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(34,34,34,1);
    line-height:1;
    display: flex;
    align-items: center;
    span{
      margin-left: 0.44rem;
    }
  }
  .icon {
    font-size: 0.46rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}

</style>
