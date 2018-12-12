<template>
  <div class="shart-list" v-if="list && list.length">
    <li v-for="(item,index) in list" :key="index" @click="paramsSkip('Profile', {id: item.skip_id})">
      <div class="author">
        <div class="author-icon">
          <img v-lazy="imageSize(item.photo_url || item.object_user_photo || item.user_photo_url, '165x165')" alt="">
          <img v-if="item.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
          <img v-if="item.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
        </div>
        <div class="author-name" :class="{double: !((item.tags && item.tags.length && calcTags(item.tags)) || item.signiture)}">
          <h3>
            <span>{{item.user_name || item.object_user_name}}</span>
            <a href="javascript:;" v-if="0">
              <i class="iconfont icon-members_ic_privilege"></i>
              <span>悦蓝</span>
            </a>
          </h3>
          <p v-if="item.tags && item.tags.length && calcTags(item.tags)">
            <span v-for="(val,i) in item.tags" :key="i" v-if="val !== '199'">{{val}}</span>
          </p>
          <p v-else-if="item.signiture">
            <span>{{item.signiture}}</span>
          </p>
          <p v-if="item.fans || item.fans.funs || item.moment_num">
            <span v-if="item.fans.funs || item.fans">粉丝 {{item.fans.hasOwnProperty('funs') ? item.fans.funs : item.fans}}</span>
            <span v-if="item.moment_num">动态 {{item.moment_num}}</span>
          </p>
        </div>
      </div>
      <focus-btn :bgColor="true"></focus-btn>
    </li>
  </div>
</template>
<script>
  import FocusBtn from '../button/FocusBtn.vue';
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['list'],
    components: {FocusBtn},
    data() {
      return {
        imageSize
      };
    },
    methods: {
      calcTags(tags) {
        let showTag = true;
        if(!tags) return false;
        for(let i = 0, LEN = tags.length; i < LEN; i++){
          if(tags[i] === '199') {
            showTag =  false;
            break;
          }
        }
        return showTag;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .shart-list {
    background-color: #fff;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.68rem;
      padding: 0 0.3rem;
      border-bottom: 0.01rem solid $borderColor;
      .author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .author-icon {
          position: relative;
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.2rem;
          img {
            width: 100%;
            border-radius: 50%;
            &:nth-of-type(2) {
              position: absolute;
              right: 0;bottom: 0;
              width: 0.38rem;
            }
          }
        }
        .author-name {
          height: 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          &.double {
            height: 0.8rem;
          }
          h3 {
            display: flex;
            align-items: center;
            span {
              font-size: 0.3rem;
              font-weight: 400;
              line-height: 0.34rem;
              color: $themeColor;
              @include tofl(4rem);
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
            >span {
              font-size: 0.24rem;
              line-height: 0.28rem;
              color: $subColor;
              margin-right: 0.2rem;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
</style>

