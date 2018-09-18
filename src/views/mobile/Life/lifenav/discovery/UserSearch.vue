<template>
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <div class="user-search">
      <div class="input-title">
        <div class="input">
          <i class="iconfont icon-personal_ic_save"></i>
          <input type="text" v-model="keywords" placeholder="搜索昵称/签名" @input="searchUser">
        </div>
        <span @click="back">取消</span>
      </div>
      <div class="serach-list">
        <h3 v-if="!keywords">你可能会喜欢</h3>
        <share-list :list="search_list" v-if="search_list.length"></share-list>
        <comment-null v-else :text="'什么都没找到，换个词试试呢'"></comment-null>
      </div>
    </div>
  </transition>
</template>
<script>
  import {mapState} from 'vuex';
  import user_search from '../../../../../store/life/user_search.js';
  import frequent from '../../../../../mixins/frequent.js';
  import {ShareList, CommentNull} from '../../../../../components/mobile/business';

  export default {
    title() {
      return '用户搜索';
    },
    meta() {
      return `<meta name="description" content="用户搜索">
      <meta name="keywords" content="用户搜索">`;
    },
    asyncData({store}) {
      store.registerModule('user_search', user_search);
      return Promise.all([store.dispatch('user_search/getUserSearchList')]);
    },
    components: {
      ShareList, CommentNull
    },
    mixins: [frequent],
    data() {
      return {
        keywords: ''
      };
    },
    mounted() {
      this.$store.registerModule('user_search', user_search, {preserveState: true});
    },
    methods: {
      searchUser(e) {
        const name = e.target.value;
        this.$store.dispatch('user_search/getUserSearchList', name);
      }
    },
    destroyed() {
      this.$store.unregisterModule('user_search', user_search);
    },
    computed: mapState({
      search_list: (store) => store.user_search.search_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .user-search {
    position: absolute;
    width: 100%;
    background-color: $intervalColor;
    padding-top: 0.88rem;
    .input-title {
      display: flex;
      align-items: center;
      position: fixed;
      top: 0;
      z-index: 2000;
      width: 6.9rem;
      height: 0.56rem;
      margin: 0.16rem auto;
      background-color: #fff;
      border-bottom: 0.01rem solid $borderColor;
      .input {
        display: flex;
        align-items: center;
        width: 5.6rem;
        height: 0.56rem;
        padding-left: 0.2rem;
        margin: auto;
        border-radius: 0.04rem;
        background-color: #f5f5f5;
        i {
          margin-right: 0.1rem;
          font-size: 0.26rem;
        }
        input {
          width: 6rem;
          font-size:0.3rem;
          line-height: 0.56rem;
          outline: none;
          border: none;
          background-color:#f5f5f5;
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
      span {
        margin: 0 0.3rem;
      }
    }
    .serach-list {
      background-color: #fff;
      h3 {
        font-size: 0.3rem;
        font-weight: 400;
        color: $themeColor;
      }
    }
    .comment-null {
      background-color: #fff;
    }
  }
</style>


