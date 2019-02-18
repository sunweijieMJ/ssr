<template>
  <ul class="image-text">
    <li v-for="(item, index) in imgText" :key="index">
      <img v-lazy="imageSize(item.entity_photos[0], '690x0')" alt="">
      <p>{{item.entity_title | titleFilter}}</p>
    </li>
  </ul>
</template>
<script>
  import imageSize from '../../../../../utils/filters/imageSize.js';

  export default {
    props: ['imgText'],
    data() {
      return {
        imageSize
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .image-text {
    background-color: #fff;
    li {
      display: flex;
      align-items: center;
      padding: 0.3rem 0;
      border-bottom: 0.01rem solid $borderColor;
      &:last-child {
        border-bottom: 0;
      }
      img {
        width: 1.28rem;
        height: 0.96rem;
        border-radius: 0.02rem;
      }
      p {
        flex: 1;
        margin-left: 0.2rem;
        font-size: 0.32rem;
        font-weight: 400;
        line-height: 1.5;
        color: $themeColor;
      }
    }
  }
</style>


