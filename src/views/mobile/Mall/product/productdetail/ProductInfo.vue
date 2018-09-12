<template>
  <div class="product-info">
    <div class="goods-banner" v-if="product_info.basic.headimgs && product_info.basic.headimgs.length">
      <vue-swiper
        :autoplay="true"
        :images="product_info.basic.headimgs"
        :type="6" :index="0"
        @to-parent="listenIndex">
      </vue-swiper>
      <span v-if="product_info.basic.headimgs.length > 1">{{currentIndex + 1}}/{{product_info.basic.headimgs.length}}</span>
    </div>
    <div class="goods-info">
      <h3>{{product_info.basic.title}}</h3>
      <p class="info-desc" v-if="product_info.basic.highlight">{{product_info.basic.highlight}}</p>
      <p class="info-price">
        <i>¥</i>
        <span>{{Math.round(product_info.optionsMinPrice / 100)}}</span>
        <span v-if="product_info.optionsMinPrice !== product_info.optionsMaxPrice">{{-Math.round(product_info.optionsMaxPrice / 100)}}</span>
      </p>
      <p class="info-show">{{product_info.joyful.buyers_count}} 次购买，愉悦度 {{product_info.joyful.value}}</p>
    </div>
    <div class="goods-btn" @click="$store.dispatch('product_detail/changeSkuPopup', {status: true, type: 1})">
      <span v-if="currentType.length !== 1">选择规格</span>
      <p v-if="currentType.length === 1">
        <span>已选规格</span>
        <span v-for="(val,index) in currentType[0]" :key="index">{{val}}</span>
      </p>
      <i class="iconfont icon-shopping_next"></i>
    </div>
    <div class="goods-btn" @click="$store.dispatch('product_detail/cutToParams', true)">
      <span>查看参数</span>
      <i class="iconfont icon-shopping_next"></i>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {VueSwiper} from '../../../../../components/mobile/business';
  import frequent from '../../../../../mixins/frequent.js';

  export default {
    mixins: [frequent],
    props: ['currentType'],
    components: {VueSwiper},
    data() {
      return {
        currentIndex: 0
      };
    },
    methods: {
      // swiper回调函数
      listenIndex(data){
        this.currentIndex = data;
      }
    },
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-info{
    background-color: #fff;
    margin-bottom: 0.2rem;
    .goods-banner {
      position: relative;
      height: 7.5rem;
      span {
        position: absolute;
        right: 0.2rem;bottom: 0.2rem;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        background-color: rgba(0,0,0,0.3);
        font-size: 0.2rem;
        line-height: 0.6rem;
        text-align: center;
        color: #fff;
      }
    }
    .goods-info{
      padding: 0.28rem 0.3rem 0.4rem;
      h3 {
        margin-bottom: 0.04rem;
        font-size: 0.48rem;
        font-weight: 400;
        line-height: 0.72rem;
        color: $themeColor;
      }
      .info-desc {
        @include tofl(6.9rem);
        font-size: 0.28rem;
        line-height: 0.28rem;
        color: $subColor;
      }
      .info-price {
        font-size: 0.42rem;
        font-weight: 400;
        line-height: 0.42rem;
        color: $mallRed;
        margin: 0.3rem 0 0.2rem;
        i {
          font-size: 0.32rem;
          font-style: normal;
        }
      }
      .info-show {
        font-size: 0.28rem;
        line-height: 0.28rem;
        color: $themeColor;
      }
    }
    .goods-btn{
      padding: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.01rem solid $borderColor;
      p{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 0.3rem;
        span{
          margin-right: 0.1rem;
        }
      }
      span{
        font-size: 0.3rem;
        line-height: 0.3rem;
        color: $themeColor;
      }
      i {
        font-size: 12px;
        color: rgba(106,106,106,1);
        line-height: 0.3rem;
      }
    }
  }
</style>
