<template>
  <div>
    <div class="pro-list">
      <div class="pro-header">
        <span class="iconfont icon-detail_ic_shoppingba"></span>
        <span>商城</span>
        <span class="iconfont icon-detail_ic_shoppingba" @click.stop="intercept"></span>
      </div>
      <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <ul class="clearfix">
          <li v-for="(item,index) in list" :key="index" @click="assign('product_detail',item.id)">
            <img :src="item.basic.list_headimg | imageSize('330x330')" alt="">
            <div class="desc">
              <span class="lanehub" v-if="titleJudge(item.basic.flags)">LANEHUB</span>
              <span v-else>{{item.basic.list_subtitle}}</span>
              <p class="desc-title">{{item.basic.list_title}}</p>
              <p>
                <i>￥</i>
                <span v-if="item.optionsMaxPrice = item.optionsMinPrice">{{item.optionsMinPrice/100}}</span>
                <span v-else>{{item.optionsMinPrice/100}}-{{item.optionsMaxPrice/100}}</span>
              </p>
              <div class="min-title">
                <span v-for="(flag,index) in item.basic.flags" :key="index" v-show="flag.visible">{{flag.title}}</span>
              </div>
            </div>
          </li>
          <div class="clear"></div>
        </ul>
        <Loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></Loading>
      </div>
    </div>

  </div>
</template>
<script>
import {mapState} from 'vuex';
import product_list from '../../../../store/mall/product_list.js';
import imageSize from '../../../../utils/filters/imageSize.js';
import priceFilter from '../../../../utils/filters/priceFilter';
import frequent from '../../../../mixins/frequent';
import Loading from '../../../../components/mobile/business/Loading';
export default {
  name: 'ShopList',
  mixins: [frequent],
  components: {
    Loading
  },
  data(){
    return{
      imageSize,
      priceFilter
    };
  },
  title() {
    return '商城列表';
  },
  meta() {
    return `<meta name="description" content="商城列表">
    <meta name="keywords" content="商城列表">`;
  },
  asyncData({store}) {
    store.registerModule('pro_list', product_list);
    return Promise.all([store.dispatch('pro_list/getProductList')]);
  },
  mounted() {
    this.$store.registerModule('pro_list', product_list, {preserveState: true});
  },
  destroyed() {
    this.$store.unregisterModule('pro_list', product_list);
  },
  methods: {
    infinite() {
      let that = this;
      that.$store.dispatch('pro_list/getProductList');
    },
    titleJudge(val) {
      if(!val) return true;
      let newArr = [];
      for(let i = 0; i < val.length; i++){
        // if(val[i].visible){
        //   return false;
        // }else{
        //   return true;
        // }
        newArr.push(val[i].visible);
      }
      if(newArr.indexOf(0) !== -1){
        return true;
      }else{
        return false;
      }
    }
  },
  computed: {
    ...mapState({
      list: (store) => store.pro_list.list,
      loadInfo: (store) => store.pro_list.loadInfo
    }),
    loading() {
      return this.$store.state.pro_list.loadInfo.loading;
    }
  }
};
</script>
<style lang="scss" scoped>
.pro-list{
  padding-top: 0.88rem;
  .pro-header{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    background-color: #ffffff;
    z-index: 1000;
    width: 100%;
    height: 0.88rem;
    position: fixed;
    top: 0;
    left: 0;
    span{
      line-height: 0.88rem;
      font-size: 0.36rem;
      font-weight: 300;
      color: #444444;
      &:first-of-type{
        margin-left: 0.3rem;
        opacity: 0;
      }
      &:last-of-type{
        margin-right: 0.3rem;
      }
    }
  }
  .clear{
    clear: both;
  }
  ul{
    width: 6.9rem;
    height: 100%;
    padding: 0.31rem 0.3rem;
    li{
      width: 3.3rem;
      background-color: #ffffff;
      float: left;
      margin: 0 0.3rem 0.2rem 0;
      &:nth-child(2n){
        margin-right: 0;
      }
      img {
        width: 3.3rem;
        border-radius: 4px;
      }
      .desc{
        padding: 0.26rem 0rem 0 0;
        width: 2.9rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .lanehub{
          border-radius: 2px;
          background-color: #0848d1;
          color: #ffffff;
          padding: 0 0.08rem;
          font-size: 0.26rem;
          line-height: 0.26rem;
        }
        .desc-title{
          margin-top: 0.1rem;
          margin-bottom: 0.16rem;
          font-weight: normal;
          color: #444444;
        }
        span{
          font-size: 0.3rem;
          font-weight: 300;
          font-weight: 300;
          line-height: 0.3rem;
          color: #444444;
        }
        p{
          line-height: 0.3rem;
          span{
            color: #d60a07;
            line-height: 0.3rem;
          }
          i{
            font-size: 0.2rem;
            line-height: 0.2rem;
            font-style: normal;
            color: #d60a07;
          }
        }
        .min-title{
          margin-top: 0.16rem;
          position: relative;
          line-height: 0.24rem;
          span{
            font-size: 0.24rem;
            color: #4974a2;
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
              // top: 0.05rem;
              margin-left: -0.13rem;
            }
            &:first-of-type:before{
              content: "";
            }
          }
        }
      }
    }
  }
}
</style>
