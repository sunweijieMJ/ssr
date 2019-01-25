<template>
  <article-desc :response="description"></article-desc>
</template>
<script>
  import {mapState} from 'vuex';
  import article_desc from '../../../store/app/article_desc.js';
  import ArticleDesc from '../../../components/app/ArticleDesc.vue';

  export default {
    components: {ArticleDesc},
    title() {
      return 'Lanehub - 文章详情';
    },
    meta() {
      return `<meta name="description" content="Lanehub 文章详情">
              <meta name="keywords" content="瓴里, 文章详情">`;
    },
    asyncData({store, route}) {
      store.registerModule('article_desc', article_desc);
      return Promise.all([store.dispatch('article_desc/getArticleDetail', route.params.id)]);
    },
    destroyed() {
      this.$store.unregisterModule('article_desc');
    },
    computed: mapState({
      description: (store) => store.article_desc.description
    })
  };
</script>

