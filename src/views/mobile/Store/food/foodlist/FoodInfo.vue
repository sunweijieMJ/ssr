<template>
  <div class="food-info">
    <h3>{{food_popup.source.basic.title}}</h3>
    <p class="info-price">
      <i>¥</i>
      <span>{{food_popup.source.optionsMinPrice | divide(100)}}</span>
      <span v-if="food_popup.source.optionsMinPrice < food_popup.source.optionsMaxPrice">-{{food_popup.source.optionsMaxPrice | divide(100)}}</span>
    </p>
    <p class="info-desc">{{food_popup.source.basic.description}}</p>
    <div class="info-show" v-if="food_popup.source.joyful" @click="queryAssign('food_show', {store_id: 2, food_id: food_popup.source.id})">
      <div class="image-box" v-if="food_popup.source.joyful.buyers && food_popup.source.joyful.buyers.length">
        <img v-lazy="imageSize(item.avatar, '56x56')" alt="" v-for="(item, index) in food_popup.source.joyful.buyers" :key="index">
      </div>
      <p class="show-num">
        <span>{{food_popup.source.joyful.buyers_count}} 次购买, {{food_popup.source.joyful.shares_count}} 条体验秀</span>
        <i class="iconfont icon-shopping_next"></i>
      </p>
    </div>
    <a href="javascript:;">
      <i v-if="food_popup.source.basic.local_sale_status" class="iconfont icon-shop_ic_coffee_add" @click="comToggle"></i>
      <span v-else>暂停售卖</span>
    </a>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';
  import imageSize from '../../../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    data() {
      return {
        imageSize
      };
    },
    methods: {
      comToggle() {
        this.$emit('comToggle', 'select');
      }
    },
    computed: mapState({
      food_popup: (store) => store.food_list.food_popup
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .food-info {
    padding: 0 0.3rem;
    h3 {
      margin: 0.24rem 0;
      font-size: 0.44rem;
      font-weight: 400;
      line-height: 0.44rem;
      color: $themeColor;
    }
    .info-price {
      display: flex;
      align-items: center;
      height: 0.4rem;
      margin-bottom: 0.26rem;
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
    .info-desc {
      font-size: 0.28rem;
      line-height: 150%;
      color: $themeColor;
    }
    .info-show {
      display: flex;
      align-items: center;
      margin-top: 0.4rem;
      .image-box {
        display: flex;
        img {
          width: 0.46rem;
          height: 0.46rem;
          margin-right: 0.08rem;
          border-radius: 50%;
        }
      }
      .show-num {
        display: flex;
        align-items: center;
        span {
          font-size: 0.28rem;
          color: $themeColor;
        }
        i {
          margin-left: 0.05rem;
          font-size: 12px;
          color: rgba(106,106,106,1);
        }
      }
    }
    a {
      position: absolute;
      right: 0.3rem;bottom: 0.4rem;
      i {
        font-size: 0.52rem;
        color: $darkBlue;
      }
      span {
        font-size: 0.3rem;
        color: $subColor;
      }
    }
  }
</style>

