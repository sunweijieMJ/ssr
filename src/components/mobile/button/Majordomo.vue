<template>
  <div class="majordomo" @click="intercept" v-if="global_data && global_data.mall">
    <div class="majordomo-user" v-if="userinfo">
      <div class="author-icon">
        <img v-lazy="imageSize(userinfo.user_photo_url, '80x80')" alt="">
        <img v-if="userinfo.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
        <img v-if="userinfo.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
      </div>
      <p>有问题，就找{{userinfo.user_name}}</p>
    </div>
    <div class="majordomo-user" v-else>
      <div class="author-icon">
        <img v-lazy="imageSize(global_data.mall.cs_conf.user_photo_url, '80x80')" alt="">
        <img v-if="global_data.mall.cs_conf.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
        <img v-if="global_data.mall.cs_conf.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
      </div>
      <p>有问题，就找用户大当家用户大当家</p>
    </div>
    <i class="iconfont icon-shopping_next"></i>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['userinfo'],
    data() {
      return {
        imageSize
      };
    },
    computed: mapState({
      global_data: (store) => store.global_data
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .majordomo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.32rem;
    padding: 0 0.3rem;
    background-color: #fff;
    margin-top: 0.2rem;
    .majordomo-user {
      display: flex;
      align-items: center;
      .author-icon {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        position: relative;
        img {
          width: 100%;
          border-radius: 50%;
          &:nth-child(2) {
            position: absolute;
            right: 0; bottom: 0;
            width: 0.3rem;
          }
        }
      }
      p {
        @include tofl(5.1rem);
        font-size: 0.3rem;
        color: $themeColor;
        margin-left: 0.2rem;
      }
    }
    i {
      font-size: 12px;
      color: rgba(106,106,106,1);
    }
  }
</style>
