<template>
  <div class="profile">
    <life-style></life-style>
    <profile-info></profile-info>
  </div>
</template>
<script>
  import {LifeStyle} from '../../../../components/mobile/business';
  import ProfileInfo from './ProfileInfo.vue';
  import profile from '../../../../store/life/profile.js';

  import {mapState} from 'vuex';

  export default {
    title() {
      return '动态详情';
    },
    meta() {
      return `<meta name="description" content="动态详情">
      <meta name="keywords" content="动态详情">`;
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
      LifeStyle, ProfileInfo
    },
    computed: mapState({
      user_info: (store) => store.profile.user_info,
      user_photo: (store) => store.profile.user_photo,
      user_bg: (store) => store.profile.user_bg
    })
  };
</script>
