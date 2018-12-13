<template>
  <iframe :src="`https://m.amap.com/share/index/lnglat=${query.lnglat}&name=${query.name}`" frameborder="0"></iframe>
</template>
<script>

  export default {
    title() {
      return `${this.query.name}`;
    },
    meta() {
      return `<meta name="description" content="地图">
              <meta name="keywords" content="地图">`;
    },
    data() {
      return {
        query: this.$route.query
      };
    },
    mounted() {

    }
  };
</script>
<style lang="scss" scoped>
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss">
  html, body, #app {
    height: 100%;
  }
</style>



