<template>
  <div class="activity-dynamic">
    <div class="title" v-if="activity_info.entity_extra.valence_relevant && (activity_info.entity_extra.activity_state === 4 || activity_info.entity_extra.activity_state === 5)"
      @click="paramsSkip('ActivityShow', {id: activity_info.entity_id})">
      <div class="title-L">
        <p>愉悦度</p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-detail_lb_happiness_"></use>
          </svg>
          <i>{{Math.round(activity_info.entity_extra.valence_relevant.valence * 100)}}%</i>
        </p>
      </div>
      <div class="title-M">
        <p>{{activity_info.entity_extra.enroll_num}}人报名，{{activity_info.entity_extra.valence_relevant.experience_show}}条体验秀</p>
        <p v-if="activity_info.entity_extra.valence_relevant.experience_photo">
          <img :src="val | imageSize('56x56')" v-for="(val,index) in activity_info.entity_extra.valence_relevant.experience_photo.slice(0, 8)" :key="index" alt="">
        </p>
      </div>
      <i class="iconfont icon-shopping_next"></i>
    </div>
    <div class="sub-title" v-else>
      <p>{{activity_info.entity_extra.enroll_num ? `${activity_info.entity_extra.enroll_num}人已报名` : '活动报名中，等你来体验'}}</p>
      <p v-if="activity_info.entity_extra.enroll_photo">
        <img :src="val | imageSize('56x56')" v-for="(val,index) in activity_info.entity_extra.enroll_photo.slice(0, 8)" :key="index" alt="">
      </p>
    </div>
    <public-list :listData="activity_info.entity_extra.activity_dynamic_map.slice(0, 3)"></public-list>
    <div class="read-more" v-if="activity_info.entity_extra.activity_dynamic_map && activity_info.entity_extra.activity_dynamic_map.length > 3">
      <a href="javascript:;" @click="paramsSkip('ActivityShow', {id: activity_info.entity_id})">查看 {{activity_info.entity_extra.activity_dynamic_map.length}} 条体验秀</a>
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
    margin-bottom: 0.2rem;
    .title{
      padding: 0 0.3rem;
      height: 1.58rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 0.01rem solid $borderColor;;
      .title-L {
        width: 1.6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p{
          display: flex;
          align-items: center;
          height: 0.5rem;
          font-size: 0.28rem;
          font-weight: 300;
          color: $themeColor;
          text-align: center;
          svg {
            width: 0.48rem;
            height: 0.48rem;
            margin-right: 0.05rem;
          }
          i{
            font-style: normal;
            font-size: 0.32rem;
            color: $mallRed;
          }
        }
      }
      .title-M {
        flex: 1;
        padding-left: 0.24rem;
        border-left: 0.01rem solid $borderColor;
        p{
          font-size: 0.28rem;
          font-weight: 300;
          color: $themeColor;
          &:first-child{
            margin-bottom: 0.2rem;
          }
          img{
            float: left;
            width: 0.46rem;
            border-radius: 50%;
            margin-right: 0.08rem;
            &:last-child{
              margin-right: 0 none;
            }
          }
        }
      }
      i{
        font-size: 12px;
        color: rgba(106,106,106,1);
      }
    }
    .sub-title{
      height: 1.12rem;
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid $borderColor;;
      p{
        font-size: 0.32rem;
        font-weight: 300;
        color: $themeColor;
        img{
          float: left;
          width: 0.46rem;
          border-radius: 50%;
          margin-right: 0.08rem;
          &:last-child{
            margin-right: 0 none;
          }
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
        font-family: Helvetica;
        font-weight: 300;
        color: $darkBlue;
      }
    }
  }
</style>

