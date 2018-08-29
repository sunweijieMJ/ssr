<template>
  <div class="product-service">
    <div class="title">
      <h3>相关服务</h3>
      <p>查看全部服务<img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt=""></p>
    </div>
    <div class="content">
      <h4>服务保障</h4>
      <p>{{product_info.service.return_policy.title}}</p>
      <p>{{product_info.service.postage.title}}</p>
    </div>
    <div class="content">
      <h4>联系我们</h4>
      <p>热线电话：{{product_info.service.contact.hotline}}</p>
      <p>服务时间：{{product_info.service.contact.service_hours}}</p>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-service{
    padding: 0.3rem 0.3rem 0.4rem;
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.3rem;
      h3{
        font-size: 0.32rem;
        font-weight: 300;
        color: $themeColor;
      }
      p{
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        font-weight: 300;
        color: $subColor;
      }
      img{
        width: 0.12rem;
        margin-left: 0.2rem;
      }
    }
    .content{
      margin-bottom: 0.2rem;
      &:last-child{
        margin-bottom: 0;
      }
      h4{
        font-size: 0.3rem;
        font-weight: 300;
        line-height: 0.43rem;
        letter-spacing: 0.6px;
        color: $themeColor;
      }
      p{
        font-size: 0.28rem;
        font-weight: 300;
        line-height: 0.43rem;
        letter-spacing: 0.6px;
        color: $themeColor;
      }
    }
  }
</style>
