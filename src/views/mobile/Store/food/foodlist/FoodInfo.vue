<template>
  <div class="food-info">
    <h3>意大利烤鸡卷(单卷)</h3>
    <p class="info-price">
      <i>¥</i>
      <span>36</span>
    </p>
    <p class="info-desc">-Parma Ham, Brie, arugula, balsamic (Ciabatta)帕尔玛⽕火腿, 布⾥里里⼲干酪酪, 芝麻菜, 意⼤大利利⿊黑醋 (意⼤大利利拖鞋⾯面包)，意大利…</p>
    <div class="info-show">
      <div class="image-box">
        <img src="https://pic2.lanehub.cn/production/8b9d11d4547937b53fceb7810dafadef.jpg?x-oss-process=style/app-00011" alt="">
      </div>
      <p class="show-num">
        <span>63 次购买, 28 条体验秀</span>
        <i class="iconfont icon-shopping_next"></i>
      </p>
    </div>
    <a href="javascript:;">
      <span v-if="0">暂停售卖</span>
      <i class="iconfont icon-shop_ic_coffee_add" v-else></i>
    </a>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .food-info {
    padding: 0 0.3rem;
    h3 {
      margin: 0.24rem 0;
      font-size: 0.44rem;
      font-weight: 400;
      line-height: 0.44rem;
      color: $themeColor;
    }
    .info-price {
      display: flex;
      align-items: center;
      height: 0.4rem;
      margin-bottom: 0.25rem;
      font-weight: 400;
      color: $mallRed;
      i {
        font-style: normal;
        font-size: 0.32rem;
      }
      span {
        font-size: 0.4rem;
      }
    }
    .info-desc {
      font-size: 0.28rem;
      line-height: 150%;
      color: $themeColor;
    }
    .info-show {
      display: flex;
      align-items: center;
      margin: 0.4rem 0 0.46rem;
      .image-box {
        img {
          width: 0.46rem;
          height: 0.46rem;
          margin-right: 0.08rem;
          border-radius: 50%;
        }
      }
      .show-num {
        display: flex;
        align-items: center;
        span {
          font-size: 0.28rem;
          color: $themeColor;
        }
        i {
          margin-left: 0.05rem;
          font-size: 12px;
          color: rgba(106,106,106,1);
        }
      }
    }
    a {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      i {
        font-size: 0.52rem;
        color: $darkBlue;
      }
      span {
        font-size: 0.3rem;
        color: $subColor;
      }
    }
  }
</style>

