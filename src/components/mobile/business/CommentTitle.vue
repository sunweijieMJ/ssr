<template>
  <div class="comment-title" v-if="titleList && titleList.total" @click="queryAssign('thumbup', {id, type})">
      <div class="title-icon">
        <img v-lazy="imageSize(item.user_photo_url, '56x56')" alt="" v-for="(item,index) in titleList.items.slice(0,9)" :key="index">
        <span v-if="titleList.total >= 9">{{titleList.total > 99 ? '99+' : titleList.total}}</span>
      </div>
      <span>觉得很赞</span>
    </div>
</template>
<script>
  import frequent from '../../../mixins/frequent';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    data() {
      return {
        imageSize
      };
    },
    props: ['id', 'type', 'titleList']
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .comment-title {
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    height: 1rem;
    background-color: #fff;
    // border-top: 0.01rem solid $borderColor;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      top: 0; left: 0;
      box-sizing: border-box;
      width: 200%;
      height: 200%;
      transform: scale(0.5);
      transform-origin: left top;
      border-top: 1px solid $borderColor;
    }
    .title-icon {
      display: flex;
      img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.06rem;
        border-radius: 50%;
      }
      >span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.46rem;
        height: 0.46rem;
        border-radius: 50%;
        background-color: $intervalColor;
        font-size: 0.2rem;
        color: $subColor;
      }
    }
    >span {
      margin-left: 0.3rem;
      font-size: 0.24rem;
      color: $themeColor;
    }
  }
</style>

