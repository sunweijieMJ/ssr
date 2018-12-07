<template>
  <div class="activity-show" v-if="activity_info">
    <life-style></life-style>
    <div class="activity-title">
      <img v-lazy="imageSize(activity_info.entity_extra.activity_img.activity_surface, '160x160')" alt="">
      <div class="desc">
        <h4>{{activity_info.entity_title | titleFilter}}</h4>
        <p>愉悦度 {{activity_info.entity_extra.valence_relevant.valence | multiply(100)}}%，{{activity_info.entity_extra.valence_relevant.experience_show}} 条相关动态</p>
      </div>
    </div>
    <public-list v-if="activity_info.entity_extra.activity_dynamic_map" :listData="activity_info.entity_extra.activity_dynamic_map"></public-list>
    <open-app></open-app>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import imageSize from '../../../../utils/filters/imageSize.js';
  import titleFilter from '../../../../utils/filters/titleFilter.js';
  import activity_show from '../../../../store/life/activity_show.js';
  import {OpenApp} from '../../../../components/mobile/button';
  import {LifeStyle, PublicList} from '../../../../components/mobile/business';

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
    data() {
      return {
        imageSize
      };
    },
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
      box-sizing: border-box;
      display: flex;
      padding: 0.3rem;
      height: 2.05rem;
      border-bottom: 1px solid $borderColor;;
      img{
        width: 1.44rem;
        height: 1.44rem;
        border-radius: 0.04rem;
      }
      .desc{
        display: flex;
        flex-direction: column;
        margin-left: 0.2rem;
        h4 {
          margin-bottom: 0.18rem;
          font-size: 0.32rem;
          font-weight: 400;
          line-height: 150%;
          color: $themeColor;
        }
        p{
          font-size: 0.28rem;
          line-height: 100%;
          color: $themeColor;
        }
      }
    }
  }
</style>
