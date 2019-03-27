<template>
  <div class="sigle-list">
    <ul>
      <li v-for="(item, chindex) in shopList" :key="chindex" @click="nativeSkip(item.id)">
        <div class="img-box">
          <img class="list-img" :src="imageSize(item.basic.list_headimg, '330x330')" :key="item.id" alt="">
          <img v-if="item.basic.product_list_icon" class="list-icon" v-lazy="imageSize(item.basic.product_list_icon, '80x80')" alt="">
        </div>
        <div class="shop-desc">
          <h3>
            <span>{{item.basic.title}}</span>
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
          <div class="flag_two">
            <img v-if="flagsJudge(item.basic.flags).new" src="../../../../static/mobile/img/h5/new_pro.png" alt="">
            <img v-if="flagsJudge(item.basic.flags).hot" src="../../../../static/mobile/img/h5/hot_flag.png" alt="">
          </div>
          <p class="soldout" v-if="flagsJudge(item.basic.flags).soldout">售罄<p/>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import frequent from '../../../mixins/frequent.js';
import imageSize from '../../../utils/filters/imageSize.js';
import {parseUrl} from '../../../utils/business/tools.js';
export default {
  name: 'SingleList',
  props: ['shopList'],
  mixins: [frequent],
  data(){
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
.sigle-list{
  ul{
    margin: auto;
    margin-top: 2.7rem;
    width: 6.9rem;
    height: 100%;
    padding: 0.29rem 0.3rem 0 0.3rem;
    li {
      display: flex;
      position: relative;
      width: 6.9rem;
      margin-bottom: 0.3rem;
      .img-box{
        width: 2.8rem;
        height: 2.8rem;
      }
      .list-img {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 0.04rem;
      }
      .list-icon {
        position: absolute;
        left: 1.9rem; top: 0.1rem;
        width: 0.8rem;
        height: 0.8rem;
      }
      .shop-desc {
        // margin-top: 0.16rem;
        margin-left: 0.2rem;
        h3 {
          @include erow(2);
          font-size: 0.32rem;
          line-height: 0.4rem;
          span {
            margin-right: 0.1rem;
            font-weight: 400;
            vertical-align: middle;
            color: $themeColor;
          }
        }
        h4 {
          font-size: 0.26rem;
          font-weight: 300;
          line-height: 0.46rem;
          color: $subColor;
          @include tofl(3.9rem);
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
        .flag_two{
          display: flex;
          margin-top: 0.06rem;
          img{
            margin-right: 0.1rem;
            width: 0.62rem;
            height: 0.32rem;
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
}
</style>
