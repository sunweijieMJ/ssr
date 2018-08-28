<template>
  <div class="profile">
    <life-style></life-style>
    <profile-info></profile-info>
    <div v-if="user_id !== -1"
      v-infinite-scroll="infinite"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <public-list :listData="user_dynamic"></public-list>
      <loading :loading="loadInfo.loading" :noMore="loadInfo.noMore" :hide="false"></loading>
      <comment-null v-if="user_dynamic ? !user_dynamic.length : null" :text="'暂时没有动态'"></comment-null>
    </div>
    <div v-else class="user-null">
      <div class="null-bg"></div>
      <div class="null-text">
        <img src="../../../../../static/mobile/svg/profile/me_ic_error.svg" alt="">
        <p>该用户不存在</p>
      </div>
    </div>
  </div>
</template>
<script>
  import {LifeStyle, PublicList, CommentNull, Loading} from '../../../../components/mobile/business';
  import ProfileInfo from './ProfileInfo.vue';

  import profile from '../../../../store/life/profile.js';
  import {mapState} from 'vuex';

  export default {
    title() {
      return '个人主页';
    },
    meta() {
      return `<meta name="description" content="个人主页">
      <meta name="keywords" content="个人主页">`;
    },
    asyncData({store}) {
      store.registerModule('profile', profile);
      const id = store.state.route.params.id;
      return Promise.all([
        store.dispatch('profile/getUserInfo', id),
        store.dispatch('profile/getUserDynamic', id)
      ]);
    },
    components: {
      LifeStyle, ProfileInfo, PublicList, CommentNull, Loading
    },
    data() {
      return {
        test: true,
        user_id: this.$route.params.id // ETC 用户id
      };
    },
    mounted() {
      this.$store.registerModule('profile', profile, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('profile', profile);
    },
    methods: {
      // 触底刷新
      infinite() {
        let that = this;
        that.$store.dispatch('profile/getUserDynamic', that.user_id);
      }
    },
    computed: {
      ...mapState({
        user_dynamic: (store) => store.profile.user_dynamic,
        loadInfo: (store) => store.profile.loadInfo
      }),
      loading() {
        return this.$store.state.profile.loadInfo.loading;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .profile{
    width: 100%;
    background-color: #f1f1f1;
    .user-null{
      .null-bg{
        height: 3.6rem;
        background: url(../../../../../static/mobile/img/personal_mask.png), url(../../../../../static/mobile/img/personal_default_bg.png) no-repeat;
        background-size: auto 3.6rem;
      }
      .null-text{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 1.22rem;
          margin: 1.1rem 0 0.4rem;
        }
        p{
          font-size: 0.4rem;
          font-weight: 300;
          line-height: 0.4rem;
          letter-spacing: 0.3px;
          text-align: center;
          color: $themeColor;
        }
      }
    }
  }
</style>
