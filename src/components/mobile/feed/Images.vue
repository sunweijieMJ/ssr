<template>
  <div class="feed-images" :class="[`imgs-${images.length}`, {single: $route.name === 'MomentDetail'}, {notMoment: +type !== 6}]">
    <img v-for="(val, i) in ($route.name === 'MomentDetail' ? images : images.slice(0, 3))" :key="i"
      v-lazy="imageSize(val, images.length)" alt="" @click="activeImage($event, images, i)">
    <span v-if="$route.name !== 'MomentDetail' && images.length >= 4">{{images.length}}</span>
  </div>
</template>
<script>
  import frequent from '../../../mixins/frequent.js';
  import imageSize from '../../../utils/filters/imageSize.js';

  export default {
    mixins: [frequent],
    props: ['images', 'type'],
    methods: {
      imageSize(url, length) {
        switch (length) {
          case 1:
            if(+this.type !== 6) return imageSize(url, '690x388');
            if(this.$route.name !== 'MomentDetail') return imageSize(url, '330x330');
            return imageSize(url, '690x0');
            break;
          case 2:
            return imageSize(url, '330x330');
            break;
          case 4:
            if(this.$route.name !== 'MomentDetail') return imageSize(url, '220x220');
            return imageSize(url, '330x330');
            break;
          default:
            return imageSize(url, '220x220');
            break;
        }
      },
      activeImage(e, data, index) {
        let that = this;
        if(that.$route.name === 'MomentDetail') {
          that.showImage(data, index);
          e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/_base.scss';

  .feed-images {
    position: relative;
    overflow: hidden;
    img {
      float: left;
    }
    span {
      position: absolute;
      top: 1.56rem; right: 0.15rem;
      width: 0.25rem;
      height: 0.56rem;
      font-size: 0.4rem;
      color: #fff;
      text-shadow:0px 0px 0.1rem rgba(0,0,0,0.35);
    }
    &.imgs-1, &.imgs-2 {
      img {
        width: 3.35rem;
        height: 3.35rem;
        border-radius: 0.04rem;
        &:nth-child(2) {
          margin-left: 0.2rem;
        }
      }
    }
    &.imgs-3, &.imgs-4, &.imgs-5, &.imgs-6, &.imgs-7, &.imgs-8, &.imgs-9 {
      img {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 0.04rem;
        &:nth-child(1), &:nth-child(2) {
          margin-right: 0.15rem;
        }
      }
    }
    &.single {
      &.imgs-1 {
        img {
          min-height: 3.88rem;
          max-height: 12.26rem;
          width: 100%;
          height: auto;
          border-radius: 0.06rem;
        }
      }
      &.imgs-2 {
        img {
          width: 3.35rem;
          height: 3.35rem;
          border-radius: 0.06rem;
          &:nth-child(1) {
            margin-right: 0.2rem;
          }
          &:nth-child(2) {
            margin-left: 0;
          }
        }
      }
      &.imgs-3 {
        img {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 0.04rem;
          &:nth-child(1), &:nth-child(2) {
            margin-right: 0.15rem;
          }
        }
      }
      &.imgs-4 {
        img {
          width: 3.35rem;
          height: 3.35rem;
          border-radius: 0.06rem;
          &:nth-child(1), &:nth-child(2) {
            margin-bottom: 0.2rem;
          }
          &:nth-child(1), &:nth-child(3) {
            margin-right: 0.2rem;
          }
        }
      }
      &.imgs-5, &.imgs-6 {
        img {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 0.04rem;
          &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            margin-bottom: 0.15rem;
          }
          &:nth-child(1), &:nth-child(2), &:nth-child(4), &:nth-child(5) {
            margin-right: 0.15rem;
          }
        }
      }
      &.imgs-7, &.imgs-8, &.imgs-9 {
        img {
          width: 2.2rem;
          height: 2.2rem;
          margin: 0 0.15rem 0.15rem 0;
          border-radius: 0.04rem;
          &:nth-child(7), &:nth-child(8), &:nth-child(9) {
            margin-bottom: 0;
          }
          &:nth-child(3), &:nth-child(6), &:nth-child(9) {
            margin-right: 0;
          }
        }
      }
    }
    &.notMoment {
      img {
        width: 100%;
        height: 3.88rem;
        border-radius: 0.06rem;
      }
    }
  }
</style>

