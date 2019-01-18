<template>
  <ul class="hot-list">
    <li v-if="type !== 1" class="list-header" v-for="(item, index) in hotList" :key="index" @click="skipDetail(item.entity_id, item.entity_type)">
      <template v-if="index === 0">
        <!-- 图片 -->
        <div class="main-images">
          <img v-lazy="imageSize(item.entity_photos[0], '750x422')" alt="">
          <div class="mark">
            <span v-if="item.entity_type == 1">文章</span>
            <span v-if="item.entity_type == 2">活动</span>
            <span v-if="item.entity_type == 3">话题</span>
          </div>
        </div>
        <div class="main-desc">
          <h4>{{item.entity_title | titleFilter}}</h4>
        </div>
        <!-- 底部按钮 -->
      <div class="list-footer" v-if="item.entity_type !== 3">
        <!-- left -->
        <p v-if="item.entity_type == 1 || item.entity_type == 2" class="read">
          <span class="time" v-if="item.entity_type == 1">{{item.entity_statistic.read}} 次浏览</span>
          <span v-if="item.entity_type == 2">{{(item.entity_extra.enroll_limit === item.entity_extra.enroll_num) || item.entity_extra.activity_state === 3 ? `${timeFilter(item.entity_extra.activity_begin_time, 3)} 活动开始` : (item.entity_extra.activity_state === 4 ? '活动进行中' : '活动已结束')}}</span>
        </p>
        <p v-else>
          <span>{{item.publish_time  || item.publish_at | timeFilter(2)}}</span>
        </p>
        <!-- right -->
        <div class="apply-btn" v-if="item.entity_type === 2">
          <template v-if="item.entity_extra.enroll_limit <= item.entity_extra.enroll_num">
            <a href="javascript:;">查看活动</a>
          </template>
          <template v-else>
            <template v-if="item.entity_extra.activity_enroll_state === 1 || item.entity_extra.activity_enroll_state === 2 || item.entity_extra.activity_enroll_state === 3">
              <a href="javascript:;" v-if="item.entity_extra.activity_enroll_state === 0">报名未开始</a>
              <a href="javascript:;" v-if="item.entity_extra.activity_enroll_state === 1">立即报名</a>
              <a href="javascript:;" v-if="item.entity_extra.activity_enroll_state === 2">查看活动</a>
            </template>
            <template v-else>
              <a href="javascript:;" v-if="item.entity_extra.activity_state === 3">活动未开始</a>
              <a href="javascript:;" v-if="item.entity_extra.activity_state === 4">查看活动</a>
              <a href="javascript:;" v-if="item.entity_extra.activity_state === 5">查看活动</a>
            </template>
          </template>
        </div>
        <p v-else @click.stop="intercept">
          <span class="num">
            <i class="iconfont icon-content_praise_Co"></i>
            {{item.entity_statistic.comment || ' ' | scientific}}
          </span>
          <span class="num">
            <i class="iconfont icon-content_praise_"></i>
            {{item.entity_statistic.thumb_up || ' ' | scientific}}
          </span>
        </p>
      </div>
      </template>
      <template v-else>
        <div class="list-main">
          <img v-lazy="item.entity_photos[0]" alt="">
          <p>{{item.entity_title | titleFilter}}</p>
        </div>
      </template>
    </li>
    <li v-if="type === 1" class="topic-list" v-for="(item, index) in hotList.slice(0, 5)" :key="index" @click="skipDetail(item.entity_id, item.entity_type)">
      <div class="list-title">
        <img v-lazy="imageSize(item.entity_photos[0], '80x80')" alt="">
        <h4>{{item.entity_title | titleFilter}}</h4>
      </div>
      <p>{{item.entity_extra.sentence}} 条动态</p>
    </li>
  </ul>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';
  import timeFilter from '../../../utils/filters/timeFilter.js';

  export default {
    props: ['hotList', 'type'],
    mixins: [frequent],
    data() {
      return {
        imageSize,
        timeFilter
      };
    },
    methods: {
      skipDetail(id, type){
        let route = '';
        switch(+type) {
          case 1:
            route = 'article_detail';
            break;
          case 2:
            route = 'activity_detail';
            break;
          case 3:
            route = 'topic_detail';
            break;
          case 6:
            route = 'moment_detail';
            break;
          case 10:
            route = 'product_detail';
            break;
          default:
            break;
        }
        this.assign(route, id);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .hot-list {
    background-color: #fff;
    .list-header {
      .main-images {
        position: relative;
        img {
          width: 100%;
          height: 4.22rem;
        }
        .mark {
          position: absolute;
          right: 0;top: 0.3rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 0.7rem;
          height: 0.4rem;
          border-radius: 2px;
          background-color: rgba(000, 000, 000, 0.5);
          span {
            font-size: 0.24rem;
            color: #ffffff;
            display: flex;
            align-items: center;
            i {
              font-size: 0.3rem;
              line-height: 0.4rem;
            }
          }
        }
      }
      .main-desc {
        padding: 0 0.3rem;
        h4 {
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.54rem;
          letter-spacing: 0.1px;
          color: #222;
          margin-top: 0.21rem;
        }
        p {
          font-size: 0.32rem;
          line-height: 0.48rem;
          letter-spacing: 0.1px;
          color: $themeColor;
        }
      }
      .list-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.91rem;
        padding: 0 0.3rem 0.2rem;
        p {
          display: flex;
          align-items: center;
          &.read {
            .time {
              font-size: 0.26rem;
              line-height: 0.26rem;
              color: $subColor;
            }
          }
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.24rem;
            color: $subColor;
            &.num {
              margin-left: 0.24rem;
            }
          }
          i {
            font-size: 0.38rem;
            margin-right: 0.1rem;
          }
        }
        .apply-btn a{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          background-color: $darkBlue;
          font-size: 0.26rem;
          font-weight: 400;
          color: #fff;
        }
      }
      .activity-apply {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        margin-top: 0.24rem;
        span {
          font-size: 0.28rem;
          color: $subColor;
        }
        a {
          width: 1.72rem;;
          height: 0.6rem;;
          border-radius: 0.3rem;
          background-color: $darkBlue;
          font-size: 0.28rem;
          line-height: 0.6rem;
          text-align: center;
          color: #fff;
        }
      }
    }
    .list-main {
      display: flex;
      align-items: center;
      padding: 0.3rem;
      border-top: 0.01rem solid $borderColor;
      img {
        width: 1.28rem;
        height: 0.96rem;
      }
      p {
        flex: 1;
        margin-left: 0.2rem;
        font-size: 0.32rem;
        line-height: 0.48rem;
        letter-spacing: 1px;
        color: #222;
      }
    }
    .topic-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.24rem 0.3rem;
      border-bottom: 0.01rem solid $borderColor;
      &:last-child {
        border-bottom: 0;
      }
      .list-title {
        display: flex;
        align-items: center;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
        h4 {
          margin-left: 0.2rem;
          font-size: 0.32rem;
          font-weight: 300;
          line-height: 0.32rem;
          color: $themeColor;
        }
      }
      p {
        font-size: 0.26rem;
        line-height: 0.26rem;
        color: $themeColor;
      }
    }
  }
</style>


