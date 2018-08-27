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
  padding: 10px 15px 0px 15px;
  word-wrap: break-word;
  font-size:1.5rem;
  p {
    margin-bottom: 15px;
    font-weight: 300;
    line-height: 170%;
    text-align: justify;
  }
  h2, h3, h4 {
    font-weight: 300 !important;
  }
  h2 {
    font-size: 1.7rem;
    line-height: 220%;
    padding:8px 0 3px 0;
  }
  h3 {
    font-size: 1.7rem;
    line-height: 200%;
    padding:8px 0 3px 0;
  }
  h4 {
    font-size: 1.3rem;
    margin-bottom: 0.4rem;
    margin-top: -0.75rem;
    line-height:150%;
    color:#999;
  }
  .customvideo {
    padding: 0rem 1.5rem;
    margin-bottom: 1.5rem;
  }
  img {
    display: block;
    padding-bottom: 6px;
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

