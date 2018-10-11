<template>
  <div class="shop-amount">
    <div class="title">数量</div>
    <div class="amount_calc">
      <section>
        <a @click="decrease" href="javascript:;">
          <i class="iconfont icon-jianhao"></i>
        </a>
        <span>{{amount}}</span>
        <a @click="increase" href="javascript:;">
          <i class="iconfont icon-shopping_ic_number_a"></i>
        </a>
      </section>
      <span v-if="currentSku.length==1">库存 {{currentSku[0].stock}} 件</span>
    </div>
    <p>家具类商品仅支持上海地区配送安装，45 天内发货</p>
  </div>
</template>
<script>
  import {warning} from '../../../../../../utils/business/tools.js';

  export default {
    props: ['currentSku'],
    data(){
      return {
        amount: 1 // ETC 购买数量
      };
    },
    methods: {
      // 购物车数量增减
      increase(){
        let that = this;
        if(that.currentSku.length !== 1) {
          warning('请先选择规格', 2000);
          return;
        }
        if(that.amount >= that.currentSku[0].stock){
          warning('您购买的宝贝太多了', 2000);
          return;
        }
        that.amount++;
      },
      decrease(){
        let that = this;
        if(that.currentSku.length !== 1) {
          warning('请先选择规格', 2000);
          return;
        }
        if(that.amount <= 1){
          warning('不能再少了，亲', 2000);
          return;
        }
        that.amount--;
      }
    },
    watch: {
      amount(cur){
        this.$emit('to-parent', cur);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../../assets/scss/_base.scss';

  .shop-amount{
    overflow: hidden;
    padding: 0 0.3rem;
    .title{
      font-size: 0.24rem;
      line-height: 0.24rem;
      font-weight: 300;
      color: $subColor;
    }
    .amount_calc{
      padding: 0.2rem 0;
      display: flex;
      align-items: center;
      section{
        box-sizing: border-box;
        display: flex;
        width: 2.1rem;
        height: 0.58rem;
        border: 1px solid $intervalColor;
        a{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.58rem;
          background-color: $intervalColor;
          i {
            font-size: 0.2rem;
            color: $themeColor;
          }
        }
        span{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.3rem;
          height: 0.58rem;
          color: $themeColor;
        }
      }
      >span{
        margin-left: 0.24rem;
        font-size: 0.24rem;
        font-weight: 300;
        color: $subColor;
      }
    }
    p {
      margin: 0.2rem 0 0.3rem;
      font-size: 0.26rem;
      line-height: 0.26rem;
      color: $themeColor;
    }
  }
</style>
