<template>
  <div class="structure">
    <div class="item">
      <div class="title">什么是瓴里值？</div>
      <p>瓴里值是记录每一位用户在瓴里平台产生互动，贡献和消费等行为的成长值。</p>
    </div>
    <div class="distribute">
      <div class="item1 item">怎么获得瓴里值？</div>
      <div class="content">
        <div class="title">现金消费</div>
        <p>按实际支付金额的50%奖励瓴里值（现金消费100元=50瓴里值）</p>
      </div>
      <div class="content">
        <div class="title">获取积分</div>
        <p>按“用户积分指南”获得积分同时奖励相应瓴里值（100积分=100瓴里值）</p>
      </div>
    </div>

    <div class="distribute">
      <div class="item1 item">瓴里值有什么用？</div>
      <div class="use">
        <p>通过累计瓴里值决定VIP会员等级。</p>
        <p> 不同 VIP 会员等级享受不同会员权益，详情参见 “会员中心”</p>
      </div>
      <div class="p3">
        <p>瓴里会员 ——0～4999</p>
        <p>悦蓝会员(VIP) ——5000～99999</p>
        <p>臻蓝会员(SVIP) ——100000+</p>
      </div>
      
      <div class="item1 item">疑问解答</div>
      <div class="question">
        <div class="Q">
          <span>Q: </span><span>我用积分购物可以获得瓴里值吗？</span>
        </div>
        <div class="A">
          <span>A: </span><span>不可以，购物订单金额中凡是现金消费部分可 以换算成瓴里值(现金消费100元=50瓴里值)。</span>
        </div>

        <div class="Q">
          <span>Q: </span><span>用现金在商城购买商品产生了退货，退货完成 之前瓴里值会被扣回会影响我们的等级吗？</span>
        </div>
        <div class="A">
          <span>A: </span><span>会的，退款时，按退款金额相应扣除购买奖励 的瓴里值。如果瓴里值降到当前等级瓴里值标 准以下，会员等级也会相应降低。</span>
        </div>

        <div class="Q">
          <span>Q: </span><span>瓴里值会减少吗？</span>
        </div>
        <div class="A">
          <span>A: </span><span>会，比如购物退货或者在使用恶意，违规操 作，用户举报等手段造成平台的负面影响，经 过平台查询属实进行扣除相应瓴里值。</span>
        </div>

        <div class="node">*注: 以上最终解释权归瓴里所有</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LinLiValue',
  data(){
    return {

    };
  },
  title() {
    return '瓴里值';
  },
  meta() {
    return `<meta name="description" content="瓴里值">
    <meta name="keywords" content="瓴里值">`;
  }
};
</script>
<style lang="scss" scoped>
.structure{
  padding: 0 0.44rem;
  background-color: white;
  .item{
    margin-top: 0.8rem;
    .title{
      font-size:0.36rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#222222;
      line-height:1;
    }
    p{
      font-size:0.3rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:#222222;
      line-height:0.42rem;
      margin-top: 0.3rem;
    }
  }
  .distribute{
    margin-top: 0.8rem;
    .item1{
      font-size:0.36rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#222222;
      line-height:1;
    }
    .p3{
      font-size:0.3rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:1;
      p{
        margin-top: 0.3rem;
      }
    }
    .use{
      margin-top: 0.3rem;
      p{
        font-size:0.3rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(34,34,34,1);
        line-height:0.42rem;
      }
    }
    .content{
      margin-top: 0.5rem;
      color:#222222;
      line-height:1;
      font-size:0.3rem;
      font-family:PingFangSC-Regular;
      .title{
        font-weight:400;
      }
      p{
        margin-top: 0.16rem;
        font-weight:300;
        line-height: 0.42rem;
      }
    }
    .question{
      font-size:0.3rem;
      font-family:PingFangSC-Light;
      color:rgba(34,34,34,1);
      line-height: 0.42rem;
      .Q{
        margin-top: 0.5rem;
        font-weight: 400;
      }
      .A{
        font-weight:300;
        margin-top: 0.16rem;
      }
      div{
        display: flex;
        justify-content: flex-start;
        span:nth-child(2){
          margin-left: 0.16rem;
        }
      }
      .node{
        font-size:0.3rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(119,119,119,1);
        line-height:0.42rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
