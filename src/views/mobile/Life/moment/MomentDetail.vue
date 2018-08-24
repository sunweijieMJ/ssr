<template>
  <div class="moment-detail">
    <life-style></life-style>
    <public-list :listData="[moment_detail_info]"></public-list>
    <!-- <comment-title :id="moment_detail_info.entity_id" :type="moment_detail_info.entity_type"
      v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
    </comment-title>
    <comment-list v-if="commentList ? commentList.length : null" :commentList="commentList"></comment-list>
    <comment-null v-if="commentList ? !commentList.length : null"></comment-null>
    <Loading :loading="loading" :noMore="noMore" :hide="false"></Loading>
    <issue-btn></issue-btn>
    <show-image></show-image> -->
  </div>
</template>
<script>
  import LifeStyle from '../../../../components/mobile/business/LifeStyle.vue';
  import PublicList from '../../../../components/mobile/business/PublicList.vue';
  import CommentTitle from '../../../../components/mobile/business/CommentTitle.vue';
  import CommentList from '../../../../components/mobile/business/CommentList.vue';
  import CommentNull from '../../../../components/mobile/business/CommentNull.vue';
  import Loading from '../../../../components/mobile/business/Loading.vue';
  import IssueBtn from '../../../../components/mobile/business/IssueBtn.vue';
  import ShowImage from '../../../../components/mobile/business/ShowImage.vue';
  import LifeApi from '../../../../api/life/Life.js';
  import moment_detail from '../../../../store/life/moment_detail.js';
  import {mapGetters} from 'vuex';

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
      return store.dispatch('moment_detail/getMomentDetail', id);
    },
    components: {
      LifeStyle, PublicList, CommentTitle, CommentList, Loading, CommentNull, IssueBtn, ShowImage
    },
    data() {
      return {
        id: this.$route.params.id, // ETC 动态id
        commentList: null, // ETC 评论列表
        curPage: 0, // ETC 当前页
        pageTotal: 0, // ETC 总页数
        loading: false,
        noMore: false
      };
    },
    methods: {
      // 触底刷新
      infinite() {
        let that = this;
        that.loading = true;
        LifeApi().getCommentsList({entity_id: that.id, entity_type: 6, page: ++that.curPage}).then(res => {
          that.page_total = res.page_total;
          if(that.commentList) {
            that.commentList = that.commentList.concat(res.data);
          } else {
            that.commentList = res.data;
          }
          // 触底判断
          that.loading = false;
          if(that.curPage >= that.pageTotal || !that.commentList.length){
            that.loading = true;
            that.noMore = true;
          }
        });
      }
    },
    computed: {
      moment_detail_info() {
        return this.$store.state.moment_detail_info;
      }
    }
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


