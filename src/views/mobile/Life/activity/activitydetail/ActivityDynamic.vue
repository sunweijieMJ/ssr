<template>
  <div class="activity-dynamic" v-if="activity_info.entity_extra.valence_relevant.experience_show">
    <div class="title" @click="assign('activityshow', activity_info.entity_id)">
      <h4>{{`体验秀 (${activity_info.entity_extra.valence_relevant.experience_show})`}}</h4>
      <p>
        <span>愉悦度</span><i>{{activity_info.entity_extra.valence_relevant.valence * 100}}%</i>
        <i class="iconfont icon-shopping_next"></i>
      </p>
    </div>
    <public-list :listData="activity_info.entity_extra.activity_dynamic_map.slice(0, 3)"></public-list>
    <div class="read-more" v-if="activity_info.entity_extra.activity_dynamic_map && activity_info.entity_extra.activity_dynamic_map.length > 3">
      <a href="javascript:;" @click="paramsSkip('ActivityShow', {id: activity_info.entity_id})">查看全部体验秀</a>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';
  import {PublicList} from '../../../../../components/mobile/business';

  export default {
    mixins: [frequent],
    components: {PublicList},
    computed: mapState({
      activity_info: (store) => store.activity_detail.activity_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .activity-dynamic{
    background-color: #ffffff;
    .title{
      height: 1.05rem;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid $borderColor;
      h4 {
        font-size: 0.34rem;
        font-weight: 400;
        color: $themeColor;
      }
      p {
        display: flex;
        align-items: center;
        span {
          font-size: 0.3rem;
          color: $themeColor;
        }
        i {
          margin-left: 0.1rem;
          font-size: 0.32rem;
          font-weight: 400;
          font-style: normal;
          color: $mallRed;
        }
        .iconfont {
          font-size: 12px;
          color: rgba(106,106,106,1);
          margin: 0 0 0 0.16rem;
        }
      }
    }
    .read-more{
      display: flex;
      justify-content: center;
      align-items: center;
      height:1.08rem;
      a {
        font-size: 0.28rem;
        color: $darkBlue;
      }
    }
  }
</style>

