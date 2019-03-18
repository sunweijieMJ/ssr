<template>
  <div class="use-constr">
    <div class="box">
      <span class="title">使用说明:</span>
      <div class="text" v-for="(b, bindex) in content" :key="bindex">
        <span>{{b.num}}.</span>
        <p>{{b.p}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UseConstruct',
  data(){
    return {
      content: [
        {
          num: 1,
          p: '该礼包只限首次注册瓴里账号用户领取，已注册 用户不可领取。'
        },
        {
          num: 2,
          p: '满减券不可以和其他优惠券同时使用，一个订单 最多只能使用一张满减券。'
        },
        {
          num: 3,
          p: '系统会自动选择优惠力度最大的优惠券，你也可 以选择要使用哪张券。'
        },
        {
          num: 4,
          p: '满减券自发放日起 7 天内有效。'
        },
        {
          num: 5,
          p: '如通过不正当手段参与此活动，我司有权利收回 相应优惠券。'
        },
        {
          num: 6,
          p: '瓴里对发行的优惠券拥有最终解释权'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.use-constr{
  .box{
    padding: 0.4rem 0.3rem;
    .title{
      font-size: 0.36rem;
      display: inline-block;
      font-weight: 400;
      color: #222222;
      line-height: 1;
      margin-bottom: 0.6rem;
    }
    .text{
      display: flex;
      font-size: 0.30rem;
      font-weight: 400;
      color: #222222;
      p{
        line-height: 0.4rem;
        margin-left: 0.1rem;
      }
    }
  }
}
</style>
