<template>
  <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
    <div class="choiceness"
      v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
        <PublicList :listData="contentTop" v-if="contentTop.length"></PublicList>
        <PublicList :listData="fadeList"></PublicList>
        <Loading :loading="loading" :noMore="no_more" :hide="false"></Loading>
    </div>
  </transition>
</template>
<script>
import PublicList from '../../../../components/mobile/business/PublicList';
import Loading from '../../../../components/mobile/business/Loading';
import LifeApi from '../../../../api/Life.js';

export default {
  title() {
    return '精选';
  },
  meta() {
    return `<meta name="description" content="精选">
    <meta name="keywords" content="精选">`;
  },
  components: {
    PublicList, Loading
  },
  data() {
    return {
      fadeList: [], // ETC 精选
      contentTop: [], // ETC 置顶列表
      created_at: 0, // ETC 当前页
      loading: false, // ETC 加载中
      no_more: false, // ETC 触底
      block: false // ETC 是否进入缓存
    };
  },
  created(){
    this.getContentTop();
  },
  mounted() {
    let that = this;
    if(window.sessionStorage.getItem('scrollDistance')){
      that.distance = JSON.parse(window.sessionStorage.getItem('scrollDistance'));
      window.scrollTo(0, that.distance.Choiceness);
    }
  },
  // 激活keep-alive
  activated(){
    let that = this;
    if(window.sessionStorage.getItem('scrollDistance')){
      that.distance = JSON.parse(window.sessionStorage.getItem('scrollDistance'));
      window.scrollTo(0, that.distance.Choiceness);
    }
    that.block = false;
  },
  // 停用keep-alive
  deactivated(){
    this.block = true;
  },
  methods: {
    infinite(){
      let that = this;
      if(that.block) return;
      that.loading = true;
      LifeApi().getFocusList(that.created_at, 1).then(res => {
        if(!res.state) {
          that.created_at = res.created_at;
          that.fadeList = that.fadeList.concat(res.items);

          that.loading = false;
          if(res.total < 0){
            that.loading = true;
            that.no_more = true;
          }
        }
      });
    },
    getContentTop() {
      let that = this;
      LifeApi().getStickList().then(res => {
        if(!res.state) that.contentTop = res;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .choiceness{
    position: absolute;
    width: 100%;
    padding-top: 0.2rem;
    background-color: #f1f1f1;
  }
</style>
