<template>
  <div>
    <div class="nav">
      <span @click="back" style="font-size: 0.43rem;" class="iconfont icon-nav_ic_return"></span>
      <span>店铺图片</span>
      <span style="opacity: 0;" class="iconfont icon-nav_ic_return"></span>
    </div>
    <div class="img-box">
      <div v-for="(a, index) in img" :key="index">
        <img v-lazy="a" alt="" @click.stop="showImage(img, index)">
      </div>
    </div>
  </div>
</template>
<script>
import frequent from '../../../../mixins/frequent';
export default {
  name: 'storeimg',
  mixins: [frequent],
  data(){
    return {
      img: []
    };
  },
  title() {
    return '店铺图片';
  },
  meta() {
    return `<meta name="description" content="店铺图片">
    <meta name="keywords" content="店铺图片">`;
  },
  mounted(){
    this.img = JSON.parse(localStorage.getItem('arr_img'));
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.nav{
  padding:0.22rem 0.3rem;
  border: 1px solid #e8e8e8;
  justify-content: space-between;
  display: flex;
  position: fixed;
  top: 0;
  width: 6.9rem;
  font-size: 0.36rem;
  background-color: #fff;
  color: #222222;
}
.img-box{
  margin-top: 0.96rem;
  padding:0 0.3rem 0.56rem 0.3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  div{
    margin-top: 0.3rem;
  }
  img{
    width: 3.3rem;
    height: 3.3rem;
  }
}
</style>
