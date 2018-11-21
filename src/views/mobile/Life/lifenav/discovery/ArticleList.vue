<template>
  <div class="article-list">
    <public-title :pageTitle="'全部文章'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <public-list :listData="article_list"></public-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
    <open-app></open-app>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {os} from '../../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../../utils/business/tools.js';
  import article_list from '../../../../../store/life/article_list.js';
  import {OpenApp} from '../../../../../components/mobile/button';
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
      PublicTitle, PublicList, Loading, OpenApp
    },
    data() {
      return {
        response: {},
        isTencent: false
      };
    },
    mounted() {
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
      that.$store.registerModule('article_list', article_list, {preserveState: true});
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
