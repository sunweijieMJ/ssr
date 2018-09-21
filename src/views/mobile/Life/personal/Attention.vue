<template>
  <div class="attention">
    <public-title :pageTitle="'Ta的关注'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <share-list :list="attention"></share-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';
  import attention_list from '../../../../store/life/attention_list.js';
  import {PublicTitle, ShareList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '关注列表';
    },
    meta() {
      return `<meta name="description" content="关注列表">
      <meta name="keywords" content="关注列表">`;
    },
    asyncData({store, route}) {
      store.registerModule('attention_list', attention_list);
      const id = route.params.id;
      return Promise.all([store.dispatch('attention_list/getAttention', id)]);
    },
    components: {
      PublicTitle, ShareList, Loading
    },
    data(){
      return{
        response: {},
        isTencent: false,
        id: this.$route.params.id
      };
    },
    mounted() {
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
      that.$store.registerModule('attention_list', attention_list, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('attention_list', attention_list);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('attention_list/getAttention', that.id);
      }
    },
    computed: {
      ...mapState({
        attention: (store) => store.attention_list.attention,
        loadInfo: (store) => store.attention_list.loadInfo
      }),
      loading() {
        return this.$store.state.attention_list.loadInfo.loading;
      }
    }
  };
</script>
