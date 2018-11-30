<template>
  <div class="tips">
    <div class="title" @click="$store.dispatch('activity_detail/cutToDesc', true)">
      <h3>温馨提示</h3>
      <p>查看全部<i class="iconfont icon-shopping_next"></i></p>
    </div>
    <div class="content" v-if="activity_info">
      <li v-for="(val, index) in activity_info.entity_extra.reminder" :key="index">
        <span>{{index + 1}}.&nbsp;</span>
        <p>{{val}}</p>
      </li>
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
  @import '../../../../../assets/scss/_base.scss';

  .tips {
    padding: 0.3rem 0.3rem 0.4rem;
    background-color: #ffffff;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.2rem;
      h3{
        font-size: 0.34rem;
        line-height: 0.34rem;
        font-weight: 400;
        color: $themeColor;
      }
      p{
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        line-height: 0.24rem;
        color: $subColor;
        i {
          font-size: 12px;
          color: rgba(106,106,106,1);
          margin-left: 0.17rem;
        }
      }
    }
    .content{
      max-height: 3.78rem;
      overflow: hidden;
      li{
        list-style: none;
        display: flex;
        span{
          font-size: 0.3rem;
          line-height: 150%;
        }
        p{
          font-size: 0.3rem;
          line-height: 150%;
          color: $subColor;
        }
      }
    }
  }
</style>
