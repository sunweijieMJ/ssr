<template>
  <div class="food-detail" :class="sold_out ?  'sold-out' : ''">
    <life-style :type="2"></life-style>
    <div v-if="!sold_out && food_info">
      <div class="food-info">
        <vue-swiper
          :images="food_info.basic.headimgs.length ? food_info.basic.headimgs : [food_info.basic.list_headimg]"
          :index="0">
        </vue-swiper>
        <div class="info-box">
          <h3>{{food_info.basic.title}}</h3>
          <p class="price">
            <i>¥</i>
            <span>{{food_info.optionsMinPrice / 100}}</span>
          </p>
          <p class="desc">{{food_info.basic.description}}</p>
          <div class="show">
            <span>愉悦度 {{food_info.joyful.value}}</span>
            <span>{{food_info.joyful.buyers_count}} 次购买</span>
            <span>{{food_info.joyful.shares_count}} 条体验秀</span>
          </div>
        </div>
      </div>
      <div class="food-show">
        <div class="show-title">
          <h4>{{`体验秀 (${food_info.joyful.shares_count})`}}</h4>
          <p v-if="food_info.joyful.buyers.length">
            <img :src="item.avatar | imageSize('56x56')" alt="" v-for="(item, index) in food_info.joyful.buyers" :key="index">
          </p>
        </div>
        <public-list :listData="food_info.dynamics" v-if="food_info.dynamics && food_info.dynamics.length"></public-list>
        <comment-null :text="'暂时没有体验秀，欢迎你来秀'" v-else></comment-null>
      </div>
    </div>
    <div v-else class="sold-out">
      <i class="iconfont icon-product_lb_error"></i>
      <p>食品已下架</p>
    </div>
    <open-app></open-app>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat';
  import food_show from '../../../../store/store/food_show.js';
  import {LifeStyle, VueSwiper, PublicList, CommentNull, OpenApp} from '../../../../components/mobile/business';

  export default {
    title() {
      return '食品详情';
    },
    meta() {
      return `<meta name="description" content="食品详情">
              <meta name="keywords" content="食品详情">`;
    },
    asyncData({store, route}) {
      store.registerModule('food_show', food_show);
      const store_id = route.query.store_id;
      const food_id = route.query.food_id;
      return Promise.all([store.dispatch('food_show/getFoodDetail', {store_id, food_id})]);
    },
    components: {
      LifeStyle, VueSwiper, PublicList, CommentNull, OpenApp
    },
    mixins: [wechat],
    mounted(){
      let that = this;
      that.$store.registerModule('food_show', food_show, {preserveState: true});

      // 微信分享
      if(!that.food_info.basic) return;
    },
    destroyed() {
      this.$store.unregisterModule('food_show', food_show);
    },
    computed: mapState({
      food_info: (store) => store.food_show.food_info,
      sold_out: (store) => store.food_show.sold_out
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .food-detail {
    background-color: $intervalColor;
    .food-info {
      width: 100%;
      margin-bottom: 0.2rem;
      background-color: #fff;
      img {
        height: 4.22rem;
      }
      .info-box {
        padding: 0.4rem 0.3rem 0.3rem;
        h3 {
          font-size: 0.44rem;
          font-weight: 400;
          line-height: 0.44rem;
          color: $themeColor;
        }
        .price {
          display: flex;
          align-items: center;
          height: 0.4rem;
          margin: 0.2rem 0 0.3rem;
          font-weight: 400;
          color: $mallRed;
          i {
            font-style: normal;
            font-size: 0.32rem;
          }
          span {
            font-size: 0.4rem;
          }
        }
        .desc {
          font-size: 0.28rem;
          line-height: 150%;
          color: $themeColor;
        }
        .show {
          display: flex;
          justify-content: space-between;
          margin-top: 0.4rem;
          span {
            font-size: 0.26rem;
            line-height: 0.26rem;
            color: $subColor;
          }
        }
      }
    }
    .food-show {
      background-color: #fff;
      .show-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.13rem;
        padding: 0 0.3rem;
        border-bottom: 0.01rem solid $borderColor;
        h4 {
          font-size: 0.34rem;
          font-weight: 400;
          color: $themeColor;
        }
        p img {
          width: 0.46rem;
          height: 0.46rem;
          border-radius: 50%;
          margin: 0 0.04rem;
        }
      }
    }
    &.sold-out {
      background-color: #fff;
    }
    .sold-out{
      padding-top: 1.1rem;
      text-align: center;
      i {
        font-size: 1.6rem;
        color: #d4d4d4;
      }
      p{
        margin-top: 0.2rem;
        font-size: 0.4rem;
        font-weight: 300;
        letter-spacing: 0.3px;
        text-align: center;
        color: $themeColor;
        text-align: center;
      }
    }
  }
</style>

