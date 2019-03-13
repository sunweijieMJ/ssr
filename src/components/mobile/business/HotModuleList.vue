<template>
  <ul class="hot-module">
    <li v-for="(item, index) in list" :key="index">
      <div class="product" @click="nativeSkip(1002)">
        <img src="https://pic2.lanehub.cn/production/7467c39a2538cd0f722d5bc5e7a8244b.jpg?x-oss-process=style/m-00007" alt="">
        <div class="info">
          <h4>VOLUSPA 山茶花系列马卡龙蜡烛</h4>
          <div class="price">
            <p class="current">
              <i>¥</i>
              <span>158</span>
            </p>
            <p class="origin">
              <i>¥</i>
              <span>178</span>
            </p>
          </div>
          <span class="tag">情人节专享</span>
          <p class="num">345 体验秀/ 234人赞</p>
          <a class="btn" href="javascript:;">马上抢</a>
        </div>
      </div>
      <div class="show">
        <div class="user">
          <img src="https://pic2.lanehub.cn/production/7467c39a2538cd0f722d5bc5e7a8244b.jpg?x-oss-process=style/m-00007" alt="">
          <p>这个香氛蜡烛不仅长得美，味道好闻…</p>
        </div>
        <i class="iconfont icon-shopping_next"></i>
      </div>
    </li>
  </ul>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';
  import {parseUrl} from '../../../utils/business/tools.js';

  export default {
    mixins: [frequent],
    props: ['list'],
    methods: {
      nativeSkip(id) {
        if(parseUrl().app === 'i-lanehub') {
          window.location.href = `lanehub://product_detail/${id}`;
        } else if(parseUrl().app === 'a-lanehub') {
          window.location.href = `lanehub://myhome/product_detail?id=${id}`;
        } else {
          this.assign('product_detail', id);
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .hot-module {
    li {
      .product {
        display: flex;
        padding: 0.3rem;
        >img {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 0.04rem;
        }
        .info {
          margin-left: 0.2rem;
          h4 {
            font-size: 0.32rem;
            font-weight: 400;
            line-height: 1.375;
            color: $themeColor;
          }
          .price {
            display: flex;
            align-items: center;
            margin-top: 0.15rem;
            .current {
              display: flex;
              align-items: center;
              color: $mallRed;
              i {
                font-size: 0.28rem;
                font-style: normal;
                line-height: 1;
              }
              span {
                font-size: 0.32rem;
                line-height: 1;
              }
            }
            .origin {
              display: flex;
              align-items: center;
              margin-left: 0.14rem;
              color: $subColor;
              text-decoration: line-through;
              i {
                font-size: 0.24rem;
                font-style: normal;
                line-height: 1;
              }
              span {
                font-size: 0.24rem;
                line-height: 1;
              }
            }
          }
          .tag {
            display: inline-flex;
            padding: 0.04rem;
            margin: 0.16rem 0;
            @include thin-line(#004293, 4px);
            font-size: 0.22rem;
            font-weight: 400;
            line-height: 1;
            color: #004293;
          }
          .num {
            font-size: 0.22rem;
            line-height: 1;
            color: $themeColor;
          }
          .btn {
            float: right;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.2rem;
            height: 0.48rem;
            margin-top: 0.07rem;
            border-radius: 0.24rem;
            background-color: #0072DD;
            font-size: 0.24rem;
            color: #fff;
          }
        }
      }
      .show {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem 0.2rem 0.4rem;
        .user {
          display: flex;
          align-items: center;
          img {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
          }
          p {
            margin-left: 0.2rem;
            @include tofl(5rem);
            font-size: 0.28rem;
            line-height: 1;
            color: $subColor;
          }
        }
        i {
          font-size: 12px;
          color: rgba(106,106,106,1);
        }
      }
    }
  }
</style>

