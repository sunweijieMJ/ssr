<template>
  <div class="activity-rules" v-if="activity_info">
    <div class="public-title">
      <section>
        <a href="javascript:;" @click="$store.dispatch('activity_detail/cutToDesc', false)">
          <i class="iconfont icon-nav_ic_return"></i>
        </a>
        <h2>活动详情</h2>
      </section>
    </div>
    <ul>
      <li v-for="(item,index) in activity_info.entity_extra.activity_detail_desc" :key="index">
        <p v-if="item !== ''">{{item}}</p>
        <span v-if="item === ''"></span>
      </li>
    </ul>
    <div class="tip">
      <h4>温馨提示</h4>
      <p v-for="(val, index) in activity_info.entity_extra.reminder" :key="index">{{index+1}}. {{val}}</p>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    computed: mapState({
      activity_info: (store) => store.activity_detail.activity_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .activity-rules{
    background-color: $intervalColor;
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
    ul{
      background-color: #fff;
      padding: 0.3rem;
      margin-bottom: 0.2rem;
      li{
        h4{
          font-size: 0.32rem;
          font-weight: 300;
          color: $themeColor;
          margin-bottom: 0.2rem;
        }
        p{
          font-size: 0.32rem;
          font-weight: 300;
          line-height: 0.48rem;
          color: $themeColor;
        }
        span{
          display: block;
          margin-bottom: 0.4rem;
        }
      }
    }
    .tip{
      background-color: #fff;
      padding: 0.3rem;
      h4{
        font-size: 0.3rem;
        font-weight: 400;
        color: $themeColor;
        margin-bottom: 0.2rem;
      }
      p{
        font-size: 0.32rem;
        font-weight: 300;
        line-height: 0.48rem;
        color: $themeColor;
      }
    }
  }
</style>
