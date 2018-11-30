<template>
  <div class="activity-detail" v-if="!cut_out" :class="{sold_out}">
    <life-style></life-style>
    <div v-if="!sold_out && activity_info">
      <activity-info></activity-info>
      <activity-dynamic v-if="activity_info.entity_extra.activity_state !== 3"></activity-dynamic>
      <div class="desc">
        <activity-desc v-if="description.activity_description" :response="description"></activity-desc>
        <activity-tips></activity-tips>
      </div>
      <activity-dynamic v-if="activity_info.entity_extra.activity_state === 3"></activity-dynamic>
      <majordomo></majordomo>
      <open-app></open-app>
    </div>
    <div v-else class="sold-out">
      <i class="iconfont icon-activity_lb_error"></i>
      <p>活动已结束</p>
    </div>
  </div>
  <div v-else>
    <component :is="ActivityRules"></component>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import titleFilter from '../../../../utils/filters/titleFilter.js';
  import activity_detail from '../../../../store/life/activity_detail.js';
  import ActivityRules from './ActivityRules.vue';
  import {Majordomo, OpenApp} from '../../../../components/mobile/button';
  import {LifeStyle} from '../../../../components/mobile/business';
  import ActivityDesc from '../../../../components/app/ActivityDesc.vue';
  import {ActivityInfo, ActivityTips, ActivityDynamic} from './activitydetail/index.js';


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
        store.dispatch('activity_detail/getActivityDesc', id),
        store.dispatch('getGlobal')
      ]);
    },
    components: {
      LifeStyle, ActivityInfo, ActivityTips, ActivityDesc, ActivityDynamic, Majordomo, OpenApp
    },
    mixins: [wechat],
    data() {
      return {
        ActivityRules
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
        description: (store) => store.activity_detail.description,
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
    .desc, .activity-dynamic {
      margin: 0.2rem 0;
    }
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


