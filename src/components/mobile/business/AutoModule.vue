<template>
  <div class="auto-module">
    <div class="title" @click.stop="skip(vitem)">
      <h3>{{vitem.title || vitem.sModuleName}}</h3>
      <p>
        <span>更多</span>
        <i class="iconfont icon-shopping_next"></i>
      </p>
    </div>
    <div class="top" @click.stop="assign('product_detail', (vitem.data || vitem.sData)[0].id)">
      <img class="list-img" v-lazy="imageSize((vitem.data || vitem.sData)[0].basic.list_headimg, '330x330')" alt="">
      <img v-if="(vitem.data || vitem.sData)[0].badge" class="list-icon" :src="(vitem.data || vitem.sData)[0].badge" alt="">
      <div class="desc">
        <h4>{{(vitem.data || vitem.sData)[0].basic.title}}</h4>
        <h5>{{(vitem.data || vitem.sData)[0].basic.highlight}}</h5>
        <div class="price" v-if="vitem.mod === 'hot'">
          <p class="current">
            <i>¥</i>
            <span>{{(vitem.data || vitem.sData)[0].optionsMinPrice | divide(100)}}{{(vitem.data || vitem.sData)[0].optionsMaxPrice !== (vitem.data || vitem.sData)[0].optionsMinPrice ? '起' : ''}}</span>
          </p>
          <p class="origin" v-if="(vitem.data || vitem.sData)[0].optionsMinPrice !== (vitem.data || vitem.sData)[0].marketMinPrice">
            <i>¥</i>
            <span>{{(vitem.data || vitem.sData)[0].marketMinPrice | divide(100)}}{{(vitem.data || vitem.sData)[0].marketMaxPrice !== (vitem.data || vitem.sData)[0].marketMinPrice ? '起' : ''}}</span>
          </p>
        </div>
        <div class="price" v-else>
          <p class="current">
            <i>¥</i>
            <span>{{(vitem.data || vitem.sData)[0].optionsMinPrice | divide(100)}} {{(vitem.data || vitem.sData)[0].optionsMaxPrice !== (vitem.data || vitem.sData)[0].optionsMinPrice ? '起' : ''}}</span>
          </p>
        </div>
        <span class="discount" v-if="(vitem.data || vitem.sData)[0].adjust_reason">{{(vitem.data || vitem.sData)[0].adjust_reason}}</span>
        <p class="num" v-if="+(vitem.data || vitem.sData)[0].basic.buyshow_count || +(vitem.data || vitem.sData)[0].basic.buyshow_thumbs_count">
          <span v-if="+(vitem.data || vitem.sData)[0].basic.buyshow_count">{{`${(vitem.data || vitem.sData)[0].basic.buyshow_count} 条体验秀`}}</span>
          <span v-if="+(vitem.data || vitem.sData)[0].basic.buyshow_thumbs_count">{{` | ${(vitem.data || vitem.sData)[0].basic.buyshow_thumbs_count} 人赞过`}}</span>
        </p>
      </div>
    </div>
    <ul class="content">
      <li v-for="(item, index) in (vitem.data || vitem.sData).slice(1, 4)" :key="index" @click.stop="assign('product_detail', item.id)">
        <img class="list-img" v-lazy="imageSize(item.basic.list_headimg, '330x330')" alt="">
        <img v-if="item.badge" class="list-icon" :src="item.badge" alt="">
        <div class="shop-desc">
          <h4>{{item.basic.title}}</h4>
          <p v-if="vitem.mod === 'hot'" class="desc-price">
            <i>¥</i>
            <span>{{item.optionsMinPrice | divide(100)}}</span>
            <span v-if="item.optionsMaxPrice !== item.optionsMinPrice">-{{item.optionsMaxPrice | divide(100)}}</span>
          </p>
          <p v-else class="desc-price">
            <i>¥</i>
            <span>{{item.optionsMinPrice | divide(100)}} {{item.optionsMaxPrice !== item.optionsMinPrice ? '起' : ''}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['vitem'],
    data() {
      return {
        imageSize
      };
    },
    methods: {
      skip(vitem) {
        let that = this;
        if(vitem.link) {
          window.location.href = vitem.link;
        } else {
          if(vitem.type) that.queryAssign('product/mall_module', {module_type: vitem.type});
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .auto-module {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.4rem;
      padding: 0.4rem 0.3rem;
      h3 {
        font-size: 0.4rem;
        font-weight: 400;
        color: $themeColor;
      }
      p {
        display: flex;
        align-items: center;
        span {
          font-size: 0.28rem;
          color: $subColor;
        }
        i {
          margin-left: 0.2rem;
          font-size: 12px;
          color: rgba(106,106,106,1);
        }
      }
    }
    .top {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 0.3rem;
      height: 2.8rem;
      border-radius: 0.04rem;
      background-color: #fafafa;
      .list-img {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 0.02rem;
      }
      .list-icon {
        position: absolute;
        top: 0;left: 0;
        width: 0.6rem;
      }
      .desc {
        flex: 1;
        margin-left: 0.24rem;
        overflow: hidden;
        h4 {
          font-size: 0.3rem;
          font-weight: 400;
          line-height: 0.4rem;
          color: $themeColor;
          word-break: break-word;
        }
        h5 {
          @include tofl(100%);
          margin-top: 0.1rem;
          font-size: 0.24rem;
          font-weight: 300;
          line-height: 1;
          color: $subColor;
        }
        .price {
          display: flex;
          align-items: center;
          margin-top: 0.16rem;
          .current{
            display: flex;
            align-items: center;
            height: 0.3rem;
            font-weight: 400;
            color: $mallRed;
            i {
              font-style: normal;
              font-size: 0.24rem;
              line-height: 1;
            }
            span {
              font-size: 0.3rem;
              line-height: 1;
            }
          }
          .origin {
            display: flex;
            align-items: center;
            height: 0.3rem;
            margin-left: 0.14rem;
            text-decoration: line-through;
            font-weight: 400;
            color: $subColor;
            i {
              font-style: normal;
              font-size: 0.24rem;
              line-height: 1;
            }
            span {
              font-size: 0.28rem;
              line-height: 1;
            }
          }
        }
        .discount {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.16rem;
          padding: 0.04rem 0.1rem;
          @include thin-line(#004293, 15px);
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
      }
    }
    .content {
      display: flex;
      padding: 0.15rem 0.3rem 0.4rem;
      li {
        position: relative;
        margin-right: 0.15rem;
        &:last-child {
          margin-right: 0;
        }
        .list-img {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 0.04rem;
        }
        .list-icon {
          position: absolute;
          top: 0;left: 0;
          width: 0.6rem;
        }
        .shop-desc {
          h4 {
            margin: 0.16rem 0 0.1rem;
            font-size: 0.26rem;
            font-weight: 400;
            line-height: 0.36rem;
            color: $themeColor;
            word-break: break-word;
            @include erow(2);
          }
          .desc-price {
            display: flex;
            align-items: center;
            height: 0.3rem;
            font-weight: 400;
            color: $mallRed;
            i {
              font-style: normal;
              font-size: 0.24rem;
            }
            span {
              font-size: 0.28rem;
            }
          }
        }
      }
    }
  }
</style>

