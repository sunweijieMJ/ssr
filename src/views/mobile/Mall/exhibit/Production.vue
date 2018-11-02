<template>
  <div class="product-list">
    <ul>
      <li v-for="(a, index) in 7" :key="index">
        <img src="https://p0.ssl.qhimgs4.com/dmfd/125_71_/t01614c7117394c2bc6.jpg?size=506x305" alt="">
        <p class="title">标题</p>
        <p class="name">品牌名</p>
        <p class="val"><span class="symbol">￥</span><span>1566</span></p>
        <div class="min">
          <span class="tag" v-for="(a, aindex) in 3" :key="aindex">新品</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Production',
  props: ['product_list'],
  data(){
    return {

    };
  }
};
</script>
<style lang="scss" scoped>
.product-list{
  padding:1.18rem 0.3rem 0 0.3rem;
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 3.3rem;
      margin-bottom: 0.34rem;
      color: var(--greyish-brown);
      img{
        height: 3.3rem;
        width: 3.3rem;
      }
      p,span{
        line-height: 1;
      }
      .title{
        font-size: 0.26rem;
        margin-top: 0.22rem;
      }
      .name{
        font-size: 0.28rem;
        margin-top: 0.1rem;
        margin-bottom: 0.16rem;
      }
      .val{
        font-size: 0.24rem;
        color: #d60a07;
        .symbol{
          font-weight: 400;
        }
      }
      .min{
        position: relative;
        line-height: 0.24rem;
        margin-top: 0.16rem;
      }
      .tag{
        color: #4974a2;
        font-size: 0.24rem;
        font-weight: 300;
        line-height: 0.24rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        &:first-of-type{
          padding-left: 0;
        }
        &:before{
          content: "|";
          position: absolute;
          line-height: 0.24rem;
          margin-left: -0.13rem;
        }
        &:first-of-type:before{
          content: "";
        }
      }
    }
  }
}
</style>
