<template>
  <div class="store-notice">
    <PublicTitle :pageTitle="'店铺公告'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <div class="notice">
      <paragraph :text="notice_detail.noticeDetail"></paragraph>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import notice_detail from '../../../../store/store/store_detail.js';
  import {PublicTitle, Paragraph} from '../../../../components/mobile/business';

  export default {
    title() {
      return '店铺公告';
    },
    meta() {
      return `<meta name="description" content="店铺公告">
              <meta name="keywords" content="店铺公告">`;
    },
    components: {PublicTitle, Paragraph},
    mixins: [hidetitle],
    asyncData({store, route}) {
      store.registerModule('notice_detail', notice_detail);
      const id = route.params.id;
      return Promise.all([store.dispatch('notice_detail/getNoticeDetail', {brick_id: id})]);
    },
    mounted(){
      this.$store.registerModule('notice_detail', notice_detail, {preserveState: true});
    },
    computed: mapState({
      notice_detail: (store) => store.notice_detail.notice_detail
    })
  };
</script>
<style lang="scss">
  @import '../../../../assets/scss/_base.scss';

  .store-notice {
    .notice {
      padding: 0.4rem 0.3rem;
      background: #fff;
      p {
        font-size: 0.32rem;
        line-height: 0.48rem;
        color: $themeColor;
      }
    }
  }
</style>



