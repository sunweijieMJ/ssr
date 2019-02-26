<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <show-image></show-image>
  </div>
</template>
<script>
  import UserActions from './utils/business/actions';
  import {uuid} from './utils/business/tools';
  import storage from './utils/storage/StorageApi';
  import {ShowImage} from './components/mobile/popup';

  export default {
    name: 'APP',
    components: {ShowImage},
    created() {
      if (process.env.VUE_ENV === 'client') {
        let that = this;
        if (!storage('cookie').get('ssr_authinfo')) {
          storage('cookie').set('ssr_authinfo', uuid(32, 16), 60 * 60 * 24 * 365);
        }

        window.document.addEventListener('DOMContentLoaded', () => {
          const extra = {
            params: that.$route.params,
            query: that.$route.query,
            request_url: window.document.URL,
            referrer: window.document.referrer
          };
          UserActions().entry(that.$route.name, extra);
        }, false);
        window.addEventListener('beforeunload', () => {
          const extra = {
            params: that.$route.params,
            query: that.$route.query,
            request_url: window.document.URL,
            referrer: window.document.referrer
          };
          UserActions().leave(that.$route.name, extra);
        }, false);
      }
    },
    watch: {
      $route(to, from) {
        if (process.env.VUE_ENV === 'client') {
          const extra = {
            params: to.params,
            query: to.query,
            request_url: `${window.location.origin}${to.fullPath}`,
            referrer: `${window.location.origin}${from.fullPath}`
          };
          UserActions().entry(to.name, extra);
        }
      }
    }
  };
</script>
<style lang="scss">
  @import '../src/assets/scss/_reset.scss';
  @import '../src/assets/scss/_base.scss';

  html {
    position: static !important;
    @include css3(text-size-adjust, 100% !important);
  }
</style>

