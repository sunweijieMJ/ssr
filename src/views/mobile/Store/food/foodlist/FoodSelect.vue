<template>
  <div class="food-select">
    <ul class="select-item">
      <li v-for="(item, index) in test" :key="index">
        <h4>{{item.title}}</h4>
        <div class="item">
          <span v-for="(val, i) in item.content" :key="i">{{val}}</span>
        </div>
      </li>
    </ul>
    <div class="select-count">
      <h4>数量</h4>
      <section class="input">
        <span class="icon">
          <i class="iconfont icon-jianhao"></i>
        </span>
        <span class="num">1</span>
        <span class="icon">
          <i class="iconfont icon-shopping_ic_number_a"></i>
        </span>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        test: [
          {
            title: '糖度',
            content: ['单糖', '半糖', '双份奶']
          },
          {
            title: '糖度',
            content: ['单糖', '半糖', '双份奶', '双份奶']
          },
          {
            title: '糖度',
            content: ['单糖', '半糖', '双份奶']
          },
          {
            title: '糖度',
            content: ['单糖', '半糖']
          }
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .food-select {
    .select-item {
      padding: 0.4rem 0.3rem;
      height: 2.6rem;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      li {
        display: flex;
        margin-bottom: 0.1rem;
        h4 {
          display: flex;
          align-items: center;
          width: 0.9rem;
          height: 0.6rem;
          font-size: 0.3rem;
          font-weight: 400;
          color: $themeColor;
        }
        .item {
          flex: 1;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          span {
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 1.5rem;
            height: 0.6rem;
            margin: 0 0.3rem 0.3rem 0;
            border-radius: 0.3rem;
            border: 0.02rem solid $borderColor;
            font-size: 0.3rem;
            color: $themeColor;
            &:nth-child(3n){
              margin-right: 0;
            }
          }
        }
      }
    }
    .select-count {
      display: flex;
      align-items: center;
      padding: 0.2rem 0.3rem;
      h4 {
        display: flex;
        align-items: center;
        width: 0.9rem;
        height: 0.6rem;
        font-size: 0.3rem;
        font-weight: 400;
        color: $themeColor;
      }
      .input{
        box-sizing: border-box;
        display: flex;
        width: 2.1rem;
        height: 0.58rem;
        border-radius: 0.03rem;
        border: 0.01rem solid #f5f5f5;
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.58rem;
          height: 0.58rem;
          background-color: $intervalColor;
          &.min i{
            color: $subColor;
          }
          i {
            font-size: 0.26rem;
            color: $themeColor;
          }
        }
        .num {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.3rem;
          font-weight: 400;
          height: 0.58rem;
          color: $themeColor;
        }
      }
    }
  }
</style>
