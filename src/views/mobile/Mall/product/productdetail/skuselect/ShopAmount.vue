<template>
  <div class="shop-amount">
    <div class="title">数量</div>
    <div class="amount_calc">
      <p>
        <a @click="decrease" href="javascript:;" :style="amount<=1?'opacity:1':''">
          <img src="../../../../../../../static/mobile/svg/product/shopping_ic_number_reduce.svg" alt="">
        </a>
        <span>{{amount}}</span>
        <a @click="increase" href="javascript:;" >
          <img src="../../../../../../../static/mobile/svg/product/shopping_ic_number_add.svg" alt="">
        </a>
      </p>
      <span v-if="currentSku.length==1">库存: {{currentSku[0].stock}}</span>
    </div>
  </div>
</template>
<script>
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
          that.$warning('请先选择规格', 2000);
          return;
        }
        if(that.amount >= that.currentSku[0].stock){
          that.$warning('您购买的宝贝太多了', 2000, 'bottom');
          return;
        }
        that.amount++;
      },
      decrease(){
        let that = this;
        if(that.currentSku.length !== 1) {
          that.$warning('请先选择规格', 2000);
          return;
        }
        if(that.amount <= 1){
          that.$warning('不能再少了，亲', 2000, 'bottom');
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
      font-weight: 300;
      color: $subColor;
    }
    .amount_calc{
      padding: 0.3rem 0;
      display: flex;
      align-items: center;
      p{
        box-sizing: content-box;
        display: flex;
        width: 1.6rem;
        height: 0.46rem;
        text-align: center;
        line-height: 0.6rem;
        a{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.44rem;
          height: 0.46rem;
          img{
            width: 0.2rem;
          }
        }
        span{
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.3rem;
          width: 0.72rem;
          height: 0.46rem;
          background-color: #f2f2f2;
        }
      }
      >span{
        margin-left: 0.24rem;
        font-size: 0.24rem;
        font-weight: 300;
        color: $subColor;
      }
    }
  }
</style>
