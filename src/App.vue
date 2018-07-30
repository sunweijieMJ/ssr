<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'APP'
}
</script>
<style>
html {
  font-size: 50px;
}
body {
  margin: 0;
  font-family: PingFang SC,Helvetica Neue,Helvetica,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
}
</style>
