<template>
  <ul class="public-list">
    <li v-for="(vitem,vindex) in listData" :key="vindex" v-if="vitem" @click="skipDetail(vitem.entity_id, vitem.entity_type)">
      <!-- 列表头部用户信息 -->
      <div class="list-header">
        <div class="header-author">
          <div class="author-icon">
            <img v-lazy="imageSize(vitem.entity_user_info ? vitem.entity_user_info.user_photo_url : '','80x80')" alt="" @click.stop="assign('profile', vitem.entity_user_info.id)">
            <img v-if="vitem.entity_user_info.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
            <img v-if="vitem.entity_user_info.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
          </div>
          <div class="author-name" :class="{'null-name': !(vitem.name || vitem.entity_user_info.signiture)}">
            <h4>
              <span class="name" @click.stop="assign('profile', vitem.entity_user_info.id)">{{vitem.entity_user_info ? vitem.entity_user_info.user_name : ''}}</span>
              <a href="javascript:;" v-if="vitem.entity_user_info.member_grade === 2 || vitem.entity_user_info.member_grade === 3" :class="{grade: vitem.entity_user_info.member_grade === 3}">
                <i class="iconfont icon-members_ic_privilege"></i>
                <span v-if="vitem.entity_user_info.member_grade === 2">悦蓝</span>
                <span v-if="vitem.entity_user_info.member_grade === 3">臻蓝</span>
              </a>
            </h4>
            <p v-if="vitem.name || vitem.entity_user_info.signiture" :class="{focus: (curRoute === 'Choiceness' || curRoute === 'Moment' || curRoute === 'TopicDetail')}">
              <span v-if="vitem.name">{{vitem.name}}</span>
              <span v-else>{{vitem.entity_user_info.signiture}}</span>
            </p>
          </div>
        </div>
        <focus-btn v-if="curRoute === 'Choiceness' || curRoute === 'Moment' || curRoute === 'TopicDetail'"></focus-btn>
      </div>
      <!-- 文本内容 -->
      <div class="list-main">
        <h3 v-if="vitem.entity_title && vitem.entity_title !== ' '">{{vitem.entity_title | titleFilter}}</h3>
        <div class="main-paragraph" v-if="vitem.entity_brief && vitem.entity_type == 6">
          <div :class="{readmove: (parHeight[vindex] && curRoute !== 'MomentDetail')}">
            <paragraph :text="vitem.entity_brief" :topic="vitem.entity_extra.from_muilt" :hangings="vitem.entity_extra.hangings"></paragraph>
          </div>
          <a href="javascript:;" @click.stop="readMore(vindex)" v-show="showText[vindex] && curRoute !== 'MomentDetail'">{{(parHeight[vindex] && showText[vindex]) ? '全文' : '收起'}}</a>
        </div>
        <div class="main-images" v-if="vitem.entity_photos && vitem.entity_photos.length">
          <images v-if="vitem.with_video !== 1" :images="vitem.entity_photos" :type="vitem.entity_type"></images>
          <vue-video v-if="vitem.with_video === 1"
            :poster="vitem.entity_photos[0]"
            :sources="vitem.video"
            :muted="muted"
            :type="vitem.entity_type">
          </vue-video>
          <div class="mark" v-if="(vitem.with_video == 1 && curRoute === 'MomentDetail') || vitem.entity_type != 6">
            <span v-if="vitem.entity_type == 1">文章</span>
            <span v-if="vitem.entity_type == 2">活动</span>
            <span v-if="vitem.entity_type == 3">话题</span>
            <span v-if="vitem.with_video == 1" @click.stop="muted = !muted">
              <i :class="'iconfont ' + (muted ? 'icon-nav_ic_no_voice' : 'icon-nav_ic_voice')"></i>
            </span>
          </div>
        </div>
      </div>
      <!-- 兑换条 -->
      <ul class="bound-bar" v-if="vitem.entity_extra && vitem.entity_extra.hangings && vitem.entity_extra.hangings.total && curRoute !== 'ActivityDetail' && curRoute !== 'ActivityShow' && curRoute !== 'ProductDetail' && curRoute !== 'BuyerShow'">
        <li v-for="(witem, windex) in curRoute === 'MomentDetail' ? vitem.entity_extra.hangings.items : vitem.entity_extra.hangings.items.slice(0, 1)" :key="windex" :class="{last: windex !== vitem.entity_extra.hangings.items.length - 1}" v-if="witem.show_status" @click.stop="skipDetail(witem.object_id, witem.type)">
          <div class="msg">
            <img v-if="witem.option_img" :src="witem.option_img[0]" alt="">
            <div class="title">
              <h4>{{witem.title}}</h4>
              <p v-if="witem.type !== 2">已购买 {{witem.specs}}</p>
              <p v-else>已报名该活动</p>
            </div>
          </div>
          <i class="iconfont icon-shopping_next"></i>
        </li>
      </ul>
      <!-- 底部按钮 -->
      <div class="list-footer" v-if="vitem.entity_type !== 3">
        <!-- left -->
        <p v-if="vitem.entity_type == 1 || vitem.entity_type == 2" class="read">
          <span class="stick" v-if="stick">置顶</span>
          <span class="time" v-if="vitem.entity_type == 1">{{vitem.entity_statistic.read}} 次浏览</span>
          <span v-if="vitem.entity_type == 2">{{(vitem.entity_extra.enroll_limit === vitem.entity_extra.enroll_num) || vitem.entity_extra.activity_state === 3 ? `${timeFilter(vitem.entity_extra.activity_begin_time, 3)} 活动开始` : (vitem.entity_extra.activity_state === 4 ? '活动进行中' : '活动已结束')}}</span>
        </p>
        <p v-else>
          <span>{{vitem.publish_time  || vitem.publish_at | timeFilter(2)}}</span>
        </p>
        <!-- right -->
        <div class="apply-btn" v-if="vitem.entity_type === 2">
          <template v-if="vitem.entity_extra.enroll_limit <= vitem.entity_extra.enroll_num">
            <a href="javascript:;">查看活动</a>
          </template>
          <template v-else>
            <template v-if="vitem.entity_extra.activity_enroll_state === 1 || vitem.entity_extra.activity_enroll_state === 2 || vitem.entity_extra.activity_enroll_state === 3">
              <a href="javascript:;" v-if="vitem.entity_extra.activity_enroll_state === 0">报名未开始</a>
              <a href="javascript:;" v-if="vitem.entity_extra.activity_enroll_state === 1">立即报名</a>
              <a href="javascript:;" v-if="vitem.entity_extra.activity_enroll_state === 2">查看活动</a>
            </template>
            <template v-else>
              <a href="javascript:;" v-if="vitem.entity_extra.activity_state === 3">活动未开始</a>
              <a href="javascript:;" v-if="vitem.entity_extra.activity_state === 4">查看活动</a>
              <a href="javascript:;" v-if="vitem.entity_extra.activity_state === 5">查看活动</a>
            </template>
          </template>
        </div>
        <p v-else @click.stop="intercept">
          <span class="num">
            <i class="iconfont icon-content_praise_Co"></i>
            {{vitem.entity_statistic.comment || ' ' | scientific}}
          </span>
          <span class="num">
            <i class="iconfont icon-content_praise_"></i>
            {{vitem.entity_statistic.thumb_up || ' ' | scientific}}
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
  import timeFilter from '../../../utils/filters/timeFilter.js';

  export default {
    mixins: [frequent],
    props: ['listData', 'stick'],
    components: {FocusBtn, Paragraph, VueSwiper, VueVideo, Images},
    data() {
      return {
        curRoute: this.$route.name,
        imageSize,
        timeFilter,
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
        if(that.curRoute === 'MomentDetail' || !that.listData.length) return;
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
    background-color: #fff;
    >li {
      position: relative;
      margin: 0 0.3rem;
      overflow: hidden;
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
              font-weight: 300;
              height: 0.34rem;
              .name {
                @include tofl(3.5rem);
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
          @include erow(2);
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
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 6.9rem;
          height: 1.28rem;
          background-color: #fafafa;
          @include thin-line(#ccc, 4px);
          &:first-child {
            margin-top: 0.24rem;
          }
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
                @include tofl(4.7rem);
                margin-bottom: 0.17rem;
                font-size: 0.3rem;
                line-height: 0.36rem;
                font-weight: 400;
                color: $themeColor;
              }
              p {
                @include tofl(4.7rem);
                font-size: 0.26rem;
                line-height: 0.26rem;
                color: $subColor;
              }
            }
          }
          i {
            margin-right: 0.22rem;
            font-size: 12px;
            color: rgba(106,106,106,1);
          }
          &.last::after {
            border-bottom: 0;
          }
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
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 0.68rem;
              height: 0.34rem;
              margin-right: 0.15rem;
              font-size: 0.2rem;
              color: $mallRed;
              @include thin-line($mallRed, 20px);
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



