<template>
  <div class="food-detail">
    <life-style></life-style>
    <div class="food-info">
      <img :src="'https://pic2.lanehub.cn/production/8b9d11d4547937b53fceb7810dafadef.jpg?x-oss-process=style/app-00011' | imageSize('750x422')" alt="食品预览图">
      <div class="info-box">
        <h3>经典海鲜意面</h3>
        <p class="price">
          <i>¥</i>
          <span>68</span>
        </p>
        <p class="desc">-Parma Ham, Brie, arugula, balsamic (Ciabatta)帕尔玛⽕火腿, 布⾥里里⼲干酪酪, 芝麻菜, 意⼤大利利⿊黑醋 (意⼤大利利拖鞋⾯面包)不一样的口味有你自己决定意大利奶酪酱、泰国罗勒酱</p>
        <div class="show">
          <span>愉悦度 100%</span>
          <span>22 次购买</span>
          <span>3 条体验秀</span>
        </div>
      </div>
    </div>
    <div class="food-show">
      <div class="show-title">
        <h4>{{`体验秀 (0)`}}</h4>
        <p>
          <img :src="'https://pic2.lanehub.cn/production/8b9d11d4547937b53fceb7810dafadef.jpg?x-oss-process=style/app-00011' | imageSize('56x56')" alt="">
        </p>
      </div>
      <!-- <public-list></public-list> -->
      <comment-null :text="'暂时没有体验秀，欢迎你来秀'"></comment-null>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat';
  import food_detail from '../../../../store/store/food_detail.js';
  import {LifeStyle, PublicList, CommentNull} from '../../../../components/mobile/business';

  export default {
    title() {
      return '食品详情';
    },
    meta() {
      return `<meta name="description" content="食品详情">
              <meta name="keywords" content="食品详情">`;
    },
    asyncData({store, route}) {
      store.registerModule('food_detail', food_detail);
      const id = route.params.id;
      return Promise.all([store.dispatch('food_detail/getFoodDetail', id)]);
    },
    components: {
      LifeStyle, PublicList, CommentNull
    },
    mixins: [wechat],
    computed: mapState({
      food_info: (store) => store.food_detail.food_info,
      sold_out: (store) => store.food_detail.sold_out
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
  }
</style>

