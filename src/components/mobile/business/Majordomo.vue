<template>
  <div class="majordomo" @click="intercept">
    <div class="majordomo-user">
      <div class="author-icon">
        <img :src="global_data.mall.cs_conf.user_photo_url | imageSize('80x80')" alt="">
        <img v-if="global_data.mall.cs_conf.user_type == 2" src="../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
        <img v-if="global_data.mall.cs_conf.user_type == 3" src="../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
      </div>
      <p>有问题，就找用户大当家</p>
    </div>
    <i class="iconfont icon-shopping_next"></i>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../mixins/frequent.js';

  export default {
    mixins: [frequent],
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
    margin: 0.2rem 0;
    .majordomo-user {
      display: flex;
      align-items: center;
      .author-icon{
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        position: relative;
        img{
          width: 100%;
          &:last-child{
            position: absolute;
            right: 0; bottom: -0.1rem;
            width: 0.3rem;
          }
        }
      }
      p{
        font-size: 0.3rem;
        color: $themeColor;
        margin-left: 0.2rem;
      }
    }
    i {
      font-size: 14px;
    }
  }
</style>
