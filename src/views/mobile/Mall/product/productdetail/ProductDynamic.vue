<template>
  <div class="product-dynamic">
    <div class="title">
      <div class="title-L">
        <p>愉悦度</p>
        <p>
          <img src="../../../../../../static/mobile/svg/product/detail_lb_happiness_48h5.svg" alt="">
          <i>{{product_info.joyful.value}}</i>
        </p>
      </div>
      <div class="title-M">
        <p>{{product_info.joyful.title}}</p>
        <p v-if="product_info.joyful.show_status">
          <img :src="item.avatar" v-for="(item,index) in product_info.joyful.buyers" :key="index" alt="">
        </p>
        <p v-if="!product_info.joyful.show_status">{{product_info.joyful.subtitle}}</p>
      </div>
      <img src="../../../../../../static/mobile/svg/common/shopping_next.svg" alt="">
    </div>
    <public-list :listData="product_info.dynamics"></public-list>
    <div class="read-more" v-if="product_info.joyful && product_info.joyful.shares_count > 3">
      <a href="javascript:;">查看 {{product_info.joyful.shares_count}} 条体验秀</a>
    </div>
  </div>
</template>
<script>
  import {PublicList} from '../../../../../components/mobile/business';
  import {mapState} from 'vuex';

  export default {
    components: {PublicList},
    computed: {
      ...mapState({
        product_info: (store) => store.product_detail.product_info
      })
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-dynamic{
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    .title{
      padding: 0 0.3rem;
      height: 1.58rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      .title-L {
        width: 1.6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p{
          display: flex;
          align-items: center;
          height: 0.5rem;
          font-size: 0.28rem;
          font-weight: 300;
          color: $themeColor;
          text-align: center;
          img{
            width: 0.48rem;
            margin-right: 0.05rem;
          }
          i{
            font-style: normal;
            font-size: 0.32rem;
            color: $mallRed;
          }
        }
      }
      .title-M {
        flex: 1;
        padding-left: 0.24rem;
        border-left: 0.01rem solid $borderColor;
        p{
          font-size: 0.28rem;
          font-weight: 300;
          color: $themeColor;
          &:first-child{
            margin-bottom: 0.2rem;
          }
          img{
            float: left;
            width: 0.46rem;
            border-radius: 50%;
            margin-right: 0.08rem;
            &:last-child{
              margin-right: 0 none;
            }
          }
        }
      }
      img{
        width: 0.12rem;
      }
    }
    .read-more{
      display: flex;
      justify-content: center;
      align-items: center;
      height:1.08rem;
      a {
        font-size: 0.28rem;
        font-family: Helvetica;
        font-weight: 300;
        color: $cambridgeBlue;
      }
    }
  }
</style>

