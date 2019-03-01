<template>
  <div class="auto-module">
    <div class="title" @click.stop="skip(vitem)">
      <h3>{{vitem.title || vitem.sModuleName}}</h3>
      <i class="iconfont icon-shopping_next"></i>
    </div>
    <div class="top" @click.stop="assign('product_detail', (vitem.data || vitem.sData)[0].id)">
      <img class="list-img" v-lazy="imageSize((vitem.data || vitem.sData)[0].basic.list_headimg, '330x330')" alt="">
      <img v-if="(vitem.data || vitem.sData)[0].badge" class="list-icon" :src="(vitem.data || vitem.sData)[0].badge" alt="">
      <div class="desc">
        <h4>{{(vitem.data || vitem.sData)[0].basic.list_title}}</h4>
        <div class="price">
          <p class="current">
            <i>¥</i>
            <span>{{(vitem.data || vitem.sData)[0].optionsMinPrice | divide(100)}}</span>
            <span v-if="(vitem.data || vitem.sData)[0].optionsMaxPrice !== (vitem.data || vitem.sData)[0].optionsMinPrice">-{{(vitem.data || vitem.sData)[0].optionsMaxPrice | divide(100)}}</span>
          </p>
          <p class="origin">
            <i>¥</i>
            <span>{{(vitem.data || vitem.sData)[0].marketMinPrice | divide(100)}}</span>
            <span v-if="(vitem.data || vitem.sData)[0].marketMaxPrice !== (vitem.data || vitem.sData)[0].marketMinPrice">-{{(vitem.data || vitem.sData)[0].marketMaxPrice | divide(100)}}</span>
          </p>
        </div>
        <span class="discount" v-if="(vitem.data || vitem.sData)[0].adjust_reason">{{(vitem.data || vitem.sData)[0].adjust_reason}}</span>
        <p class="num" v-if="vitem.mod === 'hot'">{{`${(vitem.data || vitem.sData)[0].basic.buyshow_count} 条体验秀 | ${(vitem.data || vitem.sData)[0].basic.buyshow_thumbs_count} 人赞过`}}</p>
      </div>
    </div>
    <ul class="content">
      <li v-for="(item, index) in (vitem.data || vitem.sData).slice(1, 4)" :key="index" @click.stop="assign('product_detail', item.id)">
        <img class="list-img" v-lazy="imageSize(item.basic.list_headimg, '330x330')" alt="">
        <img v-if="item.badge" class="list-icon" :src="item.badge" alt="">
        <div class="shop-desc">
          <h4>{{item.basic.list_title}}</h4>
          <p class="desc-price">
            <i>¥</i>
            <span>{{item.optionsMinPrice | divide(100)}}</span>
            <span v-if="item.optionsMaxPrice !== item.optionsMinPrice">-{{item.optionsMaxPrice | divide(100)}}</span>
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
          if(vitem.id) that.queryAssign('product/artificial', {module_id: vitem.id});
          if(vitem.type) that.queryAssign('product/auto_list', {type: vitem.type});
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .auto-module {
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.4rem;
      padding: 0.5rem 0.3rem 0.36rem;
      h3 {
        font-size: 0.4rem;
        font-weight: 400;
        color: $themeColor;
      }
      i {
        font-size: 12px;
        color: rgba(106,106,106,1);
      }
    }
    .top {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 0.3rem;
      padding: 0.2rem;
      height: 2.6rem;
      border-radius: 0.04rem;
      background-color: #fafafa;
      .list-img {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.02rem;
      }
      .list-icon {
        position: absolute;
        top: 0;left: 0.28rem;
        width: 0.4rem;
      }
      .desc {
        margin: 0 0.12rem 0 0.32rem;
        h4 {
          font-size: 0.3rem;
          font-weight: 400;
          line-height: 0.4rem;
          color: $themeColor;
        }
        .price {
          display: flex;
          align-items: center;
          margin: 0.1rem 0 0.16rem;
          .current{
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
              font-size: 0.3rem;
            }
          }
          .origin {
            display: flex;
            align-items: center;
            height: 0.3rem;
            margin-left: 0.14rem;
            font-weight: 400;
            color: $subColor;
            i {
              font-style: normal;
              font-size: 0.24rem;
            }
            span {
              font-size: 0.28rem;
            }
          }
        }
        .discount {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 0.04rem 0.1rem;
          @include thin-line(#004293, 15px);
          font-size: 0.22rem;
          font-weight: 400;
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
      padding: 0.15rem 0.3rem 0.5rem;
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
          top: 0;left: 0.2rem;
          width: 0.3rem;
        }
        .shop-desc {
          h4 {
            margin: 0.16rem 0 0.1rem;
            font-size: 0.26rem;
            font-weight: 400;
            line-height: 0.36rem;
            color: $themeColor;
            @include tofl(2.2rem);
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

