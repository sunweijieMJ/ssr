<template>
  <div class="gift-result">
    <div class="title" v-if="status">领取成功</div>
    <div class="title" v-else>不可领取</div>

    <div class="content" v-if="status">优惠券已经放入你的账户中</div>
    <div class="content" v-else>该礼包仅限首次注册用户领取一次</div>

    <div class="btn" v-if="status" @click.stop="intercept">打开 App 去使用</div>
    <div class="btn2" v-else @click.stop="intercept">打开 App</div>
  </div>
</template>
<script>
import frequent from '../../../../mixins/frequent';
export default {
  name: 'NewGiftResult',
  mixins: [frequent],
  data(){
    return {
      status: null
    };
  },
  title() {
    return '瓴里-新人礼包';
  },
  meta() {
    return `<meta name="description" content="Lanehub  瓴里-新人礼包">
    <meta name="keywords" content=" 瓴里-新人礼包">`;
  },
  methods: {

  },
  mounted(){
    this.status = +this.$route.query.status;
  }
};
</script>
<style lang="scss" scoped>
.gift-result{
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .title{
    font-size: 0.44rem;
    font-weight:400;
    color: #222222;
    line-height: 0.62rem;
    padding-top: 0.82rem;
  }
  .content{
    font-size: 0.32rem;
    font-weight:300;
    color: #777777;
    line-height:0.45rem;
    margin-top: 0.18rem;
  }
  .btn{
    width: 5.9rem;
    height: 0.96rem;
    background: #0072DD;
    border-radius: 0.48rem;
    margin: 0.45rem auto;
    text-align: center;
    line-height: 0.96rem;
    font-size: 0.4rem;
    color: #FFFFFF;
  }
  .btn2{
    width: 4.18rem;
    height: 0.96rem;
    background: #0072DD;
    border-radius: 0.48rem;
    margin: 0.45rem auto;
    text-align: center;
    line-height: 0.96rem;
    font-size: 0.4rem;
    color: #FFFFFF;
  }
}
</style>
