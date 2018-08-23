<template>
  <div class="moment-detail">
    <life-style></life-style>
    <public-list :listData="[info]"></public-list>
    <comment-title :id="info.entity_id" :type="info.entity_type"></comment-title>
    <comment-null></comment-null>
    <Loading :loading="loading" :noMore="noMore" :hide="false"></Loading>
    <issue-btn></issue-btn>
  </div>
</template>
<script>
  import LifeStyle from '../../../../components/app/public/LifeStyle.vue';
  import PublicList from '../../../../components/app/public/PublicList.vue';
  import CommentTitle from '../../../../components/app/public/CommentTitle.vue';
  import CommentNull from '../../../../components/app/public/CommentNull.vue';
  import Loading from '../../../../components/app/public/Loading.vue';
  import IssueBtn from '../../../../components/app/public/IssueBtn.vue';
  import MallApi from '../../../../api/Mall.js';

  export default {
    title() {
      return '动态详情';
    },
    meta() {
      return `<meta name="description" content="动态详情">
      <meta name="keywords" content="动态详情">`;
    },
    components: {
      LifeStyle, PublicList, CommentTitle, Loading, CommentNull, IssueBtn
    },
    data() {
      return {
        id: this.$route.params.id,
        info: '',
        loading: false,
        noMore: false
      };
    },
    created() {
      let that = this;
      this.getMomentDetail(that.id);
    },
    methods: {
      getMomentDetail(id) {
        let that = this;
        MallApi().getMomentDetail(id).then(res => {
          if(!res.state) {
            that.info = res;
          }
        });
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


