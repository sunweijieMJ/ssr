<template>
  <div class="detail_contain">
    <div v-html="response.description"></div>
  </div>
</template>
<script>
export default {
  props: ['response']
};
</script>
<style lang="scss">
.detail_contain {
  padding:0.42rem 0 0.1rem 0;
  word-wrap: break-word;
  background-color: #fff;
  p {
    padding-bottom: 0.3rem;
    margin: 0 0.3rem;
    font-weight: 300;
    line-height: 0.48rem;
    font-size: 16px;
    color: #777;
  }
  h2, h3, h4 {
    margin: 0 0.3rem;
    font-weight: 320 !important;
  }
  h2 {
    font-size: 17px;
    line-height: 0.51rem;
    padding-bottom: 0.13rem;
    color: rgb(68, 68, 68);
  }
  h3 {
    font-size: 17px;
    line-height: 0.51rem;
    padding:0.22rem 0 0.13rem 0;
    color: rgb(68, 68, 68);
  }
  h4 {
    font-size: 13px;
    padding: -0.1rem 0 0.08rem 0;
    line-height: 0.38rem;
    color:#999;
  }
  .customvideo {
    padding-bottom: .3rem;
  }
  img {
    margin: 0 -0.3rem;
    width: calc(100% + 0.6rem);
    width: -moz-calc(100% + 0.6rem);
    width: -webkit-calc(100% + 0.6rem);
    border: none;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
}
</style>

