<template>
  <div class="article-list">
    <public-title :pageTitle="'全部文章'"></public-title>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <public-list :listData="article_list"></public-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import article_list from '../../../../../store/life/article_list.js';
  import {PublicTitle, PublicList, Loading} from '../../../../../components/mobile/business';

  export default {
    title() {
      return '全部文章';
    },
    meta() {
      return `<meta name="description" content="全部文章">
      <meta name="keywords" content="全部文章">`;
    },
    asyncData({store}) {
      store.registerModule('article_list', article_list);
      return Promise.all([store.dispatch('article_list/getArticleList')]);
    },
    components: {
      PublicTitle, PublicList, Loading
    },
    mounted() {
      this.$store.registerModule('article_list', article_list, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('article_list', article_list);
    },
    methods: {
      infinite(){
        this.$store.dispatch('article_list/getArticleList');
      }
    },
    computed: {
      ...mapState({
        article_list: (store) => store.article_list.article_list,
        loadInfo: (store) => store.article_list.loadInfo
      }),
      loading() {
        return this.$store.state.article_list.loadInfo.loading;
      }
    }
  };
</script>
