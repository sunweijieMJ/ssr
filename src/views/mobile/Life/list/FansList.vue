<template>
  <div class="fans">
    <PublicTitle :pageTitle="page_title"></PublicTitle>
    <div class="list"
    v-infinite-scroll="infinite"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
      <ShareList :list="fans"></ShareList>
      <Loading :loading="loading" :noMore="no_more" :hide="false"></Loading>
    </div>
  </div>
</template>
<script>
import fansList from '../../../../store/life/fans_list.js';
import {mapState} from 'vuex';

import PublicTitle from '../../../../components/mobile/business/PublicTitle.vue';
import ShareList from '../../../../components/mobile/business/ShareList.vue';
import Loading from '../../../../components/mobile/business/Loading.vue';
export default {
  name: 'fans',
  components: {
    PublicTitle, ShareList, Loading
  },
  data(){
    return{
      page_title: '',
      user_id: ''
    };
  },
  title() {
    return '粉丝列表';
  },
  meta() {
    return `<meta name="description" content="粉丝列表">
    <meta name="keywords" content="粉丝列表">`;
  },
  methods: {
    infinite(){
      this.$store.dispatch('fans_list/fansList', 6);
    }
  },
  asyncData({store}) {
    store.registerModule('fans_list', fansList);
    // this.$route.query.user_id
    const id = 6;
    return Promise.all([
      store.dispatch('fans_list/fansList', id)
    ]);
  },
  mounted() {
    this.$store.registerModule('fans_list', fansList, {preserveState: true});
    let that = this;
    let id = window.localStorage.getItem('MemberCenter');
    id === that.user_id ? that.page_title = '我的粉丝' : that.page_title = 'Ta的粉丝';
  },
  computed: {
    ...mapState({
      fans: (store) => store.fans_list.fans,
      loading: (store) => store.fans_list.loading,
      no_more: (store) => store.fans_list.no_more
    })
  }
};
</script>
<style lang="scss" scoped>
.fans{
  position: absolute;
}
</style>
