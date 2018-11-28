<template>
  <div class="furniture">
    <ul>
      <li v-for="(vitem,vindex) in msg" :key="vindex">
        <h4>{{vitem.title}}</h4>
        <p v-if="Array.isArray(vitem.content)" v-for="(witem, windex) in vitem.content" :key="windex">{{witem}}</p>
        <ul v-if="!Array.isArray(vitem.content)">
          <h5>{{vitem.content.title}}</h5>
          <li v-for="(xitem, xindex) in vitem.content.content" :key="xindex">{{xitem}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: [
          {
            title: '配送范围和时间',
            content: [
              '大陆地区顺丰包邮。（港奥台、海外地区暂不派送）',
              '超出配送区域的，免费发至最近的服务网点，客户自行提货。',
              '下单付款后，24小时内发货（预售商品、双11/618等促销期间商品以及详情页有特别标注发货时间的商品除外）',
              '送达时效以顺丰快递实际配送为准。'
            ]
          },
          {
            title: '收货流程',
            content: {
              title: '请您在收货时，仔细检查一下您所购买的产品，注意请在运输人员在场的情况下确认',
              content: [
                '1.产品数量、型号是否与所订购的相符，如不符请勿打开产品包装并拒绝收货，并在签收单上注明。',
                '2.如产品外包装破损，可以直接拒绝收货。',
                '3.如有商品质量问题、运输过程中损坏、漏发错发等情况，可当场拒收； 请当场让运输人员将问题描述记录在签收单上作为证明。如已签收，请联系客服处理。'
              ]
            }
          },
          {
            title: '售后服务',
            content: ['瓴里自营商品和代理商品如售后问题请联系客服热线400-819-0101']
          }
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .furniture{
    padding: 0.4rem 0.3rem;
    li{
      margin-bottom: 0.4rem;
      &:last-child{
        margin-bottom: 0;
        p{
          margin-bottom: 0;
        }
      }
      h4{
        font-size: 0.3rem;
        font-weight: 400;
        line-height: 100%;
        color: $themeColor;
        margin-bottom: 0.2rem;
        padding-left: 0.2rem;
        position: relative;
        &:before{
          position: absolute;
          border-radius: 50%;
          left: 0;top: 0.1rem;
          content:"";
          width: 0.06rem;
          height: 0.06rem;
          background-color:#000;
        }
      }
      p{
        font-size: 0.26rem;
        line-height: 150%;
        color: $themeColor;
        margin-bottom: 0.2rem;
      }
      ul {
        h5{
          font-size: 0.28rem;
          font-weight: 400;
          line-height: 150%;
          letter-spacing: 0.6px;
          color: $themeColor;
          margin-bottom: 0.2rem;
        }
        li {
          padding-left: 0.2rem;
          font-size: 0.26rem;
          line-height: 150%;
          color: $themeColor;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
</style>

