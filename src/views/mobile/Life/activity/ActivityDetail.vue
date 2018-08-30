<template>
  <div class="activity-detail">
    <life-style></life-style>
    <div v-if="!sold_out">
      <activity-info></activity-info>
      <activity-dynamic></activity-dynamic>
      <activity-rules></activity-rules>
      <majordomo></majordomo>
      <activity-btn></activity-btn>
    </div>
    <div v-else class="sold-out">
      <img src="../../../../../static/mobile/svg/activity/activity_lb_error.svg" alt="">
      <p>活动已结束</p>
    </div>
  </div>
</template>
<script>
  import {LifeStyle, Majordomo} from '../../../../components/mobile/business';
  import {ActivityInfo, ActivityDynamic, ActivityRules, ActivityBtn} from './activitydetail/index.js';
  import activity_detail from '../../../../store/life/activity_detail.js';
  import {mapState} from 'vuex';

  export default {
    title() {
      return '活动详情';
    },
    meta() {
      return `<meta name="description" content="活动详情">
      <meta name="keywords" content="活动详情">`;
    },
    asyncData({store, route}) {
      store.registerModule('activity_detail', activity_detail);
      const id = route.params.id;
      return Promise.all([
        store.dispatch('activity_detail/getActivityDetail', id),
        store.dispatch('getGlobal')
      ]);
    },
    components: {
      LifeStyle, ActivityInfo, ActivityDynamic, ActivityRules, Majordomo, ActivityBtn
    },
    mounted(){
      this.$store.registerModule('activity_detail', activity_detail, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('activity_detail', activity_detail);
    },
    computed: {
      ...mapState({
        activity_info: (store) => store.activity_detail.activity_info,
        sold_out: (store) => store.activity_detail.sold_out
      })
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .activity-detail{
    padding-bottom: 1.08rem;
    background-color: #f1f1f1;
    .sold-out{
      img{
        width: 1.6rem;
        margin: 1.1rem auto 0.2rem;
      }
      p{
        font-size: 0.4rem;
        font-weight: 300;
        letter-spacing: 0.3px;
        text-align: center;
        color: $themeColor;
        text-align: center;
      }
    }
  }
</style>

