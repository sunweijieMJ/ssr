<template>
  <div class="activity-detail" v-if="!cut_out" :class="{sold_out}">
    <life-style></life-style>
    <div v-if="!sold_out && activity_info">
      <activity-info></activity-info>
      <activity-dynamic></activity-dynamic>
      <activity-rules></activity-rules>
      <majordomo></majordomo>
      <activity-btn></activity-btn>
    </div>
    <div v-else class="sold-out">
      <i class="iconfont icon-activity_lb_error"></i>
      <p>活动已结束</p>
    </div>
  </div>
  <div v-else>
    <component :is="ActivityDesc"></component>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import titleFilter from '../../../../utils/filters/titleFilter.js';
  import ActivityDesc from './ActivityDesc.vue';
  import {Majordomo} from '../../../../components/mobile/button';
  import {LifeStyle} from '../../../../components/mobile/business';
  import {ActivityInfo, ActivityDynamic, ActivityRules, ActivityBtn} from './activitydetail/index.js';
  import activity_detail from '../../../../store/life/activity_detail.js';

  export default {
    title() {
      return `${this.activity_info ? titleFilter(this.activity_info.entity_title) : '活动详情'}`;
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
    mixins: [wechat],
    data() {
      return {
        ActivityDesc
      };
    },
    mounted(){
      let that = this;
      this.$store.registerModule('activity_detail', activity_detail, {preserveState: true});
      // 微信分享
      if(!that.activity_info) return;
      const title = titleFilter(that.activity_info.entity_title);
      const link = window.location.href;
      const desc = titleFilter(that.activity_info.entity_extra.activity_dynamic_map[0].entity_brief);
      const imgUrl = that.activity_info.entity_extra.activity_img.sunburn_img;
      that.wxInit(link, title, desc, imgUrl);
    },
    destroyed() {
      this.$store.unregisterModule('activity_detail', activity_detail);
    },
    computed: {
      ...mapState({
        activity_info: (store) => store.activity_detail.activity_info,
        sold_out: (store) => store.activity_detail.sold_out,
        cut_out: (store) => store.activity_detail.cut_out
      })
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .activity-detail{
    background-color: $intervalColor;
    &.sold_out {
      background-color: #fff;
    }
    .sold-out{
      padding-top: 1.1rem;
      text-align: center;
      i {
        font-size: 1.6rem;
        color: #d4d4d4;
      }
      p{
        margin-top: 0.2rem;
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


