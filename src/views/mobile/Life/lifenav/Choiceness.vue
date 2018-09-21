<template>
  <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
    <div class="choiceness"
      v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <public-list class="stick" v-if="stick_list.length" :listData="stick_list" :stick="true"></public-list>
        <public-list :listData="fade_list"></public-list>
        <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
    </div>
  </transition>
</template>
<script>
  import {mapState} from 'vuex';
  import choiceness_list from '../../../../store/life/choiceness_list.js';
  import {PublicList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '推荐列表';
    },
    meta() {
      return `<meta name="description" content="推荐列表">
      <meta name="keywords" content="推荐列表">`;
    },
    asyncData({store}) {
      store.registerModule('choiceness_list', choiceness_list);
      return Promise.all([
        store.dispatch('choiceness_list/getStickList'),
        store.dispatch('choiceness_list/getFocusList')
      ]);
    },
    components: {
      PublicList, Loading
    },
    mounted() {
      this.$store.registerModule('choiceness_list', choiceness_list, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('choiceness_list', choiceness_list);
    },
    methods: {
      infinite(){
        this.$store.dispatch('choiceness_list/getFocusList');
      }
    },
    computed: {
      ...mapState({
        stick_list: (store) => store.choiceness_list.stick_list,
        fade_list: (store) => store.choiceness_list.fade_list,
        loadInfo: (store) => store.choiceness_list.loadInfo
      }),
      loading() {
        return this.$store.state.choiceness_list.loadInfo.loading;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .choiceness{
    position: absolute;
    width: 100%;
    padding-top: 0.2rem;
    background-color: $intervalColor;
  }
</style>
<style lang="scss">
  @import '../../../../assets/scss/_base.scss';

  .choiceness {
    .stick li {
      border-bottom: 0.01rem solid $borderColor !important;
    }
  }
</style>

