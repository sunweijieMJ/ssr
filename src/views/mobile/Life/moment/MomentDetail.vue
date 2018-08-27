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
      <Loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></Loading>
    </div>
    <issue-btn></issue-btn>
    <show-image></show-image>
  </div>
</template>
<script>
  import {LifeStyle, PublicList, CommentTitle, CommentList, CommentNull, Loading, IssueBtn, ShowImage} from '../../../../components/mobile/business';
  import moment_detail from '../../../../store/life/moment_detail.js';
  import LifeApi from '../../../../api/life/Life';
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
        store.dispatch('getCommentsList', id)
      ]);
    },
    components: {
      LifeStyle, PublicList, CommentTitle, CommentList, Loading, CommentNull, IssueBtn, ShowImage
    },
    data() {
      return {
        id: this.$route.params.id, // ETC 动态id
        // comment_list: null, // ETC 评论列表
        // pageInfo: {
        //   current_page: 0, // ETC 当前页
        //   page_total: 0 // ETC 总页数
        // },
        // loadInfo: {
        //   loading: false, // ETC 是否loading
        //   noMore: false // ETC 是否到底
        // }
      };
    },
    methods: {
      // 触底刷新
      infinite() {
        let that = this;
        that.$store.dispatch('getCommentsList', that.id);
        // let that = this;
        // that.loadInfo.loading = true;
        // LifeApi().getCommentsList({entity_id: that.id, entity_type: 6, page: ++that.pageInfo.current_page}).then(res => {
        //   if(res.status) {
        //     that.pageInfo.page_total = res.data.page_total;
        //     if (that.comment_list) {
        //       that.comment_list = that.comment_list.concat(res.data.data);
        //     } else {
        //       that.comment_list = res.data.data;
        //     }
        //     // 触底判断
        //     that.loadInfo.loading = false;
        //     if (that.pageInfo.current_page >= that.pageInfo.page_total || !that.comment_list.length) {
        //       that.loadInfo.loading = true;
        //       that.loadInfo.noMore = true;
        //     }
        //   }
        // });
      }
    },
    computed: mapState({
      moment_detail_info: (store) => store.moment_detail.moment_detail_info,
      comment_title: (store) => store.moment_detail.comment_title,
      comment_list: (store) => store.comment_list,
      pageInfo: (store) => store.pageInfo,
      loadInfo: (store) => store.loadInfo
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


