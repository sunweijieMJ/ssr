<template>
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <div class="discovery-list">
      <div class="search-user">
        <div class="input">
          <i class="iconfont icon-search_lb_search"></i>
          <input type="text" placeholder="搜索昵称/签名" @focus="searchUser">
        </div>
      </div>
      <template v-if="!searchpopup">
        <div class="hot-activity">
          <h3 @click="querySkip('ActivityList')">
            <span>热门活动</span>
            <a href="javascript:;">查看全部</a>
          </h3>
          <hot-list :hotList="hot_activity"></hot-list>
        </div>
        <div class="hot-article">
          <h3 @click="querySkip('ArticleList')">
            <span>热门文章</span>
            <a href="javascript:;">查看全部</a>
          </h3>
          <hot-list :hotList="hot_article"></hot-list>
        </div>
        <div class="hot-topic">
          <h3>
            <span>热门话题</span>
          </h3>
          <hot-list :hotList="hot_topic" :type="1"></hot-list>
        </div>
      </template>
      <div class="search-popup" v-else>
        <component :is="UserSearch" @closePopup="closePopup"></component>
      </div>
    </div>
  </transition>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../mixins/frequent.js';
  import {HotList} from '../../../../components/mobile/business';
  import UserSearch from './discovery/UserSearch.vue';
  import discovery_list from '../../../../store/life/discovery_list.js';

  export default {
    title() {
      return '热门列表';
    },
    meta() {
      return `<meta name="description" content="热门列表">
      <meta name="keywords" content="热门列表">`;
    },
    asyncData({store}) {
      store.registerModule('discovery_list', discovery_list);
      return Promise.all([store.dispatch('discovery_list/getDiscoveryList')]);
    },
    components: {HotList},
    mixins: [frequent],
    data() {
      return {
        searchpopup: false,
        UserSearch
      };
    },
    mounted() {
      this.$store.registerModule('discovery_list', discovery_list, {preserveState: true});
    },
    methods: {
      searchUser() {
        let that = this;
        that.searchpopup = true;
        that.$store.dispatch('discovery_list/getUserSearchList');
      },
      closePopup(data) {
        this.searchpopup = data;
      }
    },
    destroyed() {
      this.$store.unregisterModule('discovery_list', discovery_list);
    },
    computed: mapState({
      hot_activity: (store) => store.discovery_list.hot_activity,
      hot_article: (store) => store.discovery_list.hot_article,
      hot_topic: (store) => store.discovery_list.hot_topic
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .discovery-list {
    position: absolute;
    width: 100%;
    background-color: $intervalColor;
    .search-user {
      height: 0.56rem;
      padding: 0.16rem 0.3rem;
      background-color: #fff;
      border-bottom: 0.01rem solid $borderColor;
      .input {
        display: flex;
        align-items: center;
        width: 6.7rem;
        height: 0.56rem;
        padding-left: 0.2rem;
        margin: auto;
        border-radius: 0.04rem;
        background-color: #f5f5f5;
        i {
          margin-right: 0.1rem;
          font-size: 0.3rem;
        }
        input {
          width: 6rem;
          height: 0.56rem;
          padding: 0;
          font-size:0.3rem;
          line-height: 0.56rem;
          outline: none;
          border: none;
          background-color:#f5f5f5;
          &::-webkit-input-placeholder {
            font-size: 0.28rem;
            font-weight: 300;
            line-height: 0.56rem;
            color: #888;
          }
          &:-moz-placeholder{
            font-size: 0.28rem;
            font-weight: 300;
            line-height: 0.56rem;
            color: #888;
          }
          &::-moz-placeholder{
            font-size: 0.28rem;
            font-weight: 300;
            line-height: 0.56rem;
            color: #888;
          }
          &:-ms-input-placeholder{
            font-size: 0.28rem;
            font-weight: 300;
            line-height: 0.56rem;
            color: #888;
          }
        }
      }
    }
    .hot-activity, .hot-article, .hot-topic {
      &.hot-topic {
        margin-bottom: 0;
      }
      margin-bottom: 0.2rem;
      background-color: #fff;
      h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.16rem;
        padding: 0 0.3rem;
        font-weight: 400;
        span {
          font-size: 0.36rem;
          line-height: 1;
          color: #222;
        }
        a {
          font-size: 0.28rem;
          line-height: 1;
          color: $darkBlue;
        }
      }
    }
  }
  .search-popup {
    position: absolute;
    width: 100%;
    top: -1.88rem;
    z-index: 3000 !important;
  }
</style>



