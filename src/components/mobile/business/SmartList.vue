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
              <span @click.stop="assign('profile', item.entity_user_info.id)">{{item.entity_user_info ? item.entity_user_info.user_name : ''}}</span>
              <a href="javascript:;" v-if="item.entity_user_info.member_grade === 2 || item.entity_user_info.member_grade === 3" :class="{grade: item.entity_user_info.member_grade === 3}">
                <i class="iconfont icon-members_ic_privilege"></i>
                <span v-if="item.entity_user_info.member_grade === 2">悦蓝</span>
                <span v-if="item.entity_user_info.member_grade === 3">臻蓝</span>
              </a>
            </h4>
            <p v-if="item.name || item.entity_user_info.signiture">
              <span v-if="item.name">{{item.name}}</span>
              <span v-else>{{item.entity_user_info.signiture}}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 文本内容 -->
      <div class="list-main">
        <h3 v-if="item.entity_title && item.entity_title !== ' '">{{item.entity_title | titleFilter}}</h3>
        <paragraph v-if="item.entity_brief" :text="item.entity_brief" :forbid="true"></paragraph>
        <div class="main-images" v-if="item.entity_photos && item.entity_photos.length">
          <div v-if="item.with_video !== 1" class="images">
            <img v-for="(val, index) in item.entity_photos.slice(0, 3)" :key="index" v-lazy="imageSize(val, '220x220')" alt="">
            <span v-if="item.entity_photos.length > 3">
              <i class="iconfont icon-tab_ic_keyboard_img"></i>{{item.entity_photos.length}}
            </span>
          </div>
          <div v-if="item.with_video === 1" class="video">
            <img v-lazy="imageSize(item.entity_photos[0], '220x220')" alt="">
            <img src="//static06.lanehub.cn/plyr/images/video_ic_play.png" alt="">
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import Paragraph from './Paragraph.js';
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['listData'],
    components: {Paragraph},
    data() {
      return {
        imageSize,
        curRoute: this.$route.name
      };
    },
    methods: {
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
              font-weight: 300;
              height: 0.34rem;
              >span {
                align-self: center;
                font-size: 0.3rem;
                letter-spacing: 0.2px;
                color: $themeColor;
                margin-right: 0.1rem;
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
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 0.28rem;
              &.focus {
                width: 4rem;
              }
              span {
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
          width: 0.55rem;
          height: 0.34rem;
          border-radius: 0.04rem;
          background-color: #fff;
          border: solid 0.01rem $mallRed;
          font-size: 0.2rem;
          color: $mallRed;
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
        .main-images {
          padding: 0 0.3rem;
          .images {
            display: flex;
            justify-content: space-between;
            position: relative;
            img {
              width: 2.2rem;
              height: 2.2rem;
            }
            span {
              display: flex;
              justify-content: space-around;
              align-items: center;
              position: absolute;
              right: 0;bottom: 0;
              width: 0.53rem;
              height: 0.34rem;
              background-color: rgba(0,0,0,0.5);
              font-size: 0.24rem;
              color: #fff;
              i {
                font-size: 0.24rem;
                font-weight: 600;
                color: #fff;
              }
            }
          }
          .video {
            position: relative;
            width: 2.2rem;
            img {
              width: 2.2rem;
              height: 2.2rem;
              &:last-child {
                position: absolute;
                left: 0.8rem;top: 0.8rem;
                width: 0.6rem;
                height: 0.6rem;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  @import '../../../assets/scss/_base.scss';

  .public-list {
    .list-main {
      >p {
        padding: 0 0.3rem;
        margin-bottom: 0.22rem;
        @extend %clearfix;
        @include erow(2);
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


