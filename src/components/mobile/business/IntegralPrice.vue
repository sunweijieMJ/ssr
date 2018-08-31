<template>
  <div class="integral-price">
    <a href="javascript:;" :class="['unselected',{selected:selectedBtn===0}]" @click="select(0)">
      <p>
        <img v-if="selectedBtn === 0" src="../../../../static/mobile/svg/product/me_ic_integral_32.svg" alt="">
        <img v-if="selectedBtn !== 0" src="../../../../static/mobile/svg/product/me_ic_integral_grey_32.svg" alt="">
        <span >&nbsp;{{minPrice/10}}</span>
        <span v-if="minPrice !== maxPrice">-{{maxPrice/10}}</span>
      </p>
    </a>
    <a href="javascript:;" :class="['unselected',{selected:selectedBtn===1}]" @click="select(1)">
      <p>
        <i>¥</i><span>{{minPrice / 100}}</span><span v-if="minPrice !== maxPrice">-{{maxPrice / 100}}</span>
      </p>
    </a>
  </div>
</template>
<script>
  export default {
    props: ['minPrice', 'maxPrice'],
    data(){
      return{
        selectedBtn: 0 // ETC 当前选中的按钮
      };
    },
    methods: {
      select(index){
        let that = this;
        that.selectedBtn = index;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .integral-price{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    a{
      height: 0.64rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 0.4rem;
      font-family: 'PingFangSC-Regular';
      font-weight: 300;
      padding: 0 0.2rem;
      border: solid 0.01rem $themeColor;
      margin:0.2rem 0.3rem 0 0;
      &:last-child{
        margin-right: 0;
      }
      p{
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          font-family: 'PingFangSC-Regular';
          font-size: 0.32rem;
          line-height: 0.32rem;
        }
      }
      >span{
        font-size: 0.2rem;
        line-height: 0.2rem;
      }
      img{
        width: 0.32rem;
      }
      i{
        font-size: 0.28rem;
        font-style: normal;
      }
      &.unselected{
        border-color: #B9B9B9;
        color: $themeColor;
      }
      &.selected{
        border-color: #e00c00;
        color: #e00c00;
      }
      &.disabled{
        border-color: #cccccc;
        color: #999999;
      }
    }
  }
</style>
