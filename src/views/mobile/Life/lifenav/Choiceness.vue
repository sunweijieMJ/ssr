<template>
  <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
    <div class="choiceness"
      v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <public-list class="stick" v-if="stick_list.length" :listData="stick_list" :stick="true"></public-list>
        <public-list :listData="fade_list"></public-list>
        <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
        <open-app></open-app>
    </div>
  </transition>
</template>
<script>
  import {mapState} from 'vuex';
  import choiceness_list from '../../../../store/life/choiceness_list.js';
  import {OpenApp} from '../../../../components/mobile/button';
  import {PublicList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return 'Lanehub 瓴里生活,发现不一样的生活体验,愉悦生活,从瓴里开始';
    },
    meta() {
      return `<meta name="description" content="一群各个行业领域的人聚合在一起，开启生活新的旅程，愉悦生活，joyful life 尽在瓴里！">
      <meta name="keywords" content="Lanehub 瓴里生活, 家具家居, 新设计，新体验，创造愉悦生活体验">`;
    },
    asyncData({store}) {
      store.registerModule('choiceness_list', choiceness_list);
      return Promise.all([
        store.dispatch('choiceness_list/getStickList'),
        store.dispatch('choiceness_list/getFocusList')
      ]);
    },
    components: {
      PublicList, Loading, OpenApp
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

