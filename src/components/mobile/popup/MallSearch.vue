<template>
  <div class="mall-search">
    <!-- 热门搜索 -->
    <div class="hot" v-show="!keyword">
      <h4>热门搜索</h4>
      <p>
        <span v-for="(item, index) in hot_list" :key="index" @click="paramsSkip('SearchContent', {id: null, key: tem.text})">{{item.text}}</span>
      </p>
    </div>
    <!-- 联想list -->
    <ul class="list" v-show="keyword">
      <li v-for="(item, index) in search_list" :key="index" @click="paramsSkip('SearchContent', {id: null, key: item.text})">{{item.text}}</li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../mixins/frequent.js';

  export default {
    mixins: [frequent],
    props: ['keyword'],
    computed: mapState({
      hot_list: (store) => store.mall.hot_list,
      search_list: (store) => store.mall.search_list
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .mall-search {
    padding-top: 0.9rem;
    .hot {
      padding: 0 0.3rem;
      h4 {
        margin: 0.3rem 0;
        font-size: 0.28rem;
        font-weight: 300;
        line-height: 0.28rem;
        color: $themeColor;
      }
      p {
        display: flex;
        flex-wrap: wrap;
        span {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 0.3rem 0.3rem 0;
          padding: 0.13rem 0.18rem;
          border-radius: 0.04rem;
          background-color: $intervalColor;
          font-size: 0.32rem;
          color: $themeColor;
        }
      }
    }
    .list {
      li {
        height: 0.88rem;
        padding: 0 0.3rem;
        @include tofl(6.9rem);
        border-bottom: 0.01rem solid $borderColor;
        font-size: 0.28rem;
        line-height: 0.88rem;
        color: $themeColor;
      }
    }
  }
</style>

