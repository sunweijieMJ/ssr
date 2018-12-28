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
              <span class="stick" v-if="stick">置顶</span>
            </h4>
            <p v-if="item.name || item.entity_user_info.signiture" :class="{focus: (curRoute === 'Choiceness' || curRoute === 'Moment' || curRoute === 'TopicDetail')}">
              <span v-if="item.name">{{item.name}}</span>
              <span v-else>{{item.entity_user_info.signiture}}</span>
            </p>
          </div>
        </div>
        <focus-btn v-if="curRoute === 'Choiceness' || curRoute === 'Moment' || curRoute === 'TopicDetail'"></focus-btn>
        <span v-if="0 && (curRoute === 'ActivityDetail' || curRoute === 'ActivityShow') && item.essence" class="essence">咨询Ta</span>
      </div>
      <!-- 文本内容 -->
      <div class="list-main">
        <h3 v-if="item.entity_title && item.entity_title !== ' '">{{item.entity_title | titleFilter}}</h3>
        <div class="main-paragraph" v-if="item.entity_brief">
          <div :class="{readmove: (parHeight[index] && curRoute !== 'MomentDetail')}">
            <paragraph :text="item.entity_brief" :topic="item.entity_extra.from_muilt" :hangings="item.entity_extra.hangings"></paragraph>
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
          <div class="mark" v-if="item.entity_photos.length > 1 || item.entity_type != 6 || item.with_video === 1">
            <span v-if="item.entity_type == 1">文章</span>
            <span v-if="item.entity_type == 2">活动</span>
            <span v-if="item.entity_type == 3">话题</span>
            <span v-if="item.entity_type == 6 && item.with_video != 1">{{+imgIndex[index]+1+'/'+item.entity_photos.length}}</span>
            <span v-if="item.with_video == 1" @click.stop="muted = !muted">
              <i :class="'iconfont ' + (muted ? 'icon-nav_ic_no_voice' : 'icon-nav_ic_voice')"></i>
            </span>
          </div>
        </div>
      </div>
      <!-- 兑换条 -->
      <ul class="bound-bar" v-if="item.entity_extra && item.entity_extra.hangings && item.entity_extra.hangings.total && curRoute !== 'ActivityDetail' && curRoute !== 'ActivityShow' && curRoute !== 'ProductDetail' && curRoute !== 'BuyerShow'">
        <li v-for="(item, index) in item.entity_extra.hangings.items.slice(0, 2)" :key="index" v-if="item.show_status">
          <div class="bar-info" @click.stop="skipDetail(item.object_id, item.type)">
            <svg v-if="item.type === 2" class="icon" aria-hidden="true">
              <use xlink:href="#icon-list_lb_activity"></use>
            </svg>
            <svg v-else-if="item.type === 10" class="icon" aria-hidden="true">
              <use xlink:href="#icon-list_lb_product"></use>
            </svg>
            <svg v-else-if="item.type === 13" class="icon" aria-hidden="true">
              <use xlink:href="#icon-list_lb_product_coff"></use>
            </svg>
            <span>{{`已购买 ${item.show_title}`}}</span>
          </div>
        </li>
        <p v-if="barFilter(item.entity_extra.hangings.items) > 2">{{`还有其他 ${item.entity_extra.hangings.total - 2} 件兑换`}}</p>
      </ul>
      <!-- 时间 | 点赞 | 评论 -->
      <div class="list-footer" v-if="item.entity_type !== 3 && item.entity_type !== 2">
        <p>
          <span>{{item.publish_time  || item.publish_at | timeFilter(2)}}</span>
        </p>
        <div class="circle" v-if="item.entity_photos.length > 1">
          <span v-for="(val,i) in item.entity_photos" :key="i" :class="{active: i === +imgIndex[index]}"></span>
        </div>
        <p v-if="item.entity_statistic" @click.stop="intercept">
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
  import FocusBtn from '../button/FocusBtn.vue';
  import Paragraph from './Paragraph.js';
  import {VueVideo, VueSwiper} from '../../mobile/public';
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['listData', 'stick'],
    components: {FocusBtn, Paragraph, VueSwiper, VueVideo},
    data() {
      return {
        curRoute: this.$route.name,
        imageSize,
        imgIndex: [], // ETC swiper索引
        parHeight: [], // ETC 段落高度
        showText: [], // ETC 全文按钮是否显示
        muted: true // ETC 静音
      };
    },
    beforeMount() {
      this.limitHeight();
    },
    methods: {
      // 初始化
      initialize() {
        let that = this;
        that.imgIndex = [];
        that.parHeight = [];
        for(let i = 0, LEN = that.listData.length; i < LEN; i++){
          that.imgIndex.push(0);
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
        // this.paramsSkip(route, {id});
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
      // 兑换条
      barFilter(arr) {
        let count = 0;
        for(let i = 0, LEN = arr.length; i < LEN; i++){
          if(arr[i].show_status) count++;
        }
        return count;
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
      &:last-child {
        border-bottom: 0 none;
      }
      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.72rem;
        padding: 0 0.3rem;
        margin-bottom: 0.22rem;
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
              .stick {
                position: relative;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.62rem;
                height: 0.32rem;
                margin-left: 0.2rem;
                background-color: #fff;
                font-size: 0.26rem;
                color: $mallRed;
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
                  border: 1px solid #f68f8f;
                  border-radius: 5px;
                }
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
                  font-size: 0.2rem;
                  line-height: 0.2rem;
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
        .essence{
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.4rem;
          height: 0.4rem;
          border-radius: 0.3rem;
          background-color: #fff;
          border: solid 0.01rem $borderColor;
          font-size: 0.2rem;
          color: $darkBlue;
        }
      }
      .list-main {
        h3 {
          padding: 0 0.3rem;
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.52rem;
          letter-spacing: 0.1px;
          color: #222222;
          margin-bottom: 0.1rem;
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
          padding: 0 0.3rem;
          margin-bottom: 0.22rem;
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
        margin: 0.14rem auto 0.2rem;
        li {
          height: 0.6rem;
          margin-bottom: 0.12rem;
          &:last-of-type{
            margin-bottom: 0.2rem;
          }
          .bar-info{
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            margin: 0 0.15rem;
            padding: 0 0.2rem 0 0.1rem;
            width: auto;
            height: 0.6rem;
            background:linear-gradient(90deg,rgba(246,247,248,1) 0%,rgba(244,245,247,1) 100%);
            border-radius: 0.3rem;
            svg {
              float: left;
              width: 0.44rem;
              height: 0.6rem;
            }
            span{
              float: left;
              margin-left: 0.07rem;
              max-width: 6.3rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 0.3rem;
              line-height: 0.6rem;
              color: $linkBlue;
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
        padding: 0.1rem 0.3rem 0;
        margin-top: 0.2rem;
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
          align-items: center;
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
      }
      .activity-apply {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        margin-top: 0.2rem;
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



