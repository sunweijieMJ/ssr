<template>
  <module-desc :response="description"></module-desc>
</template>
<script>
  import {mapState} from 'vuex';
  import {couponInit} from '../../../utils/business/init.js';
  import module_desc from '../../../store/app//module_desc.js';
  import ModuleDesc from '../../../components/app/ModuleDesc.vue';

  export default {
    components: {ModuleDesc},
    title() {
      return 'Lanehub - 榜单详情';
    },
    meta() {
      return `<meta name="description" content="Lanehub 榜单详情">
              <meta name="keywords" content="瓴里, 榜单详情">`;
    },
    asyncData({store, route}) {
      store.registerModule('module_desc', module_desc);
      return Promise.all([store.dispatch('module_desc/getModuleDesc', route.params.id)]);
    },
    mounted() {
      this.$nextTick(() => {
        couponInit();
      });
    },
    destroyed() {
      this.$store.unregisterModule('module_desc');
    },
    computed: mapState({
      description: (store) => store.module_desc.description
    })
  };
</script>

