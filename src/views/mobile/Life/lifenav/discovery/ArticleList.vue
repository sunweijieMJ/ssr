<template>
  <div class="article-list">
    <public-title :pageTitle="`${this.column_title || '全部文章'}`" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
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
  import hidetitle from '../../../../../mixins/hidetitle.js';
  import article_list from '../../../../../store/life/article_list.js';
  import {OpenApp} from '../../../../../components/mobile/button';
  import {PublicTitle, PublicList, Loading} from '../../../../../components/mobile/business';

  export default {
    title() {
      return `${this.column_title || '文章列表'}`;
    },
    meta() {
      return `<meta name="description" content="${this.column_title || '文章列表'}">
              <meta name="keywords" content="${this.column_title || '文章列表'}">`;
    },
    asyncData({store}) {
      store.registerModule('article_list', article_list);
    },
    components: {
      PublicTitle, PublicList, Loading, OpenApp
    },
    mixins: [hidetitle],
    mounted() {
      this.$store.registerModule('article_list', article_list, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('article_list', article_list);
    },
    methods: {
      infinite(){
        let that = this;
        const column_id = that.$route.query.column_id;
        that.$store.dispatch('article_list/getArticleList', column_id);
      }
    },
    computed: mapState({
      column_title: (store) => store.article_list.column_title,
      article_list: (store) => store.article_list.article_list,
      loading: (store) => store.article_list.loadInfo.loading,
      loadInfo: (store) => store.article_list.loadInfo
    })
  };
</script>
