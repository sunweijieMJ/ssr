<template>
  <div class="artwork">
    <ul>
      <li class="first-li" v-for="(vitem,vindex) in msg" :key="vindex">
        <h3>{{vitem.title}}</h3>
        <ul>
          <li v-for="(witem, windex) in vitem.content" :key="windex">
            <h4 v-if="witem.h1">{{witem.h1}}</h4>
            <h5 v-if="witem.h2">{{witem.h2}}</h5>
            <p v-if="witem.p" v-for="(xitem, xindex) in witem.p" :key="xindex">{{xitem}}</p>
          </li>
        </ul>
        <ul v-if="vitem.question" class="question">
          <li v-for="(xitem, xindex) in vitem.question" :key="xindex">
            <h4 class="ques">{{xitem.title}}</h4>
            <h5 v-if="xitem.content" v-for="(val, i) in xitem.content" :key="i">{{val}}</h5>
            <template v-if="xitem.table">
              <table>
                <tbody>
                  <tr v-for="(witem, windex) in xitem.table.body" :key="windex">
                    <td v-for="(val, i) in witem" :key="i" :class="{small: i > 1}">{{val}}</td>
                  </tr>
                </tbody>
              </table>
              <p>{{xitem.table.foot}}</p>
            </template>
            <template v-if="xitem.notice">
              <h5>{{xitem.notice.title}}</h5>
              <p v-for="(val, i) in xitem.notice.content" :key="i">{{val}}</p>
            </template>
          </li>
        </ul>
      </li>
      <p class="explain lh-footer">*注 :以上最终解释权归瓴里所有</p>
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
              {
                h2: '下单付款后，瓴里艺术品服务专员将立即联系您安排相应的配送服务，配送范围包含大陆以及香港地区，由专业服务公司实施运输和安装或挂放。'
              }
            ]
          },
          {
            title: '付款方式',
            content: [
              {
                h2: '微信和、支付宝、银行电汇和到店 POS 机刷卡'
              }
            ]
          },
          {
            title: '收货流程',
            content: [
              {
                h2: '请您在收货时，仔细检查您所购买的产品，确认艺术品数量、实物及画廊提供的艺术品证书是否与所订购的相符，如不符请立即联系瓴里艺术品服务专员或客服热线。'
              }
            ]
          },
          {
            title: '售后服务',
            content: [
              {
                h2: '售后问题请联系客服热线 400-819-0101'
              }
            ]
          },
          {
            title: '艺术品保养',
            content: [
              {
                h2: '请放置在干燥通风处，避免阳光直射，且避免重压。'
              }
            ]
          },
          {
            title: 'FAQ服务条款',
            question: [
              {
                title: 'Q: 瓴里平台下订单，是否可以开发票？',
                content: ['A: 可以，艺术品将由相应的画廊提供发票。请联系客服提供开具发票抬头，公司税号和签收发票地址。']
              },
              {
                title: 'Q: 瓴里平台用积分购买订单，是否可以开发票？',
                content: ['A: 如果订单金额全部以积分抵扣是无法开具发票的。开具发票条件是用户使用现金购买商品的消费金额，凡是用积分，折扣券，赠品等等优惠金额都不能开具发票。']
              },
              {
                title: 'Q: 下订单后，收货地址发生更变怎么办？',
                content: ['A: 如果你更变任何订单信息（比如收货人，收货地址，派送时间等），请直接联系客服。']
              },
              {
                title: 'Q: 下订单后，是否可以享受7天无理由退换货？',
                content: ['A: 由于艺术品的特殊性，不享有7天退换货服务。']
              }
            ]
          }
        ]
      };
    }
  };
</script>

