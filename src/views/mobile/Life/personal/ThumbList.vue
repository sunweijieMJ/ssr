<template>
  <div class="fans">
    <public-title :pageTitle="'赞过的人'"></public-title>
    <ul v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <share-list :list="thumb_list"></share-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import thumb_list from '../../../../store/life/thumb_list.js';
  import {PublicTitle, ShareList, Loading} from '../../../../components/mobile/business';
  export default {
    title() {
      return '赞列表';
    },
    meta() {
      return `<meta name="description" content="赞列表">
      <meta name="keywords" content="赞列表">`;
    },
    asyncData({store, route}) {
      store.registerModule('thumb_list', thumb_list);
      const id = route.query.id;
      const type = route.query.type;
      return Promise.all([store.dispatch('thumb_list/getThumbList', {id, type})]);
    },
    components: {
      PublicTitle, ShareList, Loading
    },
    data(){
      return{
        id: this.$route.query.id,
        type: this.$route.query.type
      };
    },
    methods: {
      infinite(){
        let that = this;
        that.$store.dispatch('thumb_list/getThumbList', {id: that.id, type: that.type});
      }
    },
    mounted() {
      this.$store.registerModule('thumb_list', thumb_list, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('thumb_list', thumb_list);
    },
    computed: {
      ...mapState({
        thumb_list: (store) => store.thumb_list.thumb_list,
        loadInfo: (store) => store.thumb_list.loadInfo
      }),
      loading() {
        return this.$store.state.thumb_list.loadInfo.loading;
      }
    }
  };
</script>
