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
      <div class="info">
        <div class="info-desc">
          <h3>{{product_info.basic.title}}</h3>
          <p class="info-subtitle" v-if="product_info.basic.highlight">{{product_info.basic.highlight}}</p>
          <p class="info-price">
            <i>¥</i><span>{{Math.round(product_info.optionsMinPrice / 100)}}</span>
            <span v-if="product_info.optionsMinPrice !== product_info.optionsMaxPrice">{{-Math.round(product_info.optionsMaxPrice / 100)}}</span>
          </p>
        </div>
        <div class="collect" @click="intercept">
          <i class="iconfont icon-personal_ic_save"></i>
          <span>收藏</span>
        </div>
      </div>
      <div class="info-show">
        <span>愉悦度 {{product_info.joyful.value}}</span>
        <span>{{product_info.joyful.buyers_count}} 次购买</span>
        <span>{{product_info.joyful.shares_count}} 条体验秀</span>
      </div>
    </div>
    <section>
      <div class="goods-btn" @click="$store.dispatch('product_detail/changeSkuPopup', {status: true, type: 1})">
        <div class="btn-title">
          <h4>规格</h4>
          <p>
            <span v-if="currentType.length !== 1">{{product_info.options.length}} 种款式可选</span>
            <template v-else>
              已选规格 <span v-for="(val,index) in currentType[0]" :key="index">{{val}}</span>
            </template>
          </p>
        </div>
        <i class="iconfont icon-shopping_next"></i>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';
  import {VueSwiper} from '../../../../../components/mobile/public';


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
    mounted() {
      this.checkTitleOH();
    },
    methods: {
      // swiper回调函数
      listenIndex(data){
        this.currentIndex = data;
      },
      // 监听播放状态
      handlePlay(data) {
        this.playing = data;
      },
      // 检测h3高度
      checkTitleOH() {
        const title = this.$el.querySelector('.info-desc h3');
        const price = this.$el.querySelector('.collect .iconfont');
        if(title.offsetHeight > price.offsetHeight) {
          title.classList.add('multi-line');
        }
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
        pointer-events: none;
        border-radius: 0.3rem;
        background-color: rgba(0,0,0,0.3);
        font-size: 0.2rem;
        color: #fff;
      }
    }
    .goods-info{
      padding: 0 0.3rem 0.3rem;
      margin-bottom: 0.2rem;
      background-color: #fff;
      .info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.4rem;
        .info-desc {
          h3 {
            margin-top: 0.4rem;
            max-width: 5.8rem;
            font-size: 0.44rem;
            font-weight: 400;
            line-height: 100%;
            color: $themeColor;
            &.multi-line {
              margin-top: 0.29rem;
              line-height: 130%;
            }
          }
          .info-subtitle {
            @include tofl(5.9rem);
            margin-top: 0.16rem;
            font-size: 0.28rem;
            line-height: 0.28rem;
            color: $themeColor;
          }
          .info-price {
            display: flex;
            align-items: center;
            margin-top: 0.32rem;
            line-height: 0.4rem;
            color: $mallRed;
            span {
              font-size: 0.4rem;
              font-weight: 400;
            }
            i {
              font-size: 0.32rem;
              font-style: normal;
            }
          }
        }
        .collect {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          width: 0.86rem;
          height: 0.84rem;
          margin-top: 0.4rem;
          border-left: 0.01rem solid $borderColor;
          i {
            width: 0.48rem;
            font-size: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: $subColor;
          }
          span {
            font-size: 0.24rem;
            line-height: 0.24rem;
            color: $themeColor;
          }
        }
      }
      .info-show {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 0.26rem;
          line-height: 0.26rem;
          color: $subColor;
        }
      }
    }
    section {
      background-color: #fff;
      .goods-btn{
        padding: 0.4rem 0;
        margin: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.01rem solid $borderColor;
        &:last-child {
          border-bottom: none;
        }
        .btn-title {
          display: flex;
          h4 {
            margin-right: 0.4rem;
            font-size: 0.3rem;
            font-weight: 400;
            color: $themeColor;
          }
          p {
            font-size: 0.3rem;
            color: $themeColor;
            span {
              margin-right: 0.1rem;
            }
            i {
              font-style: normal;
              color: $mallRed;
            }
          }
        }
        .icon-shopping_next {
          font-size: 12px;
          color: rgba(106,106,106,1);
          line-height: 0.3rem;
        }
      }
    }
  }
</style>
