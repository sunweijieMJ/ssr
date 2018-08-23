<template>
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <div class="moment">
      <div class="moment-tags" v-if="hot_topic_list.length">
        <div class="tags-container">
          <span v-for="(item,index) in hot_topic_list" :key="index" v-if="item.entity_title">{{item.entity_title | titleFilter}}</span>
        </div>
      </div>
      <div class="moment-content"
        v-infinite-scroll="infinite"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <PublicList :listData="moment_list"></PublicList>
          <Loading :loading="loading" :noMore="no_more" :hide="false"></Loading>
      </div>
    </div>
  </transition>
</template>
<script>
import PublicList from '../../../../components/mobile/business/PublicList';
import Loading from '../../../../components/mobile/business/Loading';
import frequent from '../../../../mixins/frequent';
import LifeApi from '../../../../api/life/Life.js';

export default {
  title() {
    return '动态';
  },
  meta() {
    return `<meta name="description" content="动态">
    <meta name="keywords" content="动态">`;
  },
  mixins: [frequent],
  components: {
    PublicList, Loading
  },
  data(){
    return{
      moment_list: [],
      hot_topic_list: [],
      current_page: 0, // ETC 当前页码
      page_total: '', // ETC 总页数
      loading: false, // ETC 加载中
      no_more: false, // ETC 到底
      block: false // ETC 是否进入缓存
    };
  },
  created() {
    this.getHotTopic();
  },
  mounted() {
    let that = this;
    if(window.sessionStorage.getItem('scrollDistance')) {
      that.distance = JSON.parse(window.sessionStorage.getItem('scrollDistance'));
      window.scrollTo(0, that.distance.Dynamic);
    }
  },
  activated(){
    let that = this;
    if(window.sessionStorage.getItem('scrollDistance')) {
      that.distance = JSON.parse(window.sessionStorage.getItem('scrollDistance'));
      window.scrollTo(0, that.distance.Dynamic);
    }
    that.block = false;
  },
  deactivated(){
    this.block = true;
  },
  methods: {
    getHotTopic(){
      let that = this;
      LifeApi().getHotTopicList().then(res => {
        if(!res.state) that.hot_topic_list = res;
      });
    },
    infinite() {
      let that = this;
      if(that.block) return;
      that.loading = true;
      LifeApi().getMomentList(++that.current_page).then(res => {
        if(!res.state) {
          that.page_total = res.page_total;
          that.moment_list = that.moment_list.concat(res.data);
          // 触底判断
          that.loading = false;
          if(that.current_page >= that.page_total || !that.moment_list.length){
            that.loading = true;
            that.no_more = true;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .moment{
    position: absolute;
    width: 100%;
    background-color: #f1f1f1;
    .moment-tags{
      position: relative;
      height: 1.16rem;
      background-color: #ffffff;
      border-bottom: 1px solid $borderColor;
      margin-bottom: 0.2rem;
      .tags-container{
        &::-webkit-scrollbar {display:none}
        overflow: hidden;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
        position: relative;
        left: 0;top: 0;
        width: 100%;
        height: 1.16rem;
        display: flex;
        align-items: center;
        span{
          margin-right: 0.2rem;
          padding: 0.15rem 0.24rem;
          border-radius: 0.28rem;
          background-color: #f2f2f2;
          font-size: 0.28rem;
          font-weight: 300;
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


