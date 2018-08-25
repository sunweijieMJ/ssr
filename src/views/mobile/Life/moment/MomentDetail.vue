<template>
  <div class="moment-detail">
    <life-style></life-style>
    <public-list :listData="[moment_detail_info]"></public-list>
    <comment-title :id="moment_detail_info.entity_id" :type="moment_detail_info.entity_type"
      v-infinite-scroll="infinite"
      infinite-scroll-disabled="pageInfo.loading"
      infinite-scroll-distance="10">
    </comment-title>
    <comment-list v-if="comment_list ? comment_list.length : null" :commentList="comment_list"></comment-list>
    <comment-null v-if="comment_list ? !comment_list.length : null"></comment-null>
    <Loading :loading="pageInfo.loading" :page_total="pageInfo.page_total" :hide="false"></Loading>
    <issue-btn></issue-btn>
    <show-image></show-image>
  </div>
</template>
<script>
  import {LifeStyle, PublicList, CommentTitle, CommentList, CommentNull, Loading, IssueBtn, ShowImage} from '../../../../components/mobile/business';
  import LifeApi from '../../../../api/life/Life.js';
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
    methods: {
      // 触底刷新
      infinite() {
        return;
        let that = this;
        that.loadInfo.loading = true;
        LifeApi().getCommentsList({entity_id: that.id, entity_type: 6, page: ++that.pageInfo.current_page}).then(res => {
          that.pageInfo.page_total = res.page_total;
          if (that.comment_list) {
            that.comment_list = that.comment_list.concat(res.data);
          } else {
            that.comment_list = res.data;
          }
          // 触底判断
          that.loadInfo.loading = false;
          if (that.pageInfo.current_page >= that.pageInfo.page_total || !that.comment_list.length) {
            that.loadInfo.loading = true;
            that.pageInfo.page_total = true;
          }
        });
      }
    },
    computed: mapState({
      moment_detail_info: (store) => store.moment_detail.moment_detail_info,
      comment_list: (store) => store.moment_detail.comment_list,
      pageInfo: (store) => store.moment_detail.pageInfo,
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


