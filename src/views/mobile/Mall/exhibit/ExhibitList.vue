<template>
  <div class="exhibit-list">
    <public-title :pageTitle="'陈列列表'"></public-title>
    <ul>
      <li v-for="(item, index) in [1, 2, 3, 4]" :key="index" class="list-info">
        <img src="https://pic2.lanehub.cn/production/2fa22d6ac55350f05ac0c3166c522abe.jpg?x-oss-process=style/m-00001" alt="">
        <div class="desc">
          <h3>LANEHUB</h3>
          <h4>冰淇淋方巾</h4>
          <p class="desc-price">
            <i>¥</i>
            <span>289</span>
          </p>
        </div>
      </li>
    </ul>
    <p>店内的商品会不定时更新，喜欢就快点收藏吧</p>
  </div>
</template>
<script>
  import {PublicTitle} from '../../../../components/mobile/business';

  export default {
    props: ['shopList'],
    components: {PublicTitle},
    title() {
      return '瓴里-陈列列表';
    },
    meta() {
      return `<meta name="description" content="Lanehub 陈列列表">
      <meta name="keywords" content="陈列列表">`;
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .exhibit-list {
    .list-info {
      box-sizing: border-box;
      float: left;
      padding: 0.4rem 0.3rem;
      border-bottom: 0.01rem solid $borderColor;
      &:nth-child(2n+1) {
        border-right: 0.01rem solid $borderColor;
      }
      img {
        width: 3.14rem;
        height: 3.15rem;
      }
      .desc {
        h3 {
          margin: 0.2rem 0 0.1rem;
          font-size: 0.22rem;
          font-weight: 300;
          line-height: 0.3rem;
          color: $subColor;
        }
        h4 {
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.3rem;
          color: $themeColor;
        }
        .desc-price {
          margin-top: 0.24rem;
          font-weight: 400;
          color: $mallRed;
          i {
            font-style: normal;
            font-size: 0.24rem;
          }
          span {
            font-size: 0.32rem;
          }
        }
      }
    }
  }
</style>

