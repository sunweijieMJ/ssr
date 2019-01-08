<template>
  <ul class="public-list">
    <li v-for="(item,index) in listData" :key="index" v-if="item" @click="skipDetail(item.entity_id, item.entity_type)">
      <!-- 列表头部用户信息 -->
      <div class="list-header">
        <div class="header-author">
          <div class="author-icon">
            <img v-lazy="imageSize(item.entity_user_info ? item.entity_user_info.user_photo_url : '','80x80')" alt="" @click.stop="assign('profile', item.entity_user_info.id)">
            <img v-if="item.entity_user_info.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
            <img v-if="item.entity_user_info.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
          </div>
          <div class="author-name" :class="{'null-name': !(item.name || item.entity_user_info.signiture)}">
            <h4>
              <span class="name" @click.stop="assign('profile', item.entity_user_info.id)">{{item.entity_user_info ? item.entity_user_info.user_name : ''}}</span>
              <a href="javascript:;" v-if="item.entity_user_info.member_grade === 2 || item.entity_user_info.member_grade === 3" :class="{grade: item.entity_user_info.member_grade === 3}">
                <i class="iconfont icon-members_ic_privilege"></i>
                <span v-if="item.entity_user_info.member_grade === 2">悦蓝</span>
                <span v-if="item.entity_user_info.member_grade === 3">臻蓝</span>
              </a>
            </h4>
            <p v-if="item.name || item.entity_user_info.signiture" :class="{focus: (curRoute === 'Choiceness' || curRoute === 'Moment' || curRoute === 'TopicDetail')}">
              <span v-if="item.name">{{item.name}}</span>
              <span v-else>{{item.entity_user_info.signiture}}</span>
            </p>
          </div>
        </div>
        <focus-btn v-if="curRoute === 'Choiceness' || curRoute === 'Moment' || curRoute === 'TopicDetail'"></focus-btn>
      </div>
      <!-- 文本内容 -->
      <div class="list-main">
        <h3 v-if="item.entity_title && item.entity_title !== ' '">{{item.entity_title | titleFilter}}</h3>
        <div class="main-paragraph" v-if="item.entity_brief && item.entity_type == 6">
          <div :class="{readmove: (parHeight[index] && curRoute !== 'MomentDetail')}">
            <paragraph :text="item.entity_brief" :topic="item.entity_extra.from_muilt" :hangings="item.entity_extra.hangings"></paragraph>
          </div>
          <a href="javascript:;" @click.stop="readMore(index)" v-show="showText[index] && curRoute !== 'MomentDetail'">{{(parHeight[index] && showText[index]) ? '全文' : '收起'}}</a>
        </div>
        <div class="main-images" v-if="item.entity_photos && item.entity_photos.length">
          <images v-if="item.with_video !== 1" :images="item.entity_photos"></images>
          <vue-video v-if="item.with_video === 1"
            :poster="item.entity_photos[0]"
            :sources="item.video"
            :muted="muted">
          </vue-video>
          <div class="mark" v-if="item.with_video === 1 && item.entity_type !== 6">
            <span v-if="item.entity_type == 1">文章</span>
            <span v-if="item.entity_type == 2">活动</span>
            <span v-if="item.entity_type == 3">话题</span>
            <span v-if="item.with_video == 1" @click.stop="muted = !muted">
              <i :class="'iconfont ' + (muted ? 'icon-nav_ic_no_voice' : 'icon-nav_ic_voice')"></i>
            </span>
          </div>
        </div>
      </div>
      <!-- 兑换条 -->
      <div class="bound-bar" v-if="item.entity_extra && item.entity_extra.hangings && item.entity_extra.hangings.total && curRoute !== 'ActivityDetail' && curRoute !== 'ActivityShow' && curRoute !== 'ProductDetail' && curRoute !== 'BuyerShow'">
        <div class="msg">
          <img v-if="item.entity_extra.hangings.items[0].option_img" :src="item.entity_extra.hangings.items[0].option_img[0]" alt="">
          <div class="title">
            <h4>{{item.entity_extra.hangings.items[0].title}}</h4>
            <p>{{item.entity_extra.hangings.items[0].specs}}</p>
          </div>
        </div>
        <i class="iconfont icon-shopping_next"></i>
      </div>
      <!-- 底部按钮 -->
      <div class="list-footer" v-if="item.entity_type !== 3">
        <!-- left -->
        <p v-if="item.entity_type == 1 || item.entity_type == 2" class="read">
          <span class="stick" v-if="stick">置顶</span>
          <span class="time" v-if="item.entity_type == 1">{{item.entity_statistic.read}} 次浏览</span>
          <span v-if="item.entity_type == 2">{{(item.entity_extra.enroll_limit === item.entity_extra.enroll_num) || item.entity_extra.activity_state === 3 ? `${item.entity_extra.enroll_begin_time | timeFilter(2)} 活动开始` : (item.entity_extra.activity_state === 4 ? '活动进行中' : '活动已结束')}}</span>
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
            <i class="iconfont icon-content_ic_discuss_"></i>
            {{item.entity_statistic.comment || ' ' | scientific}}
          </span>
          <span class="num">
            <i class="iconfont icon-content_praise_"></i>
            {{item.entity_statistic.thumb_up || ' ' | scientific}}
          </span>
        </p>
      </div>
    </li>
  </ul>
