<template>
  <div class="serach-list">
    <div v-if="!keywords" class="list-title">
      <p>你可能会喜欢</p>
    </div>
    <share-list :list="search_list" v-if="search_list.length"></share-list>
    <comment-null v-else :text="'什么都没找到，换个词试试呢'"></comment-null>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {ShareList, CommentNull} from '../../../../../components/mobile/business';

  export default {
    props: ['keywords'],
    components: {
      ShareList, CommentNull
    },
    computed: mapState({
      search_list: (store) => store.discovery_list.search_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .serach-list {
    padding-top: 0.88rem;
    width: 100%;
    transition: 0.2s ease-out;
    background-color: #fff;
    .list-title {
      position: relative;
      z-index: 1999;
      height: 1rem;
      background-color: #fff;
      p {
        position: fixed;
        width: 6.9rem;
        top: 0.88rem;
        padding: 0.3rem 0.3rem 0.4rem;
        font-size: 0.3rem;
        line-height: 0.3rem;
        color: $themeColor;
        background-color: #fff;
      }
    }
    .comment-null {
      border-top: none;
    }
  }
</style>


