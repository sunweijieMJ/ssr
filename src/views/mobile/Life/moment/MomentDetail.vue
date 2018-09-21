<template>
  <div class="moment-detail Xcontainer">
    <life-style></life-style>
    <public-list :listData="[moment_detail_info]"></public-list>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <comment-title :titleList="comment_title" :id="id" :type="6"></comment-title>
      <comment-list v-if="comment_list ? comment_list.length : null" :commentList="comment_list"></comment-list>
      <comment-null v-if="comment_list ? !comment_list.length : null"></comment-null>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
    <issue-btn></issue-btn>
    <open-app></open-app>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat';
  import titleFilter from '../../../../utils/filters/titleFilter.js';
  import moment_detail from '../../../../store/life/moment_detail.js';
  import {LifeStyle, PublicList, CommentTitle, CommentList, CommentNull, Loading, IssueBtn, OpenApp} from '../../../../components/mobile/business';

  export default {
    title() {
      return `${this.moment_detail_info ? `瓴里动态 - ${titleFilter(this.moment_detail_info.entity_brief).slice(0, 15)}` : '动态详情'}`;
    },
    meta() {
      return `<meta name="description" content="动态详情">
      <meta name="keywords" content="动态详情">`;
    },
    asyncData({store, route}) {
      store.registerModule('moment_detail', moment_detail);
      const id = route.params.id;
      return Promise.all([
        store.dispatch('moment_detail/getMomentDetail', id),
        store.dispatch('moment_detail/getCommentsTitle', {entity_id: id, entity_type: 6}),
        store.dispatch('moment_detail/getCommentsList', id)
      ]);
    },
    components: {
      LifeStyle, PublicList, CommentTitle, CommentList, Loading, CommentNull, IssueBtn, OpenApp
    },
    mixins: [wechat],
    data() {
      return {
        id: this.$route.params.id // ETC 动态id
      };
    },
    mounted() {
      let that = this;
      that.$store.registerModule('moment_detail', moment_detail, {preserveState: true});
      // 微信分享
      if(!that.moment_detail_info) return;
      const link = window.location.href;
      const title = `来自${that.moment_detail_info.entity_user_info.other_user_name}的瓴里动态`;
      const desc = titleFilter(that.moment_detail_info.entity_brief);
      const imgUrl = that.moment_detail_info.entity_photos[0];
      that.wxInit(link, title, desc, imgUrl);
    },
    destroyed() {
      this.$store.unregisterModule('moment_detail', moment_detail);
    },
    methods: {
      // 触底刷新
      infinite() {
        let that = this;
        that.$store.dispatch('moment_detail/getCommentsList', that.id);
      }
    },
    computed: {
      ...mapState({
        moment_detail_info: (store) => store.moment_detail.moment_detail_info,
        comment_title: (store) => store.moment_detail.comment_title,
        comment_list: (store) => store.moment_detail.comment_list,
        loadInfo: (store) => store.moment_detail.loadInfo
      }),
      loading() {
        return this.$store.state.moment_detail.loadInfo.loading;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .moment-detail {
    padding-bottom: 1rem;
  }
</style>



