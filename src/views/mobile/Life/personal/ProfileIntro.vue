<template>
  <div class="profile-intro">
    <PublicTitle :pageTitle="'个人简介'" v-if="!(response.__platform === 'app' || isTencent)"></PublicTitle>
    <div class="main">
      <p v-if="user_info.content" v-html="textFilter(user_info.content)"></p>
      <li class="photo-box" v-for="(item,index) in user_info.photo_urls ? user_info.photo_urls : ''" :key="index">
        <img :src="item | imageSize('690x0')" alt="简介图">
      </li>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import hidetitle from '../../../../mixins/hidetitle.js';
  import textFilter from '../../../../utils/filters/textFilter.js';
  import profile_intro from '../../../../store/life/profile_intro.js';
  import {PublicTitle} from '../../../../components/mobile/business';


  export default {
    title() {
      return '个人简介';
    },
    meta() {
      return `<meta name="description" content="个人简介">
              <meta name="keywords" content="个人简介">`;
    },
    asyncData({store, route}) {
      store.registerModule('profile_intro', profile_intro);
      const id = route.params.id;
      return Promise.all([store.dispatch('profile_intro/getUserInfo', id)]);
    },
    components: {PublicTitle},
    mixins: [hidetitle],
    data(){
      return{
        info: null, // ETC 用户信息
        textFilter
      };
    },
    mounted() {
      this.$store.registerModule('profile_intro', profile_intro, {preserveState: true});
    },
    destroyed() {
      this.$store.unregisterModule('profile_intro', profile_intro);
    },
    computed: mapState({
      user_info: (store) => store.profile_intro.user_info
    })
  };
</script>
<style lang="scss" scoped>
  .profile-intro{
    .main{
      padding: 0.3rem;
      background-color: #ffffff;
      p{
        font-size: 0.32rem;
        font-weight: 300;
        line-height: 0.48rem;
      }
      li{
        list-style: none;
        margin-top: 0.4rem;
        img{
          width: 6.9rem;
        }
      }
    }
  }
</style>
