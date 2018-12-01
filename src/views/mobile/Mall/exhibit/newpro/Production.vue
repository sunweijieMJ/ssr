<template>
  <div class="product-list">
    <ul>
      <li v-for="(item, index) in product_list" :key="index" @click="assign('product_detail',item.id)">
        <img :src="item.basic.list_headimg | imageSize('330x330')" alt="">
        <p class="title">{{item.basic.list_subtitle}}</p>
        <p class="name">{{item.basic.list_title}}</p>
        <p class="val">
          <span class="symbol">￥</span>
          <span v-if="item.optionsMaxPrice === item.optionsMinPrice">{{item.optionsMinPrice/100}}</span>
          <span v-else>{{item.optionsMinPrice/100}}-{{item.optionsMaxPrice/100}}</span>
        </p>
        <div class="min">
          <span class="tag" v-for="(a, aindex) in item.basic.flags" :key="aindex" v-if="a.visible" >{{a.title}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import imageSize from '../../../../../utils/filters/imageSize.js';
import priceFilter from '../../../../../utils/filters/priceFilter';
import frequent from '../../../../../mixins/frequent';
export default {
  name: 'Production',
  props: ['product_list'],
  mixins: [frequent],
  data(){
    return {
      imageSize,
      priceFilter
    };
  }
};
</script>
<style lang="scss" scoped>
.product-list{
  padding:1.18rem 0.3rem 0 0.3rem;
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 3.3rem;
      margin-bottom: 0.34rem;
      color: var(--greyish-brown);
      img{
        height: 3.3rem;
        width: 3.3rem;
      }
      p,span{
        line-height: 1;
      }
      .title{
        font-size: 0.26rem;
        margin-top: 0.22rem;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .name{
        font-size: 0.28rem;
        margin-top: 0.1rem;
        margin-bottom: 0.16rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .val{
        font-size: 0.24rem;
        color: #d60a07;
        .symbol{
          font-weight: 400;
        }
      }
      .min{
        position: relative;
        line-height: 0.24rem;
        margin-top: 0.16rem;
      }
      .tag{
        color: #4974a2;
        font-size: 0.24rem;
        font-weight: 300;
        line-height: 0.24rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        &:first-of-type{
          padding-left: 0;
        }
        &:before{
          content: "|";
          position: absolute;
          line-height: 0.24rem;
          margin-left: -0.13rem;
        }
        &:first-of-type:before{
          content: "";
        }
      }
    }
  }
}
</style>
