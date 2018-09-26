<template>
  <ul class="comment-list">
    <li v-for="(item, index) in commentList" :key="index">
      <div class="list-author" @click="assign('profile',item.entity_user_info.id)">
        <img v-lazy="imageSize(item.entity_user_info ? item.entity_user_info.user_photo_url : '', '80x80')" alt="">
        <img v-if="item.entity_user_info.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
        <img v-if="item.entity_user_info.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
      </div>
      <div class="list-reply">
        <span @click="assign('profile',item.entity_user_info.id)">{{item.entity_user_info?item.entity_user_info.user_name:''}}</span>
        <paragraph :text="item.entity_brief"></paragraph>
        <div class="reply-time">
          <p>
            <span>{{item.publish_time | timeFilter(2)}}</span>
          </p>
          <p @click="intercept">
            <span class="num">
              <i class="iconfont icon-content_ic_discuss_"></i>
            </span>
            <span class="num">
              <i class="iconfont icon-content_praise_"></i>
              <i>{{item.entity_statistic.thumb_up || ' ' | scientific}}</i>
            </span>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import imageSize from '../../../utils/filters/imageSize';
  import frequent from '../../../mixins/frequent.js';
  import Paragraph from '../../../components/mobile/business/Paragraph.js';

  export default {
    mixins: [frequent],
    props: ['commentList'],
    components: {Paragraph},
    data(){
      return {
        imageSize
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .comment-list {
    padding: 0 0.3rem;
    background-color: #fff;
    border-top: 0.01rem solid $borderColor;;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0;
      border-bottom: 0.01rem solid $borderColor;;
      &:last-of-type {
        border-bottom: none;
      }
      .list-author {
        width: 0.64rem;
        height: 0.64rem;
        position: relative;
        img{
          &:first-child {
            width: 100%;
            border-radius: 50%;
          }
          &:nth-child(2) {
            width: 0.28rem;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
      .list-reply {
        >span {
          font-size: 0.28rem;
          line-height: 0.28rem;
          color: $subColor;
        }
        .reply-time {
          width: 6.1rem;
          height: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p {
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 0.3rem;
            span {
              display: flex;
              align-items: center;
              font-size: 0.24rem;
              letter-spacing: 0.2px;
              color: $subColor;
              &.num {
                margin-left: 0.24rem;
              }
              i {
                margin-right: 0.1rem;
                font-size: 0.3rem;
                font-style: normal;
                &:nth-child(2) {
                  min-width: 0.1rem;
                  margin-right: 0;
                  font-size: 0.24rem;
                  line-height: 0.3rem;
                  letter-spacing: 0.2px;
                  color: $subColor;
                }
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

  .comment-list {
    .list-reply {
      >p {
        width: 6.06rem;
        margin: 0.16rem 0 0.32rem;
        font-size: 0.28rem;
        line-height: 0.42rem;
        letter-spacing: 0.2px;
        color: $themeColor;
        a {
          margin-right: 0.06rem;
          font-size: 0.28rem;
          color: $linkBlue;
        }
        img {
          display: inline-block;
          width: 0.36rem;
          vertical-align: top;
        }
        i {
          margin-right: 0.05rem;
          font-size: 0.28rem;
          color: $linkBlue;
        }
      }
    }
  }
</style>
