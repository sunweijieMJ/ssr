<template>
  <div class="activity-info" v-if="activity_info">
    <div class="info-banner">
      <vue-swiper
        :images="activity_info.entity_extra.activity_img.cover_imgs" :type="6"
        @to-parent="listenIndex">
      </vue-swiper>
      <span v-if="activity_info.entity_extra.activity_img.cover_imgs.length > 1">{{current_index + 1}}/{{activity_info.entity_extra.activity_img.cover_imgs.length}}</span>
    </div>
    <div class="info-detail">
      <h3>{{activity_info.entity_title | titleFilter}}</h3>
      <p v-if="!activity_info.entity_extra.activity_price">{{activity_info.entity_extra.activity_detail_brief}}</p>
      <div class="info-price" v-if="activity_info.entity_extra.activity_price" :class="{enrollend: activity_info.entity_extra.activity_enroll_state === 2}">
        <a href="javascript:;" class="selected">
          <i class="iconfont icon-detail_list_lb_coupo2"></i>
          <span>{{activity_info.entity_extra.activity_price / 10}}</span>
        </a>
        <a href="javascript:;" class="unselected" v-if="activity_info.entity_extra.activity_enroll_state !== 2">
          <i>¥</i><span>{{activity_info.entity_extra.activity_price / 100}}</span>
        </a>
      </div>
    </div>
    <div class="info-btn">
      <p>{{activity_info.entity_extra.activity_begin_time | activityTime(activity_info.entity_extra.activity_end_time)}}</p>
    </div>
    <div class="info-btn" @click="queryAssign('tools/map',{address:activity_info.entity_extra.activity_address,latitude:activity_info.entity_extra.gor_coordinate.latitude,longitude:activity_info.entity_extra.gor_coordinate.longitude})">
      <p>{{activity_info.entity_extra.activity_address}}</p>
      <i class="iconfont icon-shopping_next"></i>
    </div>
    <div class="info-btn">
      <p>{{activity_info.entity_extra.enroll_num >= 3 ? `${activity_info.entity_extra.enroll_num}人已报名` : '活动报名中，等你来体验'}}</p>
      <div class="image-box" v-if="activity_info.entity_extra.enroll_num">
        <p>
          <img v-for="(val, i) in activity_info.entity_extra.enroll_photo.slice(0, 8)" :key="i" :src="val" alt="">
        </p>
        <!-- <i class="iconfont icon-shopping_next"></i> -->
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';
  import fillZero from '../../../../../utils/filters/fillZero.js';
  import {VueSwiper} from '../../../../../components/mobile/public';

  export default {
    mixins: [frequent],
    components: {VueSwiper},
    data() {
      return {
        current_index: 0
      };
    },
    methods: {
      // swiper回调函数
      listenIndex(data){
        this.current_index = data;
      }
    },
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

  .activity-info {
    background-color: #fff;
    overflow: hidden;
    .info-banner {
      position: relative;
      height: 7.5rem;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0.3rem;bottom: 0.3rem;
        width: 0.64rem;
        height: 0.32rem;
        pointer-events: none;
        border-radius: 0.3rem;
        background-color: rgba(0,0,0,0.3);
        font-size: 0.2rem;
        color: #fff;
      }
    }
    .info-detail{
      padding: 0.4rem 0.3rem;
      h3{
        font-size: 0.44rem;
        font-weight: 400;
        line-height: 130%;
        color: $themeColor;
      }
      p {
        @include tofl(6.9rem);
        margin-top: 0.16rem;
        font-size: 0.28rem;
        line-height: 100%;
        color: $themeColor;
      }
      .info-price {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top: 0.3rem;
        &.enrollend a{
          padding: 0 !important;
          border: 0 !important;
        }
        a{
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 0.64rem;
          border-radius: 0.4rem;
          padding: 0 0.2rem;
          border: solid 0.01rem $themeColor;
          margin-right:0.3rem;
          &:last-child{
            margin-right: 0;
          }
          span{
            font-size: 0.34rem;
          }
          .iconfont {
            margin-right: 0.08rem;
            font-size: 0.26rem;
            color: #a0a0a0;
          }
          i{
            font-size: 0.28rem;
            font-style: normal;
          }
          &.unselected{
            border-color: #B9B9B9;
            color: $themeColor;
          }
          &.selected{
            border: 0.02rem solid;
            font-weight: 400;
            border-color: #e00c00;
            color: #e00c00;
            i {
              color: #e00c00;
            }
          }
        }
      }
    }
    .info-btn{
      box-sizing: border-box;
      padding: 0 0.3rem;
      height: 0.9rem;
      border-top: 0.01rem solid $borderColor;;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        @include tofl(6.6rem);
        font-size: 0.3rem;
        line-height: 0.3rem;
        color: $themeColor;
      }
      .image-box {
        display: flex;
        align-items: center;
        p {
          display: flex;
          align-items: center;
          img {
            width: 0.46rem;
            height: 0.46rem;
            margin-left: 0.08rem;
            border-radius: 50%;
          }
        }
      }
      i {
        font-size: 12px;
        color: rgba(106,106,106,1);
      }
    }
  }
</style>
