<template>
  <div class="profile">
    <life-style></life-style>
    <profile-info></profile-info>
    <div v-if="user_id != -1"
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
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-personal_ic_default"></use>
        </svg>
        <p>该用户不存在</p>
      </div>
    </div>
    <open-app></open-app>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import wechat from '../../../../mixins/wechat.js';
  import profile from '../../../../store/life/profile.js';
  import ProfileInfo from './ProfileInfo.vue';
  import {LifeStyle, PublicList, CommentNull, Loading, OpenApp} from '../../../../components/mobile/business';

  export default {
    title() {
      return `${this.user_info ? '瓴里 - ' + this.user_info.user_name + '的主页' : '个人主页'}`;
    },
    meta() {
      return `<meta name="description" content="个人主页">
      <meta name="keywords" content="个人主页">`;
    },
    asyncData({store, route}) {
      store.registerModule('profile', profile);
      const id = route.params.id;
      if(id === '-1') return;
      return Promise.all([
        store.dispatch('profile/getUserInfo', id),
        store.dispatch('profile/getUserDynamic', id)
      ]);
    },
    components: {
      LifeStyle, ProfileInfo, PublicList, CommentNull, Loading, OpenApp
    },
    mixins: [wechat],
    data() {
      return {
        test: true,
        user_id: this.$route.params.id // ETC 用户id
      };
    },
    mounted() {
      let that = this;
      this.$store.registerModule('profile', profile, {preserveState: true});
      // 微信分享
      if(!that.user_info) return;
      const title = `${that.user_info.user_name}在瓴里与你分享美好生活`;
      const link = window.location.href;
      const desc = `${that.user_info.signiture}\n${that.user_info.followers.funs}位瓴友正在关注,获得过个${that.user_info.followers.thumbups}赞`;
      const imgUrl = that.user_photo;
      that.wxInit(link, title, desc, imgUrl);
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
        user_info: (store) => store.profile.user_info,
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
    background-color: $intervalColor;
    .user-null{
      background-color: #fff;
      .null-bg{
        height: 3.6rem;
        background: url(../../../../../static/mobile/img/personal_mask.png), url(../../../../../static/mobile/img/personal_default_bg.png) no-repeat;
        background-size: auto 3.6rem;
      }
      .null-text{
        display: flex;
        flex-direction: column;
        align-items: center;
        svg{
          width: 1.22rem;
          height: 1.22rem;
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
