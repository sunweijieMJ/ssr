<template>
  <ul class="shop-list">
    <li v-for="(item, index) in shopList" :key="index" @click="assign('product_detail', item.id)">
      <img v-lazy="imageSize(item.basic.list_headimg, '330x330')" alt="">
      <div class="shop-desc">
        <h3>{{flagsJudge(item.basic.flags).status ? item.basic.list_subtitle : flagsJudge(item.basic.flags).title}}</h3>
        <h4>{{item.basic.list_title}}</h4>
        <p class="desc-price">
          <i>¥</i>
          <span>{{item.optionsMinPrice | divide(100)}}</span>
          <span v-if="item.optionsMaxPrice !== item.optionsMinPrice">-{{item.optionsMaxPrice | divide(100)}}</span>
        </p>
        <p class="desc-tags" v-if="flagsJudge(item.basic.flags).tags" :class="{soldout: flagsJudge(item.basic.flags).soldout}">
          <span v-for="(val, i) in item.basic.flags" :key="i" v-if="val.visible">{{val.title}}</span>
        </p>
      </div>
    </li>
  </ul>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';
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
      flagsJudge(flags) {
        let subTitle = {};
        if(!flags) return {status: true};
        for(let i = 0, LEN = flags.length; i < LEN; i++){
          if(!flags[i].visible){
            Object.assign(subTitle, {
              status: false,
              title: flags[i].title
            });
            break;
          } else if(flags[i].visible) {
            subTitle.tags = true;
            if(flags[i].type === 'soldout') {
              subTitle.soldout = true;
            }
          }
        }
        if(subTitle.status === undefined) subTitle.status = true;
        return subTitle;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .shop-list {
    width: 6.9rem;
    @extend %clearfix;
    li {
      float: left;
      width: 3.3rem;
      margin-bottom: 0.3rem;
      &:nth-child(2n + 1) {
        margin-right: 0.3rem;
      }
      img {
        width: 3.3rem;
        height: 3.3rem;
        border-radius: 0.04rem;
      }
      .shop-desc {
        margin-top: 0.26rem;
        h3 {
          font-size: 0.26rem;
          font-weight: 300;
          line-height: 0.3rem;
          color: $themeColor;
          @include tofl(3.3rem);
        }
        h4 {
          margin: 0.1rem 0 0.16rem;
          font-size: 0.28rem;
          font-weight: 400;
          line-height: 0.3rem;
          color: $themeColor;
          @include tofl(3.3rem);
        }
        .desc-price {
          display: flex;
          align-items: center;
          height: 0.3rem;
          color: $mallRed;
          i {
            font-style: normal;
            font-size: 0.24rem;
          }
          span {
            font-size: 0.3rem;
          }
        }
        .desc-tags {
          display: flex;
          height: 0.24rem;
          margin-top: 0.16rem;
          &.soldout {
            ::after {
              background-color: $subColor;
            }
            span {
              color: $subColor;
            }
          }
          span {
            position: relative;
            margin-right: 0.2rem;
            font-size: 0.24rem;
            line-height: 0.24rem;
            color: #4974a2;
            &:last-child {
              margin-right: 0;
            }
            &::after {
              position: absolute;
              top: 0.02rem; right: -0.1rem;
              content: '';
              width: 1px;
              height: 0.2rem;
              background-color: #4974a2;
            }
            &:last-child::after {
              display: none;
            }
          }
        }
      }
    }
  }
</style>
