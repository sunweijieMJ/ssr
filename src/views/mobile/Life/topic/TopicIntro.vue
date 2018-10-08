<template>
  <div class="topic-intro" v-if="topic_detail && topic_detail[0]">
    <div class="public-title">
      <section>
        <a href="javascript:;" @click="$store.dispatch('topic_detail/cutToIntro', false)">
          <i class="iconfont icon-nav_ic_return"></i>
        </a>
        <h2>话题简介</h2>
      </section>
    </div>
    <div class="intro-detail" v-html="textFilter(topic_detail[0].topic_content)"></div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import textFilter from '../../../../utils/filters/textFilter.js';

  export default {
    data() {
      return {
        textFilter
      };
    },
    computed: mapState({
      topic_detail: (store) => store.topic_detail.topic_detail
    })
  };
</script>
<style lang="scss">
  .topic-intro{
    height: 100%;
    background-color: #ffffff;
    .public-title{
      width: 100%;
      height: 0.89rem;
      position: relative;
      section {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        width: 7.5rem;
        height: 0.88rem;
        padding: 0 0.3rem;
        border-bottom: 0.01rem solid #e5e5e5;
        z-index: 2000;
        background: #fff;
        a {
          position: absolute;
          left: 0.3rem;
          height: 0.88rem;
          display: flex;
          align-items: center;
          i {
            font-size: 0.46rem;
            color: #333;
          }
        }
        h2 {
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.88rem;
          text-align: center;
          font-weight: 300;
          color: #444444;
        }
      }
    }
    .intro-detail {
      padding: 0.3rem;
      font-size: 0.3rem;
      line-height: 0.5rem;
      color: #5e5e5e;
      p {
        margin-bottom: 0.3rem;
      }
      strong {
        font-weight: 400;
      }
    }
  }
</style>
