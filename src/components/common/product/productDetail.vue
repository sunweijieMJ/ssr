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
  padding: 0.32rem 0.3rem 0px 0.3rem;
  word-wrap: break-word;
  font-size:0.32rem;
  background-color: #fff;
  p {
    padding-bottom: 0.3rem;
    font-weight: 300;
    line-height: 0.45rem;
    color: #777777;
  }
  h2, h3, h4 {
    font-weight: 300 !important;
  }
  h2 {
    font-size: 0.34rem;
    line-height: 0.51rem;
    padding-bottom: 0.13rem;
    color: rgb(68, 68, 68);
  }
  h3 {
    font-size: 0.34rem;
    line-height: 0.51rem;
    padding:0.22rem 0 0.13rem 0;
    color: rgb(68, 68, 68);
  }
  h4 {
    font-size: 0.26rem;
    padding: -0.1rem 0 0.08rem 0;
    line-height: 0.38rem;
    color:#999;
  }
  .customvideo {
    padding-bottom: .3rem;
  }
  img {
    display: block;
    width: 100%;
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

