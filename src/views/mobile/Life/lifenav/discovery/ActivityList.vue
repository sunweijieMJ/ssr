<template>
  <div class="activity-list">
    <public-title :pageTitle="'全部活动'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <public-list :listData="activity_list"></public-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {os} from '../../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../../utils/business/tools.js';
  import activity_list from '../../../../../store/life/activity_list.js';
  import {PublicTitle, PublicList, Loading} from '../../../../../components/mobile/business';

  export default {
    title() {
      return '全部活动';
    },
    meta() {
      return `<meta name="description" content="全部活动">
      <meta name="keywords" content="全部活动">`;
    },
    asyncData({store}) {
      store.registerModule('activity_list', activity_list);
      return Promise.all([store.dispatch('activity_list/getActivityList')]);
    },
    components: {
      PublicTitle, PublicList, Loading
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
      that.$store.registerModule('activity_list', activity_list, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('activity_list', activity_list);
    },
    methods: {
      infinite(){
        this.$store.dispatch('activity_list/getActivityList');
      }
    },
    computed: {
      ...mapState({
        activity_list: (store) => store.activity_list.activity_list,
        loadInfo: (store) => store.activity_list.loadInfo
      }),
      loading() {
        return this.$store.state.activity_list.loadInfo.loading;
      }
    }
  };
</script>
