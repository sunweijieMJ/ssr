<template>
  <div>
    <div class="pro-list">
      <life-style></life-style>
      <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <ul class="clearfix">
          <li v-for="(item,index) in list" :key="index" @click="assign('product_detail',item.id)">
            <img :src="item.basic.list_headimg | imageSize('330x330')" alt="">
            <div class="desc">
              <span class="lanehub bigtitle" v-if="titleJudge(item.basic.flags)">LANEHUB</span>
              <span v-else class="bigtitle">{{item.basic.list_subtitle}}</span>
              <p class="desc-title">{{item.basic.list_title}}</p>
              <p class="value" :class="{gray : !finely(item.basic.flags)}">
                  <i>￥</i>
                  <span v-if="item.optionsMaxPrice === item.optionsMinPrice">{{item.optionsMinPrice/100}}</span>
                  <span v-else>{{item.optionsMinPrice/100}}-{{item.optionsMaxPrice/100}}</span>
              </p>
              <div class="min-title" :class="{grayfine : !finely(item.basic.flags)}">
                <span v-for="(flag,index) in item.basic.flags" :key="index" v-if="flag.visible">{{flag.title}}</span>
              </div>
              <!-- <div class="min-title grayfine" v-else>
                <span v-for="(flag,index) in item.basic.flags" :key="index" v-if="flag.visible">{{flag.title}}</span>
              </div> -->
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
import {LifeStyle, Majordomo} from '../../../../components/mobile/business';
export default {
  name: 'ShopList',
  mixins: [frequent],
  components: {
    Loading, LifeStyle
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
        newArr.push(val[i].visible);
      }
      if(newArr.indexOf(0) !== -1){
        return true;
      }else{
        return false;
      }
    },
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
  background-color: #ffffff;
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
        .bigtitle{
          font-size: 0.26rem;
          line-height: 0.26rem;
          font-weight: 300;
          color: #444;
        }
        .lanehub{
          border-radius: 2px;
          background-color: #0848d1;
          color: #ffffff;
          padding: 0 0.08rem;
          font-size: 0.26rem;
          line-height: 0.26rem;
        }
        .desc-title{
          font-size: 0.28rem;
          line-height: 0.28rem;
          margin-top: 0.1rem;
          margin-bottom: 0.14rem;
          font-weight: normal;
          color: #444444;
        }
        .value{
          margin-bottom: 0.12rem;
        }
        span{
          font-size: 0.3rem;
          font-weight: 300;
          font-weight: 300;
          line-height: 0.3rem;
          // color: #444444;
        }
        p{
          &.gray{
            i{
              color: #777777;
            }
            span{
              color: #777777;
            }
          }
          line-height: 0.3rem;
          span{
            color: #d60a07;
            line-height: 0.3rem;
            font-size: 0.3rem;
            font-weight: 400;
          }
          i{
            font-size: 0.24rem;
            line-height: 0.24rem;
            font-style: normal;
            color: #d60a07;
            font-weight: 400;
          }
        }
        .min-title{
          position: relative;
          line-height: 0.24rem;
          margin-bottom: 0.12rem;
          color: #4974a2;
          &.grayfine{
            span{
              color: #777777;
            }
          }
          span{
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
