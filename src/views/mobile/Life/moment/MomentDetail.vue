<template>
  <div class="moment-detail">
    <life-style></life-style>
    <public-list :listData="[moment_detail_info]"></public-list>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loadInfo.loading"
      infinite-scroll-distance="10">
      <comment-title :titleList="comment_title"></comment-title>
      <comment-list v-if="comment_list ? comment_list.length : null" :commentList="comment_list"></comment-list>
      <comment-null v-if="comment_list ? !comment_list.length : null"></comment-null>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
    <issue-btn></issue-btn>
    <show-image></show-image>
  </div>
</template>
<script>
  import {LifeStyle, PublicList, CommentTitle, CommentList, CommentNull, Loading, IssueBtn, ShowImage} from '../../../../components/mobile/business';
  import moment_detail from '../../../../store/life/moment_detail.js';
  import {mapState} from 'vuex';

  export default {
    title() {
      return '动态详情';
    },
    meta() {
      return `<meta name="description" content="动态详情">
      <meta name="keywords" content="动态详情">`;
    },
    asyncData({store}) {
      store.registerModule('moment_detail', moment_detail);
      const id = store.state.route.params.id;
      return Promise.all([
        store.dispatch('moment_detail/getMomentDetail', id),
        store.dispatch('moment_detail/getCommentsTitle', {entity_id: id, entity_type: 6}),
        store.dispatch('moment_detail/getCommentsList', id)
      ]);
    },
    components: {
      LifeStyle, PublicList, CommentTitle, CommentList, Loading, CommentNull, IssueBtn, ShowImage
    },
    data() {
      return {
        id: this.$route.params.id // ETC 动态id
      };
    },
    mounted() {
      this.$store.registerModule('moment_detail', moment_detail, {preserveState: true});
    },
    methods: {
      // 触底刷新
      infinite() {
        let that = this;
        that.$store.dispatch('moment_detail/getCommentsList', that.id);
      }
    },
    computed: mapState({
      moment_detail_info: (store) => store.moment_detail.moment_detail_info,
      comment_title: (store) => store.moment_detail.comment_title,
      comment_list: (store) => store.moment_detail.comment_list,
      loadInfo: (store) => store.moment_detail.loadInfo
    })
  };
</script>
<style lang="scss" scoped>
  .moment-detail {
    padding-bottom: 1rem;
    .comment-null {
      background-color: #fff !important;
    }
  }
</style>


