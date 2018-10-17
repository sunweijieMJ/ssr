<template>
  <div>
    <div class="search">
      <i class="iconfont icon-nav_ic_return" v-if="shoplist_show"></i>
      <div class="input">
        <i class="iconfont icon-search_lb_searchCop" v-if="!shoplist_show"></i>
        <input type="text" v-model="key_word" :style="change" placeholder="搜索商品" autofocus @focus="searchUser" @input="Alter(key_word)">
        <i class="iconfont icon-delete_ic_grey_bg_" v-if="key_word !== ''" @click="empty()"></i>
      </div>
      <span class="del" v-if="!shoplist_show" @click="cancelSearch">取消</span>
      <span class="sure-searh" v-if="key_word !== '' &&　!shoplist_show" @click="goSearchContent(key_word)">搜索</span>
      <i class="iconfont icon-detail_ic_shoppingba" v-if="shoplist_show"></i>
    </div>
    <div class="found-shop" v-if="!shoplist_show">
      <KeyEmpty :key_word="key_word" :shoplist_show="shoplist_show" :hotlist="hotlist" :history="history" :thinklist="thinklist"></KeyEmpty>
    </div>
    <!-- 搜索列表 -->
    <div class="shop-list" v-if="shoplist_show">
      <div v-if="list.length > 0">
        <div v-infinite-scroll="infinite2"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <ul class="clearfix" v-if="list">
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
              </div>
            </li>
            <div class="clear"></div>
          </ul>
          <!-- <open-app></open-app> -->
          <Loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></Loading>
        </div>
      </div>
      <div v-else>
        <EmptyPage></EmptyPage>
      </div>
    </div>
  </div>
</template>
<script>
import KeyEmpty from  './KeyEmpty.vue';

import {mapState} from 'vuex';
import product_list from '../../../../store/mall/product_list.js';
import imageSize from '../../../../utils/filters/imageSize.js';
import priceFilter from '../../../../utils/filters/priceFilter';
import frequent from '../../../../mixins/frequent';
import Loading from '../../../../components/mobile/business/Loading';
import {LifeStyle, OpenApp} from '../../../../components/mobile/business';
import EmptyPage from './EmptyPage.vue';
export default {
  name: 'searchpage',
  props: ['hotlist', 'history', 'proid'],
  mixins: [frequent],
  components: {
    KeyEmpty, Loading, LifeStyle, OpenApp, EmptyPage
  },
  data(){
    return {
      key_word: '',
      shoplist_show: false,

      imageSize,
      priceFilter,
      istrue: 0,
      found: false
    };
  },
  methods: {
    // 搜索词内容变化
    Alter(key){
      let keys = key.trim();
      this.$store.dispatch('pro_list/getThinkList', keys);
    },
    // 取消搜索
    cancelSearch(){
      this.$emit('cancelSearch');
    },
    infinite2() {
      let that = this;
      console.log(that.key_word)
      that.$store.dispatch('pro_list/getProductList', {id: this.proid, key: this.key_word});
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
    },
    searchUser() {
      this.shoplist_show = false;
      this.found = true;
    },
    empty(){
      this.key_word = '';
    },
    goSearchContent(keys){
      this.key_word = keys;
      this.shoplist_show = true;
      this.$store.dispatch('pro_list/getProductList2', {id: this.proid, key: keys});
      // this.$router.push({name: 'SearchContent', params: {}});
    }
  },
  computed:{
    ...mapState({
      list: (store) => store.pro_list.list,
      loadInfo: (store) => store.pro_list.loadInfo,
      tab: (store) => store.pro_list.tab,
      thinklist: (store) => store.pro_list.thinklist
      // hotlist: (store) => store.pro_list.hotlist
    }),
    loading() {
      return this.$store.state.pro_list.loadInfo.loading;
    },
    change() {
      if(!this.shoplist_show){
        if(this.key_word == ''){
          return 'width : 5.4rem;';
        }else{
          return 'width : 4rem;';
        }
      }else{
        return 'width : 5.2rem;';
      }
    }
    
  }
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/_base.scss';

.search{
    background-color: red;
    padding: 0.14rem 0.3rem;
    background-color: #fff;
    border-bottom: 0.01rem solid $borderColor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .del{
      font-size: 0.3rem;
      letter-spacing: normal;
      color: #444444;
    }
    .sure-searh{
      font-size: 0.3rem;
      color: #0072dd;
    }
    .input {
      display: flex;
      align-items: center;
      // width: 5.9rem;
      height: 0.6rem;
      padding-left: 0.2rem;
      border-radius: 0.3rem;
      background-color: #f1f2f3;
      i {
        margin-right: 0.1rem;
        font-size: 0.3rem;
        color: #999;
        &:nth-of-type(2){
          padding-left: 0.1rem;
          margin-right: 0.2rem;
        }
      }
      input {
        // width: 5.4rem;
        height: 0.6rem;
        padding: 0;
        font-size:0.3rem;
        line-height: 0.6rem;
        outline: none;
        border: none;
        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem; 
        background-color:#f1f2f3;
        &::-webkit-input-placeholder {
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.56rem;
          color: #888;
        }
        &:-moz-placeholder{
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.56rem;
          color: #888;
        }
        &::-moz-placeholder{
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.56rem;
          color: #888;
        }
        &:-ms-input-placeholder{
          font-size: 0.28rem;
          font-weight: 300;
          line-height: 0.56rem;
          color: #888;
        }
      }
    }
  }

  .clear{
    clear: both;
  }
  ul{
    width: 6.9rem;
    height: 100%;
    padding: 0.29rem 0.3rem 0.31rem 0.3rem;
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
          color: $themeColor;
        }
        .lanehub{
          border-radius: 2px;
          background-color: $linkBlue;
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
          color: $themeColor;
        }
        .value{
          margin-bottom: 0.12rem;
        }
        span{
          font-size: 0.3rem;
          font-weight: 300;
          font-weight: 300;
          line-height: 0.3rem;
        }
        p{
          &.gray{
            i{
              color: $subColor;
            }
            span{
              color: $subColor;
            }
          }
          line-height: 0.3rem;
          span{
            color: $mallRed;
            line-height: 0.3rem;
            font-size: 0.3rem;
            font-weight: 400;
          }
          i{
            font-size: 0.24rem;
            line-height: 0.24rem;
            font-style: normal;
            color: $mallRed;
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
              color: $subColor;
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
</style>

