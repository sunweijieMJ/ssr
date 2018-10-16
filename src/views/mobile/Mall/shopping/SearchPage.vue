<template>
  <div>
    <div class="search">
      <div class="input">
        <i class="iconfont icon-search_lb_searchCop"></i>
        <input type="text" v-model="key_word" :style="change" placeholder="搜索商品" autofocus @focus="searchUser">
        <i class="iconfont icon-delete_ic_grey_bg_" v-if="key_word !== ''" @click="empty()"></i>
      </div>
      <span class="del">取消</span>
      <span class="sure-searh" v-if="key_word !== ''" @click="goSearchContent()">搜索</span>
    </div>
    <div class="found-shop">
      <KeyEmpty :key_word="key_word"></KeyEmpty>
    </div>
  </div>
</template>
<script>
import KeyEmpty from  './KeyEmpty.vue';
export default {
  name: 'searchpage',
  components: {
    KeyEmpty
  },
  data(){
    return {
      key_word: ''
    };
  },
  methods: {
    searchUser() {
      
    },
    empty(){
      this.key_word = '';
    },
    goSearchContent(){
      this.$router.push({name: 'SearchContent', params: {}});
    }
  },
  computed:{
    change() {
      if(this.key_word == ''){
        return 'width : 5.4rem;';
      }else{
        return 'width : 4rem;';
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
</style>

