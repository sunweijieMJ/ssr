<template>
  <div>
    <div class="nav">
      <span @click="back" class="iconfont icon-nav_ic_return"></span>
      <span>选择店铺</span>
      <span style="opacity: 0;" class="iconfont icon-nav_ic_return"></span>
    </div>
    <div class="banner">
      <div class="img">
        <img src="https://p0.ssl.qhimg.com/t013cacbb2aaaed576d.jpg" alt="">
        <div class="over">
          <p>LANEHUB 白玉兰广场旗舰店</p>
          <p>营业时间： 10:00-22:00， 距你 6 km</p>
        </div>
      </div>
      <div class="img">
        <img src="https://p0.ssl.qhimg.com/t013cacbb2aaaed576d.jpg" alt="">
        <div class="none">
          <p>敬请期待</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'storelist',
  data(){
    return {

    };
  },
  title() {
    return '店铺';
  },
  meta() {
    return `<meta name="description" content="店铺">
    <meta name="keywords" content="店铺">`;
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
  padding: 0.3rem;
  border: 1px solid #e8e8e8;
  justify-content: space-between;
  display: flex;
  position: fixed;
  top: 0;
  width: 6.9rem;
}
.banner{
  margin-top: 1rem;
  padding: 0.3rem 0.3rem;
  .img{
    width: 6.9rem;
    position: relative;
    margin-bottom: 0.3rem;
    img{
      width: 100%;
      height: 3.88rem;
      border-radius: 0.1rem;
    }
    .over{
      position: absolute;
      left: 0.2rem;
      bottom: 0.2rem;
      color: #fafafa;
    }
    .none{
      position: absolute;
      top: 0;
      width: 6.9rem;
      text-align: center;
      height: 3.88rem;
      border-radius: 0.1rem;
      background-color:rgba(30,144,255,0.8);
      p{
        line-height: 3.88rem;
        color: #fafafa;
      }
    }
  }
}
</style>
