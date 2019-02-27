<template>
  <div class="auto-module">
    <div class="title" @click.stop="skip(vitem)">
      <h3>{{vitem.title || vitem.sModuleName}}</h3>
      <i class="iconfont icon-shopping_next"></i>
    </div>
    <div class="top">
      <img src="" alt="">
      <div class="desc">
        <h4>Braun 博朗手动绞拌棒 (套组)</h4>
        <div class="price">
          <p class="current">
            <i>¥</i>
            <span>{{2064000 | divide(100)}}</span>
            <!-- <span v-if="item.optionsMaxPrice !== item.optionsMinPrice">-{{2580000 | divide(100)}}</span> -->
          </p>
          <p class="origin">
            <i>¥</i>
            <span>{{2580000 | divide(100)}}</span>
            <!-- <span v-if="item.optionsMaxPrice !== item.optionsMinPrice">-{{2580000 | divide(100)}}</span> -->
          </p>
        </div>
        <a href="">活动 8 折优惠</a>
      </div>
    </div>
    <ul class="content">
      <li v-for="(item, index) in (vitem.data || vitem.sData).slice(1, 4)" :key="index" @click.stop="assign('product_detail', item.id)">
        <img class="list-img" v-lazy="imageSize(item.basic.list_headimg, '330x330')" alt="">
        <img v-if="item.basic.product_list_icon" class="list-icon" v-lazy="imageSize(item.basic.product_list_icon, '80x80')" alt="">
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
      margin: 0 0.3rem;
      height: 3rem;
      border-radius: 0.04rem;
      background-color: #fafafa;
      img {

      }
      .desc {
        h4 {}
        .price {
          .current{}
          .origin {

          }
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
          padding-right: 0.3rem;
        }
        .list-img {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 0.04rem;
        }
        .list-icon {
          position: absolute;
          right: 0.1rem; top: 0.1rem;
          width: 0.8rem;
          height: 0.8rem;
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

