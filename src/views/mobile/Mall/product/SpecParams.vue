<template>
  <div class="spec-params">
    <div class="public-title">
      <section>
        <a href="javascript:;" @click="$store.dispatch('product_detail/cutToParams', false)">
          <i class="iconfont icon-nav_ic_return"></i>
        </a>
        <h2>规格参数</h2>
      </section>
    </div>
    <ul>
      <div class="image-box" v-if="product_info.basic.dimensional_imgs && product_info.basic.dimensional_imgs.length">
        <img v-for="(val, index) in product_info.basic.dimensional_imgs" :key="index" v-lazy="imageSize(val, 'minSide690')" alt="">
      </div>
      <li v-for="(item,index) in product_info.params" :key="index">
        <span>{{item.paramTitle}}</span>
        <span>{{item.paramValue}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import imageSize from '../../../../utils/filters/imageSize.js';

  export default {
    data() {
      return {
        imageSize
      };
    },
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .spec-params {
    .public-title{
      width: 100%;
      height: 0.89rem;
      position: relative;
      section {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        width: 7.5rem;
        height: 0.88rem;
        padding: 0 0.3rem;
        border-bottom: 0.01rem solid #e5e5e5;
        z-index: 2000;
        background: #fff;
        a {
          position: absolute;
          left: 0.3rem;
          height: 0.88rem;
          display: flex;
          align-items: center;
          i {
            font-size: 0.46rem;
            color: #333;
          }
        }
        h2 {
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.88rem;
          text-align: center;
          font-weight: 300;
          color: $themeColor;
        }
      }
    }
    ul {
      padding: 0 0.3rem;
      background-color: #fff;
      .image-box {
        margin-bottom: 0.5rem;
        img {
          width: 100%;
          margin: 0 auto;
        }
      }
      li{
        display: flex;
        padding: 0.22rem 0;
        border-bottom: 0.01rem solid $borderColor;
        &:last-child{
          border-bottom: 0 none;
        }
        span{
          font-size: 0.32rem;
          line-height: 0.48rem;
          color: $themeColor;
          &:first-of-type{
            display: inline-block;
            width: 0.8rem;
            color: $subColor;
            margin-right: 0.6rem;
          }
          &:last-child{
            flex: 1;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  @import '../../../../assets/scss/_base.scss';

  @include pc(1440px);
  @include pc(1280px);
  @include pc(1024px);
  @include pc(961px);
</style>
