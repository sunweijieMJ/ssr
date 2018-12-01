<template>
  <div class="fans">
    <public-title :pageTitle="'Ta的粉丝'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <div v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <share-list :list="fanslist"></share-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="true"></loading>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import fans_list from '../../../../store/life/fans_list.js';
  import {PublicTitle, ShareList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '粉丝列表';
    },
    meta() {
      return `<meta name="description" content="粉丝列表">
              <meta name="keywords" content="粉丝列表">`;
    },
    asyncData({store, route}) {
      store.registerModule('fans_list', fans_list);
      const id = route.params.id;
      return Promise.all([store.dispatch('fans_list/getFansList', id)]);
    },
    components: {
      PublicTitle, ShareList, Loading
    },
    mixins: [hidetitle],
    data(){
      return{
        id: this.$route.params.id
      };
    },
    mounted() {
      this.$store.registerModule('fans_list', fans_list, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('fans_list', fans_list);
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('fans_list/getFansList', that.id);
      }
    },
    computed: {
      ...mapState({
        fanslist: (store) => store.fans_list.fanslist,
        loadInfo: (store) => store.fans_list.loadInfo
      }),
      loading() {
        return this.$store.state.fans_list.loadInfo.loading;
      }
    }
  };
</script>
