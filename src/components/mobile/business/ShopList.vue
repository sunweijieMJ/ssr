<template>
  <ul class="shop-list">
    <li v-for="(item, index) in shopList" :key="index" @click="nativeSkip(item.id)">
      <img class="list-img" v-lazy="imageSize(item.basic.list_headimg, '330x330')" :key="item.id" alt="">
      <img v-if="item.basic.product_list_icon" class="list-icon" v-lazy="imageSize(item.basic.product_list_icon, '80x80')" alt="">
      <div class="shop-desc">
        <h3>
          <span>{{item.basic.title}}</span>
          <i v-if="flagsJudge(item.basic.flags).new">新</i>
          <i v-if="flagsJudge(item.basic.flags).hot">热</i>
        </h3>
        <h4>{{item.basic.highlight}}</h4>
        <div class="price">
          <p class="sale" :class="{soldout: flagsJudge(item.basic.flags).soldout}">
            <i>¥</i>
            <span>{{item.optionsMinPrice | divide(100)}}</span>
            <span v-if="item.optionsMinPrice < item.optionsMaxPrice">-{{item.optionsMaxPrice | divide(100)}}</span>
          </p>
          <p class="origin" v-if="item.optionsMinPrice !== item.marketMinPrice || item.optionsMaxPrice !== item.marketMaxPrice && !flagsJudge(item.basic.flags).soldout">
            <i>¥</i>
            <span>{{item.marketMinPrice | divide(100)}}</span>
            <span v-if="item.marketMinPrice < item.marketMaxPrice">-{{item.marketMaxPrice | divide(100)}}</span>
          </p>
        </div>
        <p class="soldout" v-if="flagsJudge(item.basic.flags).soldout">售罄<p/>
      </div>
    </li>
  </ul>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';
  import {parseUrl} from '../../../utils/business/tools.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['shopList'],
    data() {
      return {
        imageSize
      };
    },
    methods: {
      nativeSkip(id) {
        if(parseUrl().app === 'i-lanehub') {
          window.location.href = `lanehub://product_detail/${id}`;
        } else if(parseUrl().app === 'a-lanehub') {
          window.location.href = `lanehub://myhome/product_detail?id=${id}`;
        } else {
          this.assign('product_detail', id);
        }
      },
      flagsJudge(flags) {
        let subTitle = {};
        if(!flags) return {status: true};
        for(let i = 0, LEN = flags.length; i < LEN; i++){
          subTitle[flags[i].type] = true;
        }
        return subTitle;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .shop-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0.3rem 0.3rem 0.5rem;
    li {
      position: relative;
      float: left;
      width: 3.35rem;
      margin-bottom: 0.3rem;
      &:nth-child(2n + 1) {
        margin-right: 0.2rem;
      }
      .list-img {
        width: 3.35rem;
        height: 3.35rem;
        border-radius: 0.04rem;
      }
      .list-icon {
        position: absolute;
        right: 0.1rem; top: 0.1rem;
        width: 0.8rem;
        height: 0.8rem;
      }
      .shop-desc {
        margin-top: 0.16rem;
        h3 {
          @include erow(2);
          font-size: 0.3rem;
          line-height: 1.4;
          span {
            margin-right: 0.1rem;
            font-weight: 400;
            vertical-align: middle;
            color: $themeColor;
          }
          i {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 0.32rem;
            height: 0.32rem;
            margin-right: 0.1rem;
            border-radius: 0.02rem;
            background-color: #F7D8D8;
            font-size: 0.24rem;
            font-weight: 300;
            font-style: normal;
            color: #D60A07;
          }
        }
        h4 {
          font-size: 0.26rem;
          font-weight: 300;
          line-height: 0.46rem;
          color: $subColor;
          @include tofl(3.35rem);
        }
        .price {
          .sale {
            display: flex;
            align-items: center;
            font-weight: 400;
            color: #D60A07;
            &.soldout {
              color: #999999;
            }
            i {
              font-style: normal;
              font-size: 0.24rem;
              line-height: 0.42rem;
            }
            span {
              font-size: 0.3rem;
              line-height: 0.42rem;
            }
          }
          .origin {
            display: flex;
            align-items: center;
            color: #999999;
            text-decoration: line-through;
            i {
              font-style: normal;
              font-size: 0.24rem;
              line-height: 0.28rem;
            }
            span {
              font-size: 0.24rem;
              line-height: 0.28rem;
            }
          }
        }
        .soldout {
          margin-top: 0.14rem;
          font-size: 0.24rem;
          line-height: 1;
          color: #999999;
        }
      }
    }
  }
</style>
