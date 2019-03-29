<template>
  <div class="product-info" v-if="product_info.basic">
    <div class="goods-banner">
      <vue-swiper
        :withVideo="video"
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
          <p class="highlight" v-if="product_info.basic.highlight">{{product_info.basic.highlight}}</p>
          <div class="price">
            <p class="current">
              <i>¥</i><span>{{product_info.optionsMinPrice | divide(100)}}</span>
              <span v-if="product_info.optionsMinPrice < product_info.optionsMaxPrice">-{{product_info.optionsMaxPrice | divide(100)}}</span>
            </p>
            <span v-if="product_info.adjust_reason" class="adjust">{{product_info.adjust_reason}}</span>
            <span v-if="product_info.extends.hot_rank" class="hot">{{product_info.extends.hot_rank}}</span>
          </div>
          <p class="through" v-if="product_info.optionsMinPrice !== product_info.marketMinPrice && product_info.optionsMaxPrice !== product_info.marketMaxPrice">
            <i>¥</i><span>{{product_info.marketMinPrice | divide(100)}}</span>
            <span v-if="product_info.marketMinPrice < product_info.marketMaxPrice">-{{product_info.marketMaxPrice | divide(100)}}</span>
          </p>
        </div>
        <div class="collect">
          <span>{{product_info.joyful.value}}</span>
          <span>愉悦度</span>
        </div>
      </div>
    </div>
    <section>
      <div class="goods-btn" @click="queryAssign('product/brand', {product_id: product_info.basic.id, brand: product_info.basic.brand})">
        <h4>品牌</h4>
        <div class="content">
          <span>{{product_info.basic.brand}} {{product_info.basic.series}}</span>
          <i class="iconfont icon-shopping_next"></i>
        </div>
      </div>
      <div class="select-btn" @click="$store.dispatch('product_detail/changeSkuPopup', {status: true, type: 1})">
        <h4>规格</h4>
        <div class="content">
          <div class="spec">
            <span v-if="currentType.length !== 1">{{product_info.extends.spec_desc}}</span>
            <template v-else>
              已选规格 <span v-for="(val,index) in currentType[0]" :key="index">{{val}}</span>
            </template>
            <i class="iconfont icon-shopping_next"></i>
          </div>
          <div class="imgs" v-if="product_info.extends.spec_imgs && product_info.extends.spec_imgs.length">
            <img v-for="(val, i) in product_info.extends.spec_imgs" :key="i" :src="val | imageSize('80x80')" alt="">
          </div>
        </div>
      </div>
      <div v-if="product_info.basic.store_desc" class="goods-btn" @click="queryAssign('tools/amap',{name:product_info.basic.store.store_name, desc: product_info.basic.store_desc})">
        <h4>店铺</h4>
        <div class="content">
          <span>{{product_info.basic.store_desc}}</span>
          <i class="iconfont icon-shopping_next"></i>
        </div>
      </div>
      <div class="img-text">
        <a v-if="product_info.basic.product_banner" class="img" :href="product_info.basic.product_banner_link">
          <img :src="product_info.basic.product_banner | imageSize('690x0')" alt="">
        </a>
        <p class="text" v-if="product_info.extends.logi_desc && product_info.extends.logi_desc.length">
          <span v-for="(val, i) in product_info.extends.logi_desc" :key="i">{{val}}</span>
        </p>
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
    methods: {
      // swiper回调函数
      listenIndex(data){
        this.currentIndex = data;
      },
      // 监听播放状态
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
      padding-bottom: 0.4rem;
      margin-bottom: 0.2rem;
      background-color: #fff;
      .info {
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
        .info-desc {
          h3 {
            margin-top: 0.34rem;
            max-width: 5.8rem;
            font-size: 0.44rem;
            font-weight: 400;
            line-height: 0.56rem;
            color: $themeColor;
          }
          .highlight {
            max-width: 5.8rem;
            margin-top: 0.2rem;
            font-size: 0.28rem;
            line-height: 0.3rem;
            color: #004293;
          }
          .price {
            display: flex;
            align-items: flex-end;
            margin-top: 0.3rem;
            .current {
              display: flex;
              align-items: center;
              margin-right: 0.16rem;
              font-weight: 400;
              line-height: 1;
              color: #D60A07;
              i {
                font-size: 0.32rem;
                font-style: normal;
              }
              span {
                font-size: 0.48rem;
              }
            }
            .adjust {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              align-self: center;
              margin-right: 0.2rem;
              padding: 0.04rem;
              font-size: 0.22rem;
              font-weight: 400;
              line-height: 1;
              color: #fff;
              background-color: #D60A07;
            }
            .hot {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              align-self: center;
              padding: 0.04rem;
              font-size: 0.22rem;
              font-weight: 400;
              line-height: 1;
              color: #fff;
              background-color: #FF7542;
            }
          }
          .through {
            display: flex;
            align-items: center;
            line-height: 1;
            margin-top: 0.2rem;
            color: #999999;
            text-decoration: line-through;
            i {
              font-size: 0.26rem;
              font-style: normal;
            }
            span {
              font-size: 0.26rem;
            }
          }
        }
        .collect {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          height: 0.84rem;
          margin-top: 0.4rem;
          &::before {
            position: absolute;
            content: '';
            width: 0.01rem;
            height: 0.84rem;
            left: -0.12rem;
            background-color: $borderColor;
          }
          span {
            font-size: 0.22rem;
            line-height: 0.22rem;
            color: $themeColor;
            &:first-child {
              font-size: 0.28rem;
              font-weight: 500;
              line-height: 0.28rem;
              color: #D60A07;
            }
          }
        }
      }
    }
    section {
      background-color: #fff;
      .goods-btn {
        margin: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:last-of-type {
          .content {
            border-bottom: none;
          }
        }
        h4 {
          display: flex;
          align-items: center;
          height: 0.3rem;
          margin: 0.36rem 0.3rem 0.36rem 0;
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.3rem;
          color: $subColor;
        }
        .content {
          box-sizing: border-box;
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 1.02rem;
          padding: 0.36rem 0;
          border-bottom: 0.01rem solid $borderColor;
          span {
            height: 0.3rem;
            font-size: 0.3rem;
            line-height: 1;
            color: $themeColor;
          }
          .icon-shopping_next {
            font-size: 12px;
            color: rgba(106,106,106,1);
          }
        }
      }
      .select-btn {
        margin: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        &:last-of-type .content {
          border-bottom: none;
        }
        h4 {
          display: flex;
          align-items: center;
          height: 0.3rem;
          padding: 0.36rem 0.3rem 0.36rem 0;
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.3rem;
          color: $subColor;
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.36rem 0;
          border-bottom: 0.01rem solid $borderColor;
          .spec {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              @include tofl(5.5rem);
              height: 0.3rem;
              font-size: 0.3rem;
              line-height: 1;
              color: $themeColor;
            }
            .icon-shopping_next {
              font-size: 12px;
              color: rgba(106,106,106,1);
            }
          }
          .imgs {
            display: flex;
            align-items: center;
            margin-top: 0.3rem;
            img {
              width: 0.6rem;
              height: 0.6rem;
              border-radius: 0.04rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
      .img-text {
        .img {
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          display: flex;
          align-items: center;
          padding: 0.3rem;
          span {
            position: relative;
            height: 0.34rem;
            padding-left: 0.2rem;
            margin-right: 0.5rem;
            font-size: 0.24rem;
            color: $subColor;
            &:last-child {
              margin-right: 0;
            }
            &::after {
              position: absolute;
              content: '';
              top: 0.13rem;left: 0;
              width: 0.08rem;
              height: 0.08rem;
              border-radius: 50%;
              background-color: #D60A07;
            }
          }
        }
      }
    }
  }
</style>
