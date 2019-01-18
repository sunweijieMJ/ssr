<template>
  <div class="product-list">
    <ul>
      <li v-for="(item, index) in product_list" :key="index" @click="assign('product_detail',item.id)">
        <img v-lazy="imageSize(item.basic.list_headimg, '330x330')" alt="">
        <p class="lanehub title" v-if="titleJudge(item.basic.flags)">LANEHUB</p>
        <p class="title" v-else>{{item.basic.list_subtitle}}</p>
        <p class="name">{{item.basic.list_title}}</p>
        <p class="val" :class="{gray : !finely(item.basic.flags)}">
          <span class="symbol">￥</span>
          <span v-if="item.optionsMaxPrice === item.optionsMinPrice">{{item.optionsMinPrice/100}}</span>
          <span v-else>{{item.optionsMinPrice/100}}-{{item.optionsMaxPrice/100}}</span>
        </p>
        <div class="min" :class="{grayfine : !finely(item.basic.flags)}">
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
  },
  methods: {
    finely(val){
      let newVal = [];
      for(let i = 0; i < val.length; i++){
        newVal.push(val[i].title);
      }
      if(newVal.indexOf('售罄') !== -1){
        return false;
      }else{
        return true;
      }
    },
    titleJudge(val) {
      if(!val) return true;
      let newArr = [];
      for(let i = 0; i < val.length; i++){
        newArr.push(val[i].visible);
      }
      if(newArr.indexOf(0) !== -1){
        return true;
      }else{
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/_base.scss';
.product-list{
  padding: 0.3rem 0.3rem 0 0.3rem;
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 3.3rem;
      margin-bottom: 0.34rem;
      color: #222;
      img{
        height: 3.3rem;
        width: 3.3rem;
      }
      p,span{
        line-height: 1;
      }
      .title{
        font-size: 0.26rem;
        margin-top: 0.1rem;
        line-height: 0.48rem;
        font-weight: 300;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .name{
        font-size: 0.28rem;
        line-height: 0.36rem;
        font-weight: 400;
        // margin-top: 0.1rem;
        margin-bottom: 0.12rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      
      .val{
        font-weight: 400;
        &.gray{
          .symbol{
            color: $subColor;
          }
          span{
            color: $subColor;
          }
        }
        font-size: 0.26rem;
        color: #D60A07;
        .symbol{
          font-size: 0.24rem;
        }
      }
      .min{
        &.grayfine{
          span{
            color: $subColor;
          }
        }
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
