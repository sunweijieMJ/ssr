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
      <span class="sure-searh" v-if="key_word !== '' &&　!shoplist_show" @click="goSearchContent(key_word, proid)">搜索</span>
      <i class="iconfont icon-detail_ic_shoppingba" v-if="shoplist_show"></i>
    </div>
    <div class="found-shop" v-if="!shoplist_show">
      <div class="default" v-if="key_word == ''">
        <div class="hot-sea" v-if="hotlist">
          <div>热门搜索</div>
          <span class="history-tab" v-for="(hot, index) in hotlist" :key="index" @click="hotEvent(hot.text)">{{hot.text}}</span>
        </div>

        <div class="clear"></div>
        <div class="hot-sea histroy" v-if="history.lenght > 0">
          <div class="history-title">
            <span>历史搜索</span>
            <i class="iconfont icon-detail_ic_shoppingba" @click="reset"></i>
          </div>
          <span class="history-tab" v-for="(hot, index) in history" :key="index">{{hot.keyword}}</span>
        </div>
        <div class="clear"></div>
      </div>
      <div v-if="key_word !== ''" class="searching">
        <ul>
          <li v-for="(h, index) in thinklist" :key="index" @click="keySearch(h.text)"><span>{{h.text | readMore(20, `...`)}}</span><span>{{h.text_type}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import KeyEmpty from  './KeyEmpty.vue';

import {mapState} from 'vuex';
// import product_list from '../../../../store/mall/product_list.js';
import EmptyPage from './EmptyPage.vue';
export default {
  name: 'searchpage2',
  props: ['hotlist', 'history', 'proid', 'key_words'],
  components: {
    KeyEmpty,
    EmptyPage
  },
  data(){
    return {
      key_word: this.key_words ? this.key_words : '',
      shoplist_show: false,

      istrue: 0,
      found: false
    };
  },
  methods: {
    reset(){
      this.$api.poet('/mall/misc/reset_search_history', res => {
      })
    },
    hotEvent(keys){
      if(this.$route.name === 'SearchContent'){
        this.$emit('localSearch', false, keys);
      }else{
        this.$router.push({name: 'SearchContent', params: {key: keys, id: this.proid}});
      }
    },
    keySearch(keys){
      if(this.$route.name === 'SearchContent'){
        this.$emit('localSearch', false, keys);
      }else{
        this.$router.push({name: 'SearchContent', params: {key: keys, id: this.proid}});
      }
    },
    // 搜索词内容变化
    Alter(key){
      let keys = key.trim();
      this.$store.dispatch('search_list/getThinkList', keys);
    },
    // 取消搜索
    cancelSearch(){
      this.$emit('cancelSearch');
    },
    searchUser() {
      this.shoplist_show = false;
      this.found = true;

      // this.key_word = this.key_words;
      this.$store.dispatch('search_list/getThinkList', this.key_word);
    },

    // 清空
    empty(){
      this.key_word = '';
    },

    // 搜索跳转
    goSearchContent(keys){
      this.key_word = keys;
      this.shoplist_show = true;
      // this.$store.dispatch('pro_list/getProductList2', {id: this.proid, key: keys});
      if(this.$route.name === 'SearchContent'){
        this.$emit('localSearch', false, this.key_word);
      }else{
        this.$router.push({name: 'SearchContent', params: {id: this.proid, key: keys}});
      }
      
    }
  },
  watch: {
    key_word(){
      this.$store.dispatch('search_list/getThinkList', this.key_word);
    }
  },
  computed:{
    ...mapState({
      thinklist: (store) => store.search_list.thinklist
    }),
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
.found-shop{
  .default{
    padding: 0rem 0.3rem 0.3rem 0.3rem;
  }
  .hot-sea{

    font-size: 0.28rem;
    div{
      height: 0.88rem;
      line-height: 0.88rem;
    }
    .history-tab{
      float: left;
      padding: 0.13rem 0.18rem;
      color: #444444;
      font-size: 0.32rem;
      border-radius: 0.04rem;
      background-color: #f5f5f5;
      margin-right: 0.3rem;
      margin-bottom: 0.3rem;
      letter-spacing: normal;
    }
    .history-title{
      display: flex;
      justify-content: space-between;
    }
  }
  .clear{
    clear: both;
  }
  .searching{
    li{
      padding: 0.3rem;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      justify-content: space-between;
      font-size: 0.28rem;
    }
  }
}


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
</style>

