<template>
  <div class="shart-list" v-if="list && list.length">
    <li v-for="(item,index) in list" :key="index" @click="paramsSkip('Profile', {id: item.skip_id})">
      <div class="author">
        <div class="author-icon">
          <img :src="item.photo_url || item.object_user_photo || item.user_photo_url | imageSize('165x165')" alt="">
          <img v-if="item.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
          <img v-if="item.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
        </div>
        <div class="author-name">
          <span>{{item.user_name || item.object_user_name}}</span>
          <span>{{item.signiture || '不需要签名'}}</span>
          <p v-if="item.fans">
            <span>粉丝 {{item.fans.funs}}</span>
            <span>动态 {{item.moment_num}}</span>
          </p>
        </div>
      </div>
      <focus-btn :bgColor="true"></focus-btn>
    </li>
  </div>
</template>
<script>
  import FocusBtn from './FocusBtn';
  import frequent from '../../../mixins/frequent';

  export default {
    mixins: [frequent],
    props: ['list'],
    components: {FocusBtn}
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
      &:last-of-type {
        border: none;
      }
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
          >span {
            width: 4rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            font-size: 0.3rem;
            line-height: 0.34rem;
            font-weight: 300;
            color: $themeColor;
            &:last-of-type {
              font-size: 0.24rem;
              line-height: 0.28rem;
              color: #666666;
            }
          }
          p {
            display: flex;
            align-items: center;
            >span {
              font-size: 0.24rem;
              line-height: 0.28rem;
              font-weight: 300;
              color: $subColor;
              margin-right: 0.2rem;
            }
          }
        }
      }
    }
  }
</style>

