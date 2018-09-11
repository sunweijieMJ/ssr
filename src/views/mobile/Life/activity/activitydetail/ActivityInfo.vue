<template>
  <div class="activity-info" v-if="activity_info">
    <div class="info-detail">
      <h3>{{activity_info.entity_title | titleFilter}}</h3>
      <integral-price :minPrice="activity_info.entity_extra.activity_price" :maxPrice="activity_info.entity_extra.activity_price"></integral-price>
    </div>
    <div class="activity-btn">
      <p>
        <i class="iconfont icon-clock_lb_normal"></i>
        <span>{{activity_info.entity_extra.activity_begin_time | activityTime(activity_info.entity_extra.activity_end_time)}}</span>
      </p>
    </div>
    <div class="activity-btn">
      <p>
        <i class="iconfont icon-location_lb_normal"></i>
        <span>{{activity_info.entity_extra.activity_address}}</span>
      </p>
      <i class="iconfont icon-shopping_next"></i>
    </div>
    <div class="activity-btn" @click="$store.dispatch('activity_detail/cutToDesc', true)">
      <p>
        <i class="iconfont icon-introduction_lb_norm"></i>
        <span>查看活动详情</span>
      </p>
      <i class="iconfont icon-shopping_next"></i>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {IntegralPrice} from '../../../../../components/mobile/business';
  import fillZero from '../../../../../utils/filters/fillZero.js';

  export default {
    components: {IntegralPrice},
    filters: {
      activityTime(begin_time, end_time) {
        // Safari只支持yyyy/mm/dd
        if (typeof begin_time === 'string') begin_time = begin_time.split('-').join('/');
        if (typeof end_time === 'string') end_time = end_time.split('-').join('/');

        const timestamp = new Date(begin_time).getTime();
        const difference = new Date(end_time).getTime() - timestamp;
        const remain_hours = difference / (1000 * 3600);

        // 获取
        const month = new Date(timestamp).getMonth() + 1;
        const date = new Date(timestamp).getDate();
        const hours = new Date(timestamp).getHours();
        const minutes = new Date(timestamp).getMinutes();
        return `${month}月${date}日 ${fillZero(hours)}:${fillZero(minutes)} (${Math.floor(remain_hours)}小时)`;
      }
    },
    computed: mapState({
      activity_info: (store) => store.activity_detail.activity_info
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .activity-info{
    background-color: #fff;
    margin-bottom: 0.2rem;
    overflow: hidden;
    .info-detail{
      padding: 0.2rem 0.3rem;
      h3{
        font-size: 0.46rem;
        font-weight: 400;
        line-height: 0.69rem;
        color: $themeColor;
      }
    }
    .activity-btn{
      padding: 0 0.3rem;
      height: 0.88rem;
      border-top: 0.01rem solid $borderColor;;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
          font-size: 0.32rem;
          line-height: 0.88rem;
        }
        span{
          font-size: 0.3rem;
          font-weight: 300;
          color: $themeColor;
          margin-left: 0.1rem;
          max-width: 6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      i {
        font-size: 12px;
        color: rgba(106,106,106,1);
      }
    }
  }
</style>
