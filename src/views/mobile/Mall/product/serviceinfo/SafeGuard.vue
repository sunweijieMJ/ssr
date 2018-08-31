<template>
	<div class="safeguard">
    <ul>
      <li v-for="(item,index) in msg" :key="index">
        <h4>{{item.title}}</h4>
        <p v-for="(val,index) in item.content" :key="index">{{val}}</p>
        <table v-if="index === 0">
          <tbody>
            <tr v-for="(item, index) in table" :key="index">
              <td v-for="(val, i) in item" :key="i">{{val}}</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
	</div>
</template>
<script>
  export default {
    data(){
      return{
        msg: [
          {
            title: '7 天无理由退换货',
            content: ['自确认收货之日起7天内，可联系客服申请无理由退换货服务（床品、贴身衣物等特殊商品除外）。具体类别参看下表：']
          },
          {
            title: '顺丰包邮',
            content: ['大陆地区顺丰包邮。（港澳台、海外地区暂不派送，敬请谅解）']
          }
        ],
        table: [
          ['退换类别', '具体描述', '是否支持 7 天无理由退换货', '是否收取退回运费'],
          ['国家法律所规定的功能性故障或商品质量问题', '经由生产厂家指定或特约售后服务中心检测确认，并出具检测报告或经客服确认属于商品质量问题', '是', '否'],
          ['运输过程中产生损坏、漏发错发等原因或商品描述与实际不符', '运输过程中造成的损坏、漏液、破碎、性能故障等请于收到货后24小时内反馈，经核查情况属实。（漏发错发指商品原装配件缺失或者错发商品）', '是', '否'],
          ['其他等个人原因', '除以上两种原因之外，如个人原因导致的退换货，原包装、配件、吊牌标识等完好，商品和配件无磨损和污渍、无使用和水洗痕迹，产品未经安装组装及使用、包装完整不影响二次销售的前提下', '是', '是']
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .safeguard{
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
        font-size: 0.28rem;
        font-weight: 400;
        line-height: 0.28rem;
        letter-spacing: 0.6px;
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
        font-weight: 300;
        line-height: 0.4rem;
        letter-spacing: 0.6px;
        color: $themeColor;
        margin-bottom: 0.2rem;
      }
      table, tr, td{
        border-spacing: 0;
        border-collapse: collapse;
        table-layout: fixed;
        border: 1px solid#999999;
      }
      td{
        width: 1.6rem;
        padding: 0.15rem;
        font-size: 0.2rem;
        font-weight: 300;
        letter-spacing: 0.6px;
        color: $themeColor;
      }
    }
  }
</style>
