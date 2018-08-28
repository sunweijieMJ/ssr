<template>
  <ul class="public-list">
    <li v-for="(item,index) in listData" :key="index" v-if="item" @click="skipDetail(item.entity_id, item.entity_type)">
      <!-- 列表头部用户信息 -->
      <div class="list-header">
        <div class="header-author">
          <img v-lazy="imageSize(item.entity_user_info ? item.entity_user_info.user_photo_url : '','80x80')" alt="">
          <div class="author-name">
            <h4>
              <span>{{item.entity_user_info ? item.entity_user_info.user_name : ''}}</span>
              <img v-if="item.entity_user_info.user_type == 2" src="../../../../static/app/svg/customer/list_ic_talent_30.svg" alt="">
              <img v-if="item.entity_user_info.user_type == 3" src="../../../../static/app/svg/customer/list_ic_lanehuber_30.svg" alt="">
            </h4>
            <p v-if="item.name || item.entity_user_info.signiture">
              <span v-if="item.name">{{item.name}}</span>
              <span v-else>{{item.entity_user_info.signiture}}</span>
            </p>
          </div>
        </div>
        <focus-btn v-if="curRoute !== 'Personal' && curRoute !== 'ProductDetail' && curRoute !== 'BuyerShow' && curRoute !== 'ActivityDetail' && curRoute !== 'ActivityShow'"></focus-btn>
        <span v-if="(curRoute === 'ProductDetail' || curRoute === 'BuyerShow' || curRoute === 'ActivityDetail' || curRoute === 'ActivityShow') && item.essence" class="essence">精华</span>
      </div>
      <!-- 文本内容 -->
      <div class="list-main">
        <h3 v-if="item.entity_title && item.entity_title !== ' '">{{item.entity_title | titleFilter}}</h3>
        <div class="main-paragraph" v-if="item.entity_brief">
          <div :class="{readmove: (parHeight[index] && curRoute !== 'MomentDetail')}">
            <paragraph :text="item.entity_brief" :topic="item.entity_extra.from_muilt"></paragraph>
          </div>
          <a href="javascript:;" @click.stop="readMore(index)" v-if="showText[index] && curRoute !== 'MomentDetail'">{{(parHeight[index] && showText[index]) ? '全文' : '收起'}}</a>
        </div>
        <div class="main-images" v-if="item.entity_photos && item.entity_photos.length">
          <vue-swiper v-if="item.with_video !== 1"
             :images="item.entity_photos"
             :type="+item.entity_type"
             :index="index" @to-parent="listenIndex">
          </vue-swiper>
          <vue-video v-if="item.with_video === 1"
            :poster="item.entity_photos[0]"
            :sources="item.video"
            :muted="muted">
          </vue-video>
          <div class="mark" v-if="item.entity_photos.length > 1 || item.entity_type !== 6 || item.with_video === 1">
            <span v-if="item.entity_type === 1">文章</span>
            <span v-if="item.entity_type === 2">活动</span>
            <span v-if="item.entity_type === 3">话题</span>
            <span v-if="item.entity_type == 6 && item.with_video !== 1">{{+imgIndex[index]+1+'/'+item.entity_photos.length}}</span>
            <span v-if="item.with_video === 1" @click.stop="muted = !muted">
              <img v-if="!muted" src="../../../../static/app/svg/video/video_btn_voice.svg" alt="">
              <img v-if="muted" src="../../../../static/app/svg/video/video_lb_voice.svg" alt="">
            </span>
          </div>
        </div>
      </div>
      <!-- 兑换条 -->
      <ul class="bound-bar" v-if="item.entity_extra && item.entity_extra.hangings && item.entity_extra.hangings.total && curRoute !== 'ActivityDetail' && curRoute !== 'ActivityShow' && curRoute !== 'ProductDetail' && curRoute !== 'BuyerShow'">
        <li v-for="(item, index) in item.entity_extra.hangings.items.slice(0, 2)" :key="index">
          <div class="bar-info">
            <img v-if="item.type === 2" src="../../../../static/app/svg/customer/activity_lb_blue.svg" alt="">
            <img v-else-if="item.type === 10" src="../../../../static/app/svg/customer/push_lb_product.svg" alt="">
            <span>{{`兑换过 ${item.show_title}`}}</span>
          </div>
        </li>
        <p v-if="item.entity_extra.hangings.total > 2">{{`还有其他 ${item.entity_extra.hangings.total - 2} 件兑换`}}</p>
      </ul>
      <!-- 时间 | 点赞 | 评论 -->
      <div class="list-footer" v-if="item.entity_type !== 3 && item.entity_type !== 2">
        <p>
          <span>{{item.publish_time  || item.publish_at | timeFilter(2)}}</span>
        </p>
        <div class="circle" v-if="item.entity_photos.length > 1">
          <span v-for="(val,i) in item.entity_photos" :key="i" :class="{active: i === +imgIndex[index]}"></span>
        </div>
        <p v-if="item.entity_statistic">
          <i>
            <img src="../../../../static/app/svg/customer/content_ic_discuss_44.svg" alt="">
            <span>{{item.entity_statistic.comment || ' ' | scientific}}</span>
          </i>
          <i>
            <img v-show="!icon[index]" src="../../../../static/app/svg/customer/content_praise_44.svg" alt="">
            <img v-show="icon[index]" src="../../../../static/app/svg/customer/content_ic_praise_sel_44.svg" alt="">
            <span>{{item.entity_statistic.thumb_up || ' ' | scientific}}</span>
          </i>
        </p>
      </div>
      <!-- 活动底部按钮 -->
      <div class="activity-apply" v-if="item.entity_type === 2">
        <span>{{item.entity_extra.enroll_limit === item.entity_extra.enroll_num ? '报名已结束' : (item.entity_extra.activity_state === 3 ? '活动未开始' : (item.entity_extra.activity_state === 4 ? '活动进行中' : '活动已结束'))}}</span>
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
    </li>
  </ul>
