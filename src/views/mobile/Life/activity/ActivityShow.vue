<template>
  <div class="activity-show" v-if="activity_info">
    <life-style></life-style>
    <div class="activity-title">
      <dl>
        <dt>
          <img :src="activity_info.entity_extra.activity_img.activity_surface" alt="">
        </dt>
        <div class="desc">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-detail_lb_happiness_"></use>
            </svg>
            <span>{{Math.round(activity_info.entity_extra.valence_relevant.valence * 100)}}%</span>
            <span>愉悦度</span>
          </p>
          <p>{{activity_info.entity_extra.valence_relevant.experience_show}} 条体验秀</p>
        </div>
      </dl>
    </div>
    <public-list v-if="activity_info.entity_extra.activity_dynamic_map" :listData="activity_info.entity_extra.activity_dynamic_map"></public-list>
    <open-app></open-app>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import titleFilter from '../../../../utils/filters/titleFilter.js';
  import activity_show from '../../../../store/life/activity_show.js';
  import {LifeStyle, PublicList, OpenApp} from '../../../../components/mobile/business';

  export default {
    title() {
      return `${this.activity_info ? titleFilter(this.activity_info.entity_title) : '活动秀'}`;
    },
    meta() {
      return `<meta name="description" content="活动秀">
      <meta name="keywords" content="活动秀">`;
    },
    asyncData({store, route}) {
      store.registerModule('activity_show', activity_show);
      const id = route.params.id;
      return Promise.all([store.dispatch('activity_show/getActivityDetail', id)]);
    },
    components: {
      LifeStyle, PublicList, OpenApp
    },
    mixins: [wechat],
    mounted(){
      let that = this;
      this.$store.registerModule('activity_show', activity_show, {preserveState: true});
      // 微信分享
      if(!that.activity_info) return;
      const link = window.location.href;
      const title = titleFilter(that.activity_info.entity_title);
      const desc = `商品愉悦度${that.activity_info.entity_extra.valence_relevant.valence * 100}%\n${that.activity_info.entity_extra.valence_relevant.experience_show}条体验秀`;
      const imgUrl = that.activity_info.entity_extra.activity_img.activity_surface;
      that.wxInit(link, title, desc, imgUrl);
    },
    destroyed() {
      this.$store.unregisterModule('activity_show', activity_show);
    },
    computed: mapState({
      activity_info: (store) => store.activity_show.activity_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .activity-show{
    background-color: #ffffff;
    .activity-title{
      padding: 0.3rem;
      height: 1.6rem;
      border-bottom: 1px solid $borderColor;;
      dl{
        display: flex;
        dt{
          img{
            width: 1.6rem;
          }
        }
      }
      .desc{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 0.3rem;
        p{
          font-size: 0.28rem;
          font-weight: 300;
          color: #444;
          display: flex;
          align-items: center;
          &:first-child{
            margin-bottom: 0.14rem;
          }
          svg {
            width: 0.48rem;
            height: 0.48rem;
          }
          span{
            font-size: 0.24rem;
            font-weight: 300;
            color: $subColor;
            &:first-of-type{
              font-size: 0.32rem;
              font-weight: 300;
              color: $mallRed;
              margin: 0 0.1rem;
            }
          }
        }
      }
    }
  }
</style>