</template>
<script>
  import FocusBtn from '../button/FocusBtn.vue';
  import Paragraph from './Paragraph.js';
  import {VueVideo, VueSwiper} from '../../mobile/public';
  import {Images} from '../feed';
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['listData', 'stick'],
    components: {FocusBtn, Paragraph, VueSwiper, VueVideo, Images},
    data() {
      return {
        curRoute: this.$route.name,
        imageSize,
        parHeight: [], // ETC 段落高度
        showText: [], // ETC 全文按钮是否显示
        muted: true // ETC 静音
      };
    },
    beforeMount() {
      this.limitHeight();
    },
    methods: {
      initialize() {
        let that = this;
        that.parHeight = [];
        for(let i = 0, LEN = that.listData.length; i < LEN; i++){
          that.parHeight.push(true);
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
            route = 'moment_detail';
            break;
          case 10:
            route = 'product_detail';
            break;
          case 13:
            route = 'food_list';
            break;
          default:
            break;
        }
        if(route === 'food_list') {
          this.queryAssign(route, {store_id: 2});
        } else {
          this.assign(route, id);
        }
      },
      // 查看更多
      readMore(index){
        let that = this;
        that.$set(that.parHeight, index, !that.parHeight[index]);
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
            const lineH = that.$el.querySelector('.list-header .header-author h4 span').offsetHeight;
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
      padding: 0 0.3rem;
      overflow: hidden;
      background-color: #fff;
      border-bottom: 0.01rem solid $borderColor;
      &:last-child {
        border-bottom: 0 none;
      }
      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.72rem;
        margin: 0.5rem 0 0.3rem;
        .header-author {
          display: flex;
          align-items: center;
          .author-icon {
            position: relative;
            width: 0.72rem;
            height: 0.72rem;
            border-radius: 50%;
            margin-right: 0.2rem;
            img {
              width: 0.72rem;
              height: 0.72rem;
              border-radius: 50%;
              &:nth-child(2) {
                position: absolute;
                right: 0; bottom: 0;
                width: 0.3rem;
                height: 0.3rem;
              }
            }
          }
          .author-name {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 0.72rem;
            &.null-name {
              justify-content: center;
            }
            h4 {
              display: flex;
              align-items: center;
              width: 4.5rem;
              font-weight: 300;
              height: 0.34rem;
              .name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 0.3rem;
                letter-spacing: 0.2px;
                color: $themeColor;
              }
              a {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.86rem;
                height: 0.3rem;
                margin-left: 0.1rem;
                color: $darkBlue;
                &.grade {
                  color: #042C4F;
                  &:after {
                    border-color: #042C4F;
                  }
                }
                // 细边框
                &:after{
                  content: '';
                  position: absolute;
                  top: 0; left: 0;
                  box-sizing: border-box;
                  width: 200%;
                  height: 200%;
                  transform: scale(0.5);
                  transform-origin: left top;
                  border: 1px solid $darkBlue;
                  border-radius: 20px;
                }
                i {
                  font-size: 0.23rem;
                  line-height: 0.23rem;
                }
                span {
                  margin-left: 0.06rem;
                  font-size: 0.2rem;
                }
              }
            }
            p {
              display: flex;
              align-items: center;
              width: 5.4rem;
              height: 0.28rem;
              &.focus {
                width: 4.5rem;
              }
              span {
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
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.52rem;
          letter-spacing: 0.1px;
          color: #222222;
        }
        .main-paragraph {
          .readmove {
            overflow: hidden;
            max-height: 1.92rem;
          }
          >a{
            font-size: 0.32rem;
            font-weight: 300;
            color: $linkBlue;
          }
          margin-bottom: 0.22rem;
          @extend %clearfix;
        }
        .main-images {
          margin-top: 0.3rem;
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
            border-radius: 2px 0 0 2px;
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
      }
      .bound-bar{
        margin-top: 0.24rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 6.9rem;
        height: 1.28rem;
        background-color: #fafafa;
        @include thin-line(#ccc, 4px);
        .msg {
          display: flex;
          align-items: center;
          img {
            width: 1.26rem;
            height: 1.26rem;
          }
          .title {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 0.2rem;
            h4 {
              margin-bottom: 0.17rem;
              font-size: 0.3rem;
              font-weight: 400;
              color: $themeColor;
            }
            p {
              font-size: 0.26rem;
              color: $subColor;
            }
          }
        }
        i {
          margin-right: 0.22rem;
          font-size: 12px;
          color: rgba(106,106,106,1);
        }
      }
      .list-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.91rem;
        padding-bottom: 0.2rem;
        p {
          display: flex;
          align-items: center;
          &.read {
            .stick {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 0.58rem;
              height: 0.34rem;
              margin-right: 0.15rem;
              font-size: 0.2rem;
              color: $mallRed;
              // 细边框
              &:after {
                content: '';
                position: absolute;
                top: 0; left: 0;
                box-sizing: border-box;
                width: 200%;
                height: 200%;
                transform: scale(0.5);
                transform-origin: left top;
                border: 1px solid $mallRed;
              }
            }
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
    }
  }
</style>
<style lang="scss">
  @import '../../../assets/scss/_base.scss';

  .public-list {
    .main-paragraph {
      p {
        font-size: 0.32rem;
        line-height: 0.48rem;
        color: $themeColor;
        a {
          margin-right: 0.06rem;
          font-size: 0.32rem;
          color: $linkBlue;
        }
        img {
          display: inline-block;
          width: 0.4rem;
          vertical-align: top;
        }
        i {
          margin-right: 0.05rem;
          font-size: 0.32rem;
          color: $linkBlue;
        }
      }
    }
  }
</style>



