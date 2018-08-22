<template>
  <ul class="public-list">
    <li v-for="(item,index) in listData" :key="index" v-if="item">
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
        <focus-btn></focus-btn>
      </div>
      <!-- 文本内容 -->
      <div class="list-main">
        <h3 v-if="item.entity_title && item.entity_title !== ' '">{{item.entity_title | titleFilter}}</h3>
        <div class="main-paragraph" v-if="item.entity_brief">
          <paragraph :text="item.entity_brief" :topic="item.entity_extra.from_muilt"></paragraph>
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
          </div>
        </div>
      </div>
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
    </li>
  </ul>
</template>
<script>
  import FocusBtn from './FocusBtn.vue';
  import Paragraph from './Paragraph.js';
  import VueSwiper from './VueSwiper.vue';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    props: ['listData'],
    components: {FocusBtn, Paragraph, VueSwiper},
    data() {
      return {
        imageSize,
        imgIndex: [], // ETC swiper索引
        icon: []
      };
    },
    methods: {
      initialize() {
        let that = this;
        for(let i = 0, LEN = that.listData.length; i < LEN; i++){
          that.imgIndex.push(0);
        }
      },
      listenIndex(data, index){
        let that = this;
        that.$set(that.imgIndex, index, data);
      }
    },
    watch: {
      listData() {
        this.initialize();
      }
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


