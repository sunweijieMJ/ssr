<template>
  <section class="menu-list">
    <ul class="kind-list">
      <li v-for="(vitem, vindex) in cart_list" :key="vindex">
        <h4>{{vitem.category_name}}</h4>
        <ul class="food-list">
          <li v-for="(witem, windex) in vitem.products" :key="windex" @click="activePopup({index: {i: vindex, j: windex}, status: true})">
            <img :src="witem.basic.list_headimg" alt="">
            <div class="food-info">
              <h5>{{witem.basic.title}}</h5>
              <div class="info-price">
                <p class="price-num">
                  <i>¥</i>
                  <span>{{Math.round(witem.optionsMinPrice / 100)}}</span>
                  <span v-if="witem.optionsMinPrice !== witem.optionsMaxPrice">{{-Math.round(witem.optionsMaxPrice / 100)}}</span>
                </p>
                <p class="price-btn">
                  <i v-if="witem.buy_count" class="iconfont icon-shop_ic_coffee_subtr"
                    @click.stop="activePopup({index: {i: vindex, j: windex}, symbol: false, status: false})"></i>
                  <span v-if="witem.buy_count">{{witem.buy_count}}</span>
                  <i class="iconfont icon-shop_ic_coffee_add"
                    @click.stop="activePopup({index: {i: vindex, j: windex}, symbol: true, status: true})"></i>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    methods: {
      activePopup(data) {
        this.$store.dispatch('food_list/cutFoodPopup', data);
      }
    },
    computed: mapState({
      cart_list: (store) => store.food_list.cart_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .menu-list {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .kind-list {
      h4 {
        box-sizing: border-box;
        padding-left: 0.2rem;
        height: 0.92rem;
        font-size: 0.28rem;
        font-weight: 500;
        line-height: 0.92rem;
        color: $themeColor;
        border: {
          top: 0.01rem solid $borderColor;
          bottom: 0.01rem solid $borderColor;
        }
      }
      .food-list {
        li {
          box-sizing: border-box;
          display: flex;
          height: 1.74rem;
          padding: 0.2rem 0.3rem 0.2rem 0.2rem;
          border-bottom: 0.01rem solid $borderColor;
          &:last-child {
            border-bottom: none;
          }
          img {
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 0.04rem;
            margin-right: 0.2rem;
          }
          .food-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            h5 {
              font-size: 0.32rem;
              line-height: 150%;
              font-weight: 500;
              color: $themeColor;
            }
            .info-price {
              display: flex;
              justify-content: space-between;
              .price-num {
                display: flex;
                align-items: center;
                font-weight: 400;
                color: $mallRed;
                i {
                  font-style: normal;
                  font-size: 0.3rem;
                }
                >span {
                  font-size: 0.3rem;
                }
              }
              .price-btn {
                display: flex;
                align-items: center;
                i {
                  font-size: 0.44rem;
                  color: $darkBlue;
                }
                span {
                  margin: 0 0.26rem;
                  font-size: 0.3rem;
                  font-weight: 400;
                  color: $themeColor;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

