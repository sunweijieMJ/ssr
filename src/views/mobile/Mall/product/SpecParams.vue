<template>
  <div class="spec-params">
    <div class="public-title">
      <section>
        <a href="javascript:;" @click="$store.dispatch('product_detail/cutToParams', false)">
          <img src="../../../../../static/mobile/svg/private/nav_ic_return.svg" alt="">
        </a>
        <h2>规格参数</h2>
      </section>
    </div>
    <ul>
      <li v-for="(item,index) in product_info.params" :key="index">
        <span>{{item.paramTitle}}</span>
        <span>{{item.paramValue}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    computed: mapState({
      product_info: (store) => store.product_detail.product_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .spec-params {
    position: absolute;
    top: 0;
    z-index: 3000;
    .public-title{
      width: 100%;
      height: 0.89rem;
      position: relative;
      section {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        width: 100%;
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
          img {
            width: 0.46rem;
          }
        }
        h2 {
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.88rem;
          text-align: center;
          font-weight: 300;
          color: #444444;
        }
      }
    }
    ul {
      background-color: #fff;
      li{
        display: flex;
        align-items: center;
        padding: 0.3rem;
        border-bottom: 0.01rem solid $borderColor;
        &:last-child{
          border-bottom: 0 none;
        }
        span{
          font-size: 0.28rem;
          line-height: 0.28rem;
          color: $themeColor;
          &:first-of-type{
            display: inline-block;
            font-size: 0.24rem;
            color: $subColor;
            width: 1.2rem;
          }
          &:last-child{
            flex: 1;
            line-height: 0.4rem;
          }
        }
      }
    }
  }
</style>
