<template>
  <div class="product-info" v-if="product_info.basic">
    <div class="goods-banner">
      <vue-swiper
        :withVideo="video"
        :autoplay="false"
        :images="product_info.basic.headimgs.length ? product_info.basic.headimgs : [product_info.basic.list_headimg]"
        :type="6" :index="0"
        @to-parent="listenIndex"
        @handlePlay="handlePlay">
      </vue-swiper>
      <span v-show="!(playing && video.index === currentIndex)" v-if="product_info.basic.headimgs.length > 1">{{currentIndex + 1}}/{{product_info.basic.headimgs.length}}</span>
    </div>
    <div class="goods-info">
      <h3>{{product_info.basic.title}}</h3>
      <p class="info-desc" v-if="product_info.basic.highlight">{{product_info.basic.highlight}}</p>
      <div class="info-num">
        <div class="num-L">
          <p class="info-price">
            <i>¥</i><span>{{Math.round(product_info.optionsMinPrice / 100)}}</span>
            <span v-if="product_info.optionsMinPrice !== product_info.optionsMaxPrice">{{-Math.round(product_info.optionsMaxPrice / 100)}}</span>
          </p>
          <p class="info-show">{{product_info.joyful.buyers_count}} 次购买，愉悦度 {{product_info.joyful.value}}</p>
        </div>
        <div class="num-R" @click="intercept">
          <i class="iconfont icon-personal_ic_save"></i>
          <span>收藏</span>
        </div>
      </div>
    </div>
    <div class="goods-btn" @click="$store.dispatch('product_detail/changeSkuPopup', {status: true, type: 1})">
      <span v-if="currentType.length !== 1">选择规格</span>
      <p v-if="currentType.length === 1">
        <span>已选规格</span>
        <span v-for="(val,index) in currentType[0]" :key="index">{{val}}</span>
      </p>
      <i class="iconfont icon-shopping_next"></i>
      <p v-if="0">
        <img v-if="currentType.length === 1" :src="currentSku[0].optionImgs[0]" alt="">
        <img v-else v-for="(item,index) in product_info.options.slice(0,4)" :key="index" :src="item.optionImgs[0]" alt="">
        <i class="iconfont icon-shopping_next"></i>
      </p>
    </div>
    <div class="goods-btn" @click="$store.dispatch('product_detail/cutToParams', true)">
      <span>查看参数</span>
      <i class="iconfont icon-shopping_next"></i>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';
  import {VueSwiper} from '../../../../../components/mobile/business';


  export default {
    mixins: [frequent],
    props: ['currentType', 'currentSku'],
    components: {VueSwiper},
    data() {
      return {
        currentIndex: 0,
        playing: false
      };
    },
    methods: {
      // swiper回调函数
      listenIndex(data){
        this.currentIndex = data;
      },
      handlePlay(data) {
        this.playing = data;
      }
    },
    computed: {
      video() {
        return {
          status: this.product_info.basic.video_infos && this.product_info.basic.video_infos.length ? true : false,
          index: 0,
          poster: this.product_info.basic.headimgs.length ? this.product_info.basic.headimgs[0] : this.product_info.basic.list_headimg,
          sources: {
            video_url: this.product_info.basic.video_infos && this.product_info.basic.video_infos.length ? this.product_info.basic.video_infos[0].url_video_900 : '',
            width: '750px',
            height: '750px'
          }
        };
      },
      ...mapState({
        product_info: (store) => store.product_detail.product_info
      })
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .product-info{
    margin-bottom: 0.2rem;
    background-color: #fff;
    .goods-banner {
      position: relative;
      height: 7.5rem;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0.3rem;bottom: 0.3rem;
        width: 0.64rem;
        height: 0.32rem;
        border-radius: 0.3rem;
        background-color: rgba(0,0,0,0.3);
        font-size: 0.2rem;
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
      .info-num {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.3rem;
        .num-L .info-price {
          font-size: 0.42rem;
          font-weight: 400;
          line-height: 0.42rem;
          color: $mallRed;
          margin-bottom: 0.2rem;
          i {
            font-size: 0.32rem;
            font-style: normal;
          }
        }
        .num-L .info-show {
          font-size: 0.28rem;
          line-height: 0.28rem;
          color: $themeColor;
        }
        .num-R {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 0.84rem;
          padding-right: 0.13rem;
          &::before {
            position: absolute;
            left: -0.4rem; top: 0.03rem;
            width: 1px;
            height: 0.78rem;
            content: '';
            background-color: $borderColor;
          }
          i {
            font-size: 0.5rem;
            line-height: 0.5rem;
            color: $subColor;
          }
          span {
            font-size: 0.24rem;
            line-height: 0.24rem;
            color: $themeColor;
          }
        }
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
        img {
          height: 0.48rem;
          margin-right: 0.16rem;
        }
        span{
          margin-right: 0.1rem;
        }
      }
      span{
        font-size: 0.3rem;
        line-height: 0.3rem;
        color: $themeColor;
      }
      .icon-shopping_next {
        font-size: 12px;
        color: rgba(106,106,106,1);
        line-height: 0.3rem;
      }
    }
  }
</style>
