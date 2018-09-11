<template>
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <div class="moment">
      <div class="moment-tags" v-if="hot_topic_list.length">
        <div class="tags-container">
          <span v-if="item.entity_title" v-for="(item,index) in hot_topic_list" :key="index" @click="paramsSkip('TopicDetail', {id: item.entity_id})">{{item.entity_title | titleFilter}}</span>
        </div>
      </div>
      <div v-infinite-scroll="infinite"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <public-list :listData="moment_list"></public-list>
          <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
      </div>
    </div>
  </transition>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../mixins/frequent.js';
  import moment_list from '../../../../store/life/moment_list.js';
  import {PublicList, Loading} from '../../../../components/mobile/business';

  export default {
    title() {
      return '动态列表';
    },
    meta() {
      return `<meta name="description" content="动态列表">
      <meta name="keywords" content="动态列表">`;
    },
    asyncData({store}) {
      store.registerModule('moment_list', moment_list);
      return Promise.all([
        store.dispatch('moment_list/getHotTopic'),
        store.dispatch('moment_list/getMomentList')
      ]);
    },
    components: {
      PublicList, Loading
    },
    mixins: [frequent],
    mounted() {
      this.$store.registerModule('moment_list', moment_list, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('moment_list', moment_list);
    },
    methods: {
      infinite() {
        this.$store.dispatch('moment_list/getMomentList');
      }
    },
    computed: {
      ...mapState({
        hot_topic_list: (store) => store.moment_list.hot_topic_list,
        moment_list: (store) => store.moment_list.moment_list,
        loadInfo: (store) => store.moment_list.loadInfo
      }),
      loading() {
        return this.$store.state.moment_list.loadInfo.loading;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .moment {
    position: absolute;
    width: 100%;
    background-color: #f5f5f5;
    .moment-tags {
      position: relative;
      height: 1.16rem;
      background-color: #fff;
      margin-bottom: 0.2rem;
      .tags-container {
        &::-webkit-scrollbar {
          display:none;
        }
        overflow: hidden;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
        height: 1.16rem;
        display: flex;
        align-items: center;
        span {
          margin-right: 0.2rem;
          padding: 0.15rem 0.24rem;
          border-radius: 0.28rem;
          background-color: #f2f2f2;
          font-size: 0.28rem;
          line-height: 0.28rem;
          text-align: center;
          color: $themeColor;
          &:first-child{
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
</style>


