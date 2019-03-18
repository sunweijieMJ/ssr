<template>
  <ul class="hot-module">
    <li v-for="(item, index) in list" :key="index" @click="nativeSkip(item.id)">
      <div class="product">
        <img v-lazy="imageSize(item.basic.list_headimg, '330x330')" alt="">
        <div class="info">
          <h4>{{item.basic.list_subtitle}}</h4>
          <div class="price">
            <p class="current">
              <i>¥</i>
              <span>{{item.optionsMinPrice | divide(100)}}</span>
              <span v-if="item.optionsMinPrice < item.optionsMaxPrice">-{{item.optionsMaxPrice | divide(100)}}</span>
            </p>
            <p class="origin" v-if="item.optionsMinPrice !== item.marketMinPrice || item.optionsMaxPrice !== item.marketMaxPrice">
              <i>¥</i>
              <span>{{item.marketMinPrice | divide(100)}}</span>
              <span v-if="item.marketMinPrice < item.marketMaxPrice">-{{item.marketMaxPrice | divide(100)}}</span>
            </p>
          </div>
          <span v-if="item.adjust_reason" class="tag">{{item.adjust_reason}}</span>
          <p class="num" v-if="+item.basic.buyshow_count">{{item.basic.buyshow_count}} 体验秀/ {{item.basic.buyshow_thumbs_count}} 人赞过</p>
          <a class="btn" href="javascript:;"  v-if="$route.query.module_type == 10">马上抢</a>
        </div>
      </div>
      <div class="show" v-if="$route.query.module_type != 10 && item.head_buyshow">
        <div class="user">
          <img v-lazy="imageSize(item.head_buyshow.avatar, '80x80')" alt="">
          <paragraph :text="item.head_buyshow.dynamic_content"></paragraph>
        </div>
        <i class="iconfont icon-shopping_next"></i>
      </div>
    </li>
  </ul>
</template>
<script>
  import {parseUrl} from '../../../utils/business/tools.js';
  import imageSize from '../../../utils/filters/imageSize.js';
  import Paragraph from '../../../components/mobile/business/Paragraph.js';

  export default {
    components: {Paragraph},
    props: ['list'],
    data() {
      return {
        imageSize
      };
    },
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
          flex: 1;
          position: relative;
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
            flex-wrap: wrap;
            font-weight: 400;
            .current {
              display: flex;
              align-items: center;
              margin-right: 0.14rem;
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
            margin-top: 0.16rem;
            @include thin-line(#004293, 4px);
            font-size: 0.22rem;
            font-weight: 400;
            line-height: 1;
            color: #004293;
          }
          .num {
            margin-top: 0.16rem;
            font-size: 0.22rem;
            line-height: 1;
            color: $themeColor;
          }
          .btn {
            position: absolute;
            right: 0; bottom: 0;
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
    }
  }
</style>
<style lang="scss">
  @import '../../../assets/scss/_base.scss';

  .hot-module li{
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
          pointer-events: none;
          &.notMoment {
            @include erow(2);
            margin-top: 0.16rem;
          }
          font-size: 0.28rem;
          line-height: 1.5;
          color: $themeColor;
          a {
            margin-right: 0.06rem;
            font-size: 0.28rem;
            color: $linkBlue;
          }
          img {
            display: inline-block;
            width: 0.4rem;
            vertical-align: top;
          }
          i {
            margin-right: 0.05rem;
            font-size: 0.28rem;
            color: $linkBlue;
          }
        }
      }
      i {
        font-size: 12px;
        color: rgba(106,106,106,1);
      }
    }
  }
</style>
