<template>
  <div class="fans">
    <PublicTitle :pageTitle="'赞过的人'"></PublicTitle>
    <ul class="list"
    v-infinite-scroll="infinite"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
      <ShareList :list="thumb_list"></ShareList>
      <Loading :loading="loading" :noMore="no_more" :hide="false"></Loading>
    </ul>
  </div>
</template>
<script>
import thumbup_list from '../../../../store/life/thumbup_list.js';
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
      id: this.$route.params.id
    };
  },
  title() {
    return '赞列表';
  },
  meta() {
    return `<meta name="description" content="赞列表">
    <meta name="keywords" content="赞列表">`;
  },
  methods: {
    infinite(){
      this.$store.dispatch('thumbup/thumbUpList', this.id);
    }
  },
  asyncData({store, route}) {
    store.registerModule('thumbup', thumbup_list);
    // entity_id: that.$route.query.id
    const id = route.params.id;
    return Promise.all([
      store.dispatch('thumbup/thumbUpList', id)
    ]);
  },
  mounted() {
    this.$store.registerModule('thumbup', thumbup_list, {preserveState: true});
  },
  computed: {
    ...mapState({
      thumb_list: (store) => store.thumbup.thumb_list,
      loading: (store) => store.thumbup.loading,
      no_more: (store) => store.thumbup.no_more
    })
  }
};
</script>
<style lang="scss" scoped>
.fans{
  position: absolute;
}
</style>