</template>
<script>
  import FocusBtn from './FocusBtn.vue';
  import Paragraph from './Paragraph.js';
  import VueSwiper from './VueSwiper.vue';
  import VueVideo from '../../mobile/official/VueVideo.vue';
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['listData'],
    components: {FocusBtn, Paragraph, VueSwiper, VueVideo},
    data() {
      return {
        curRoute: this.$route.name,
        imageSize,
        imgIndex: [], // ETC swiper索引
        parHeight: [], // ETC 段落高度
        showText: [], // ETC 全文按钮是否显示
        icon: [], // ETC 赞
        muted: true // ETC 静音
      };
    },
    created() {
      this.initialize();
    },
    methods: {
      // 初始化
      initialize() {
        let that = this;
        for(let i = 0, LEN = that.listData.length; i < LEN; i++){
          that.imgIndex.push(0);
          that.parHeight.push(true);
          if(that.listData[i].is_thumbed){
            this.icon.push(true);
          } else {
            this.icon.push(false);
          }
        }
      },
      // 跳转到type对应的详情页
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
            route = 'MomentDetail';
            break;
          case 7:
            route = 'theme_detail';
            break;
          default:
            break;
        }
        this.paramsSkip(route, {id});
      },
      // 查看更多
      readMore(index){
        let that = this;
        that.$set(that.parHeight, index, !that.parHeight[index]);
      },
      // swiper回调函数
      listenIndex(data, index){
        let that = this;
        that.$set(that.imgIndex, index, data);
      },
      // 行高限制
      limitHeight() {
        let that = this;
        that.initialize(that.listData);
        // 该需求需要大量dom操作,计算行数
        if(that.curRoute === 'DynamicDetail' || !that.listData.length) return;
        that.$nextTick(() => {
          that.showText = [];
          const box = that.$el.querySelectorAll('.list-main');
          if(that.$el.querySelector('li>.list-footer')) {
            const lineH = that.$el.querySelector('li>.list-footer') ? that.$el.querySelector('li>.list-footer').offsetHeight : that.$el.querySelector('li>.activity-apply').offsetHeight;
            for(let i = 0, LEN = box.length; i < LEN; i++) {
              const p = box[i].querySelector('.main-paragraph p');
              if(!p) {
                that.showText.push(false);
                continue;
              }
              if(parseInt(p.offsetHeight / lineH, 10) > 4) {
                that.showText.push(true);
              } else {
                that.showText.push(false);
              }
            }
          }
        });
      }
    },
    watch: {
      listData: 'limitHeight'
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .public-list {
    >li {
      position: relative;
      width: 100%;
      padding: 0.4rem 0;
      border-bottom: 0.01rem solid $borderColor;
      background-color: #fff;
      @extend %clearfix;
      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.8rem;
        padding: 0 0.3rem;
        margin-bottom: 0.2rem;
        .header-author {
          display: flex;
          align-items: center;
          >img {
            height: 0.72rem;
            border-radius: 50%;
            margin-right: 0.2rem;
          }
          .author-name {
            display: flex;
            flex-direction: column;
            justify-content: center;
            h4 {
              display: flex;
              align-items: center;
              font-weight: 300;
              line-height: 0.4rem;
              span {
                font-size: 0.3rem;
                letter-spacing: 0.2px;
                color: $themeColor;
                margin-right: 0.1rem;
              }
              img {
                width: 0.3rem;
              }
            }
            p {
              display: flex;
              margin-top: 0.08rem;
              span {
                width: 4rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 0.24rem;
                color: $subColor;
              }
            }
          }
        }
      }
      .list-main {
        h3 {
          padding: 0 0.3rem;
          font-size: 0.36rem;
          line-height: 0.52rem;
          letter-spacing: 0.1px;
          color: #222222;
          margin-bottom: 0.1rem;
        }
        .main-paragraph {
          .readmove {
            max-height: 1.92rem;
            overflow: hidden;
          }
          >a{
            float: left;
            font-size: 0.32rem;
            font-weight: 300;
            color: $cambridgeBlue;
          }
          padding: 0 0.3rem;
          margin-bottom: 0.3rem;
          @extend %clearfix;
        }
        .main-images {
          max-width: 100%;
          overflow: hidden;
          position: relative;
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
              img {
                width: 0.7rem;
              }
            }
          }
        }
      }
      .bound-bar{
        margin: 0.14rem auto 0.3rem;
        li {
          height: 0.6rem;
          margin-bottom: 0.12rem;
          &:last-of-type{
            margin-bottom: 0.2rem;
          }
          .bar-info{
            box-sizing: border-box;
            display: inline-block;
            margin: 0 0.15rem;
            padding: 0 0.15rem;
            width: auto;
            height: 0.6rem;
            border-radius: 0.04rem;
            background-color: #f1f5fe;
            border: solid 0.01rem #c4c5f9;
            img{
              float: left;
              width: 0.26rem;
              height: 0.6rem;
            }
            span{
              float: left;
              margin-left: 0.1rem;
              max-width: 6rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 0.28rem;
              line-height: 0.6rem;
              color: $cambridgeBlue;
            }
          }
        }
        p{
          font-size: 0.28rem;
          line-height: 0.28rem;
          color: $subColor;
          margin-left: 0.3rem;
        }
      }
      .list-footer {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.38rem;
        padding: 0 0.3rem;
        margin-top: 0.4rem;
        .circle {
          display: flex;
          position: absolute;
          left:50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          span {
            display: inline-block;
            margin: 0 0.05rem;
            width: 0.08rem;
            height: 0.08rem;
            border-radius: 100%;
            background-color: #e0e0e0;
            &.active{
              background-color: $mallRed;
            }
          }
        }
        p {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 0.24rem;
            color: $subColor;
          }
          i {
            font-style: normal;
            display: flex;
            align-items: center;
            margin-left: 0.24rem;
            img {
              width: 0.38rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
  }
</style>


