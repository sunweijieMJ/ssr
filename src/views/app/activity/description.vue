<template>
  <activity-desc :response="description"></activity-desc>
</template>
<script>
  import {mapState} from 'vuex';
  import appSDK from '../../../utils/appBridgeSDK';
  import activity_desc from '../../../store/app/activity_desc.js';
  import ActivityDesc from '../../../components/app/ActivityDesc.vue';

  export default {
    components: {ActivityDesc},
    title() {
      return 'Lanehub - 活动详情模块';
    },
    meta() {
      return `<meta name="description" content="Lanehub 活动详情模块">
              <meta name="keywords" content="瓴里, 活动详情模块">`;
    },
    asyncData({store, route}) {
      store.registerModule('activity_desc', activity_desc);
      return Promise.all([store.dispatch('activity_desc/getActivityDesc', route.params.id)]);
    },
    destroyed() {
      this.$store.unregisterModule('activity_desc', activity_desc);
    },
    computed: mapState({
      description: (store) => store.activity_desc.description
    }),
    mounted() {
      // ETC 网页高度
      let page_height = `${document.body.offsetHeight }`;
      if(page_height) appSDK().passPageHeight(page_height);
    }
  };
</script>

