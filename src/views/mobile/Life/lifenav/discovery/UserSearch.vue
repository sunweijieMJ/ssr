<template>
  <div class="user-search">
    <div class="input-title">
      <div class="input">
        <i class="iconfont icon-search_lb_searchCop"></i>
        <input type="text" v-model="keywords" placeholder="搜索昵称/签名" autofocus @input="searchUser">
      </div>
      <span @click="closePopup">取消</span>
    </div>
    <div class="serach-list">
      <div v-if="!keywords" class="list-title">
        <p>你可能会喜欢</p>
      </div>
      <share-list :list="search_list" v-if="search_list.length"></share-list>
      <comment-null v-else :text="'什么都没找到，换个词试试呢'"></comment-null>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {ShareList, CommentNull} from '../../../../../components/mobile/business';

  export default {
    components: {
      ShareList, CommentNull
    },
    data() {
      return {
        keywords: ''
      };
    },
    methods: {
      searchUser(e) {
        const name = e.target.value;
        this.$store.dispatch('discovery_list/getUserSearchList', name);
      },
      closePopup() {
        this.$emit('closePopup', false);
      }
    },
    computed: mapState({
      search_list: (store) => store.discovery_list.search_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .user-search {
    padding-top: 0.88rem;
    width: 100%;
    transition: 0.2s ease-out;
    background-color: $intervalColor;
    .input-title {
      position: fixed;
      top: 0;
      z-index: 2000;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 0.88rem;
      padding: 0.16rem 0.3rem;
      background-color: #fff;
      border-bottom: 0.01rem solid $borderColor;
      .input {
        display: flex;
        align-items: center;
        width: 6rem;
        height: 0.56rem;
        padding-left: 0.2rem;
        border-radius: 0.04rem;
        background-color: #f5f5f5;
        i {
          margin-right: 0.1rem;
          font-size: 0.34rem;
          color: #999;
        }
        input {
          width: 6rem;
          height: 0.56rem;
          padding: 0;
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
        font-size: 0.26rem;
        color: $themeColor;
      }
    }
    .serach-list {
      background-color: #fff;
      .list-title {
        position: relative;
        z-index: 1999;
        height: 1rem;
        background-color: #fff;
        p {
          position: fixed;
          width: 100%;
          top: 0.88rem;
          padding: 0.3rem;
          font-size: 0.3rem;
          color: $themeColor;
          background-color: #fff;
        }
      }
    }
  }
</style>


