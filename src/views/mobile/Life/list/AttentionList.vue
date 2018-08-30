<template>
  <div class="attention">
    <PublicTitle :pageTitle="page_title"></PublicTitle>
    <div class="list"
    v-infinite-scroll="infinite"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
      <ShareList :list="attentions"></ShareList>
      <Loading :loading="loading" :noMore="no_more" :hide="false"></Loading>
    </div>
  </div>
</template>
<script>
import attention from '../../../../store/life/attention_list.js';
import {mapState} from 'vuex';

import PublicTitle from '../../../../components/mobile/business/PublicTitle.vue';
import ShareList from '../../../../components/mobile/business/ShareList.vue';
import Loading from '../../../../components/mobile/business/Loading.vue';
export default {
  name: 'attention',
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
    return '关注列表';
  },
  meta() {
    return `<meta name="description" content="关注列表">
    <meta name="keywords" content="关注列表">`;
  },
  methods: {
    infinite(){
      this.$store.dispatch('attention_list/attentionList', this.user_id);
    }
  },
  asyncData({store, route}) {
    store.registerModule('attention_list', attention);
    // this.$route.query.user_id
    const id = route.params.id;
    return Promise.all([
      store.dispatch('attention_list/attentionList', id)
    ]);
  },
  mounted() {
    this.user_id = this.$route.params.id;
    this.$store.registerModule('attention_list', attention, {preserveState: true});
    let that = this;
    let id = window.localStorage.getItem('MemberCenter');
    id === that.user_id ? that.page_title = '我的关注' : that.page_title = 'Ta的关注';
  },
  computed: {
    ...mapState({
      attentions: (store) => store.attention_list.attention,
      loading: (store) => store.attention_list.loading,
      no_more: (store) => store.attention_list.no_more
    })
  }
};
</script>
<style lang="scss" scoped>
.attention{
  position: absolute;
}
</style>
