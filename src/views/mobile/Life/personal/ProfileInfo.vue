<template>
  <div class="profile-info" v-if="user_info">
    <div class="info-bg" :style="[{backgroundImage: `url(${personal_mask}),url(${imageSize(user_bg,'750x422')})`}]" @click="showImage([user_bg], 0)"></div>
    <div class="info-self">
      <div class="self-left">
        <div class="self-image">
          <img :src="user_photo | imageSize('160x160')" alt="" @click.stop="showImage([user_photo],0)">
          <i v-if="user_info.user_type === 2 || user_info.user_type === 3" @click="querySkip('Identifying',{type:user_info.user_type})">
            <img v-if="user_info.user_type == 2" src="../../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
            <img v-if="user_info.user_type == 3" src="../../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
          </i>
        </div>
        <h4>
          <span>{{user_info.user_name}}</span>
          <i v-if="user_info.gender === 1" class="iconfont icon-personal_ic_man"></i>
          <i v-if="user_info.gender === 2" class="iconfont icon-personal_ic_women"></i>
        </h4>
        <p>{{user_info.signiture || `这个人很懒、${user_info.gender === 1 ? '他' : '她'}什么都没有说`}}</p>
      </div>
      <focus-btn :bgColor="true"></focus-btn>
    </div>
    <div class="info-num">
      <a href="javascript:;" @click="user_info.followers.followers ? paramsSkip('Attention',{id:user_id}) : warning('该用户没有关注任何人', 2000);">
        <span>{{user_info.followers.followers || 0 | scientific}}</span>
        <span>关注</span>
      </a>
      <a href="javascript:;" @click="user_info.followers.funs ? paramsSkip('FansList',{id:user_id}) : warning('该用户暂时没有粉丝', 2000);">
        <span>{{user_info.followers.funs || 0 | scientific}}</span>
        <span>粉丝</span>
      </a>
      <a href="javascript:;">
        <span>{{user_info.moment_num || 0 | scientific}}</span>
        <span>动态</span>
      </a>
      <a href="javascript:;">
        <span>{{user_info.followers.thumbups || 0 | scientific}}</span>
        <span>收到赞</span>
      </a>
    </div>
    <div class="info-intro" v-if="user_info.photo_urls || user_info.content" @click="paramsSkip('ProfileIntro', {id: user_id})">
      <p v-if="user_info.content" v-html="readMore(user_info.content,60,`...<font style='color:rgba(25,112,206,1);'>全文</font>`)"></p>
      <div class="intro-image" v-if="user_info.photo_urls">
        <img :src="val" alt="简介图" v-for="(val,index) in user_info.photo_urls" :key="index" @click.stop="showImage(user_info.photo_urls,index)">
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {warning} from '../../../../utils/business/tools.js';
  import frequent from '../../../../mixins/frequent';
  import readMore from '../../../../utils/filters/readMore';
  import imageSize from '../../../../utils/filters/imageSize';
  import FocusBtn from '../../../../components/mobile/business/FocusBtn.vue';

  import personal_mask from '../../../../../static/mobile/img/personal_mask.png';

  export default {
    mixins: [frequent],
    components: {
      FocusBtn
    },
    data() {
      return {
        user_id: this.$route.params.id, // ETC 用户id
        personal_mask, // ETC 背景虚化图
        warning, // ETC 提示框
        imageSize, // ETC 图片url定制
        readMore // ETC 字数限制
      };
    },
    computed: mapState({
      user_info: (store) => store.profile.user_info,
      user_photo: (store) => store.profile.user_photo,
      user_bg: (store) => store.profile.user_bg
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .profile-info{
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    .info-bg{
      width: 100%;
      height: 3.6rem;
      background-size: cover;
    }
    .info-self{
      padding: 0 0.3rem;
      height: 1.74rem;
      display: flex;
      justify-content: space-between;
      .self-left{
        position: relative;
        .self-image{
          position: absolute;
          left: 0;top: -1.4rem;
          box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.1);
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          img{
            width: 100%;
            border-radius: 50%;
            &:nth-of-type(2){
              position: absolute;
              bottom: 0;
            }
          }
          i{
            width: 0.54rem;
            height: 0.54rem;
            position: absolute;
            right: -0.05rem; bottom: -0.05rem;
          }
        }
        h4{
          display: flex;
          align-items: center;
          margin-top: 0.56rem;
          span{
            font-size: 0.4rem;
            font-weight: normal;
            line-height: 0.4rem;
            color: $themeColor;
            margin-right: 0.16rem;
          }
          img{
            width: 0.3rem;
          }
          .iconfont {
            font-size: 0.3rem;
            font-weight: 300;
            &.icon-personal_ic_women {
              color: #ff6fa8;
            }
            &.icon-personal_ic_man {
              color: #0693ff;
            }
          }
        }
        p{
          white-space: nowrap;
          max-width: 5.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.24rem;
          font-size: 0.26rem;
          font-weight: 300;
          line-height: 0.26rem;
          color: $subColor;
        }
      }
      .focus-btn{
        display: flex;
        align-items: center;
      }
    }
    .info-num{
      height: 1.32rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 0.01rem solid $borderColor;
      a{
        width: 25%;
        height: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-child(1), &:nth-child(2){
          span{
             color: $mallRed;
          }
        }
        span{
          font-size: 0.32rem;
          font-weight: normal;
          line-height: 0.32rem;
          text-align: center;
          color: $themeColor;
          &:last-child{
            font-size: 0.24rem;
            font-weight: 300;
            line-height: 0.24rem;
            text-align: center;
            color: #999999;
            margin-top: 0.16rem;
          }
        }
      }
    }
    .info-intro{
      width: 6.9rem;
      padding: 0.3rem;
      border-top: 0.01rem solid $borderColor;
      p{
        font-size: 0.3rem;
        font-weight: 300;
        line-height: 0.45rem;
        letter-spacing: 0.1px;
        color: #363636;
      }
      .intro-image{
        margin-top: 0.3rem;
        width: 6.9rem;
        &::-webkit-scrollbar {display:none}
        overflow: hidden;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
        position: relative;
        left: 0;top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        img{
          float: left;
          width: 1.65rem;
          margin-right: 0.1rem;
          &:last-child{
            margin: 0;
          }
        }
      }
    }
  }
</style>
