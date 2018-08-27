<template>
  <div class="comment-title" v-if="titleList.total">
      <div class="title-icon">
        <img :src="item.user_photo_url" alt="" v-for="(item,index) in titleList.items.slice(0,9)" :key="index">
        <span v-if="titleList.total >= 9">{{titleList.total}}</span>
      </div>
      <span>觉得很赞</span>
    </div>
</template>
<script>
  export default {
    props: ['titleList']
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .comment-title {
      display: flex;
      align-items: center;
      padding: 0 0.3rem;
      height: 1rem;
      border-bottom: 0.01rem solid #f1f1f1;
      background-color: #fff;
      .title-icon {
        img {
          float: left;
          border: none;
          margin-right: 0.06rem;
          width: 0.46rem;
          height: 0.46rem;
          border-radius: 50%;
        }
        >span {
          float: left;
          width: 0.46rem;
          height: 0.46rem;
          border-radius: 50%;
          background-color: #f5f5f5;
          font-size: 0.2rem;
          font-weight: 300;
          line-height: 0.46rem;
          text-align: center;
          color: $subColor;
        }
      }
      >span {
        margin-left: 0.3rem;
        font-size: 0.24rem;
        font-weight: 300;
        line-height: 0.24rem;
        color: $themeColor;
      }
    }
</style>

