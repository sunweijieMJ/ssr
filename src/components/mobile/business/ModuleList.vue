<template>
  <div class="module-list">
    <div class="title" @click.stop="skip(vitem)">
      <h3>{{vitem.title || vitem.sModuleName}}</h3>
      <i class="iconfont icon-shopping_next"></i>
    </div>
    <ul class="content">
      <li v-for="(item, index) in (vitem.data || vitem.sData).slice(0, 3)" :key="index" @click.stop="assign('product_detail', item.id)">
        <img class="list-img" v-lazy="imageSize(item.basic.list_headimg, '330x330')" alt="">
        <div class="shop-desc">
          <h3>{{flagsJudge(item.basic.flags).status ? item.basic.list_subtitle : flagsJudge(item.basic.flags).title}}</h3>
          <h4>{{item.basic.list_title}}</h4>
          <p class="desc-price">
            <i>¥</i>
            <span>{{item.optionsMinPrice | divide(100)}} {{item.optionsMaxPrice !== item.optionsMinPrice ? '起' : ''}}</span>
          </p>
          <p class="adjust" v-if="item.adjust_reason && !flagsJudge(item.basic.flags).soldout">{{item.adjust_reason}}</p>
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
      },
      flagsJudge(flags) {
        let subTitle = {};
        if(!flags) return {status: true};
        for(let i = 0, LEN = flags.length; i < LEN; i++){
          if(!flags[i].visible){
            Object.assign(subTitle, {
              status: false,
              title: flags[i].title
            });
            break;
          } else if(flags[i].visible) {
            subTitle.tags = true;
            if(flags[i].type === 'soldout') {
              subTitle.soldout = true;
            }
          }
        }
        if(subTitle.status === undefined) subTitle.status = true;
        return subTitle;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .module-list {
    background-color: #fff;
    &.module {
      position: relative;
      padding: 0.5rem 0;
      &:after{
        content: '';
        position: absolute;
        top: 0; left: 0.3rem;
        box-sizing: border-box;
        width: 13.8rem;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
        border-bottom: 1px solid $borderColor;
        pointer-events: none;
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.44rem;
      padding: 0 0.3rem 0.36rem;
      h3 {
        font-size: 0.44rem;
        font-weight: 400;
        color: $themeColor;
      }
      i {
        font-size: 12px;
        color: rgba(106,106,106,1);
      }
    }
    .content {
      display: flex;
      padding: 0 0.3rem;
      li {
        position: relative;
        margin-right: 0.2rem;
        &:last-child {
          margin-right: 0;
        }
        .list-img {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 0.04rem;
        }
        .shop-desc {
          margin-top: 0.22rem;
          h3 {
            font-size: 0.26rem;
            font-weight: 300;
            line-height: 0.3rem;
            color: $themeColor;
            @include tofl(2.2rem);
          }
          h4 {
            margin: 0.1rem 0 0.16rem;
            font-size: 0.28rem;
            font-weight: 400;
            line-height: 0.3rem;
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
              font-size: 0.3rem;
            }
          }
          .adjust {
            margin-top: 0.12rem;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: 0.04rem 0.1rem;
            @include thin-line(#004293, 15px);
            font-size: 0.22rem;
            font-weight: 400;
            line-height: 1;
            color: #004293;
          }
        }
      }
    }
  }
</style>

