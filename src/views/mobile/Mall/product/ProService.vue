<template>
  <div class="profession-services">
    <public-title :pageTitle="'专业服务'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <ul class="services-content">
      <li v-for="(item1, index1) in text" :key="index1">
        <h3>
          <img :src="item1.icon" alt="">
          <span>{{item1.title}}</span>
        </h3>
        <ul>
          <li v-for="(item2, index2) in item1.content" :key="index2">
            <template v-if="item2.hasOwnProperty('title')">
              <h4>{{item2.title}}</h4>
              <p v-for="(val1, i1) in item2.content" :key="i1">{{val1}}</p>
              <ol class="desc">
                <li v-if="item2.subcontent" v-for="(val2, i2) in item2.subcontent" :key="i2">
                  <p>{{val2}}</p>
                </li>
              </ol>
            </template>
            <p v-else>{{item2}}</p>
            <p v-if="item1.link && index2 === 1">
              <a :href="response.app === 'i-lanehub' ? 'lanehub://profile/1037' : response.app === 'a-lanehub' ? 'lanehub://myhome/profile?id=1037' : '/profile/1037'">在线客服: 用户大当家</a>
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  import {PublicTitle} from '../../../../components/mobile/business';
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';
  import service_ic_deliviry from '../../../../../static/mobile/svg/service/service_ic_deliviry.svg';
  import service_ic_return from '../../../../../static/mobile/svg/service/service_ic_return.svg';
  import service_ic_save from '../../../../../static/mobile/svg/service/service_ic_save.svg';
  import service_ic_compersate from '../../../../../static/mobile/svg/service/service_ic_compersate.svg';
  import service_ic_after from '../../../../../static/mobile/svg/service/service_ic_after.svg';
  import service_ic_complain from '../../../../../static/mobile/svg/service/service_ic_complain.svg';

  export default {
    title() {
      return '专业服务';
    },
    meta() {
      return `<meta name="description" content="专业服务">
      <meta name="keywords" content="专业服务">`;
    },
    components: {
      PublicTitle
    },
    data() {
      return {
        response: {},
        isTencent: false,
        text: [
          {
            title: '免费配送及安装',
            icon: service_ic_deliviry,
            content: [
              {
                title: '小件商品',
                content: [
                  '顺丰快递全国包邮，具体送达范围参照《小件商品配送范围列表》。',
                  '超出配送区域的，免费发至最近的服务网点，客户自行提货。',
                  '订单付款成功后24小时内发货（预售商品、双11/618等促销期间商品以及详情页有特别标注发货时间的商品除外）。',
                  '送达时效以顺丰快递实际配送为准。',
                  '订购后您可以在瓴里APP查询商品配送信息，也可以通过第三方物流APP或网站查询配送信息。'
                ]
              },
              {
                title: '家具及大件商品',
                content: [
                  '为了保证服务质量，目前只开通上海地区（含崇明三岛）免费送装服务。',
                  '家具商品交货周期为订单付款成功后45天，您可以通过APP或工作人员提前确认需要交货的具体日期与时间段。',
                  '支持付款后修改订单信息，如收货人姓名、联系电话、送货地址等，联系客服为您更改。',
                  '安装日前我们可以为您提供免费上门勘察服务，主要包括车辆通行、入户条件、家具室内摆放位置、保护准备等。',
                  '使用无尘安装设备，最大程度避免因安装作业造成的灰尘污染。',
                  '安装完成后进行现场清洁整理。'
                ]
              },
              {
                title: '签收交付',
                content: [
                  '签收前务必先确定货物外包装的完好，且对您购买的每一件产品进行开箱验收，但请不要破坏原包装。',
                  '商品交付后代为保管商品包装30天，以备您发生退换货时使用。',
                  '如物流公司不配合，或者您在验收过程中发现因外包装问题而导致内部商品出现破损，少件等问题时，请拒绝签收，并立即致电客服进行处理。 如未进行验收即做签收，将认定已对商品进行了当面验收，并按照正常签收标准为处理售后问题。',
                  '在您家中无人且在您认可和允许可入户的情况下，瓴里亦可提供上门送装服务。',
                  '支持他人代收，委托他人代收的行为等同于本人对商品进行签收。'
                ]
              }
            ]
          },
          {
            title: '七天免费退换',
            icon: service_ic_return,
            content: [
              {
                title: '',
                content: [
                  '自签收之日起7天内可申请无理由退货，7天后可根据三包政策享受退换货服务。',
                  '退换货费用：顾客需要承担商品返回仓库的返程运费，顾客可选择合适的物流服务商，仓库在接收货品时开箱验货，若商品在运输途中产生了货损，将拒绝签收，建议发货时自行购买保险，预防货损风险。',
                  '不退换商品：定制类商品不支持7天无理由退换货，若无质量问题，恕不退换。',
                  '退换货要求：'
                ],
                subcontent: [
                  'a.  需商品本身完好，产品未经安装、组装及使用，不影响二次销售。',
                  'b.  包装视为产品本身的一部分，退货时需要保持包装的完整，建议收到货品后，保留原包装7天后，再自行处理。',
                  'c.  退货时无法提供原包装，将收取包装费，标准为购买时产品原价的12%，最低20，最高500。',
                  'd.  若因产品质量问题产生的退换货，按“三包”服务标准执行。'
                ]
              },
              {
                title: '退换货流程',
                content: [
                  '对于商品质量问题，需向瓴里客服提供证据，客服收到证据后，将按质量“三包”标准进行办理。若确实产生退换货，应在妥善包装后退回商品，并在商品中附上用户信息及订单号，返回方式及地址与客服确认；',
                  '如退换货订单中包含赠品，需将赠品寄回，若赠品破损或遗失，需扣除赠品价值等额的货款，若已经开具发票而发票遗失，则相应的退税点（16%）需由您承担；',
                  '收到寄回的产品后，将确定货物情况，与顾客确认换货或退货完成，如因顾客包装不善造成的货损，需由顾客承担；因退换货产生退款，现金部分将通过原支付方式退回，优惠券将退回账户，原有效期不变。',
                ]
              }
            ]
          },
          {
            title: '免费仓租及保价政策',
            icon: service_ic_save,
            content: [
              '提供最长180天免费仓储服务。',
              '180天后，收取10元/天/m³的仓储保管费。',
              '指定渠道的特殊活动（如门店独享、推广活动等），不在主站／App价格保护政策范围之内。',
              '自下单起15天内，若主站／App上的产品价格出现折扣或有其他形式的促销活动，可以申请价格保护；每张订单可以享受一次价格保护，可联系客服提出申请。',
              '折扣差价及活动差价将以无限期全场优惠券的形式，返还到账户，可在购买时抵用。'
            ]
          },
          {
            title: '逾期赔付承诺',
            icon: service_ic_compersate,
            content: [
              '承诺100%准时发货， 但若有紧急情况导致发货日期必须延迟， 为客户的损失提供高达每日千分之四，月利12%高利赔偿。',
              '产品付款金额X逾期发货天数X 4‰ （最高赔付金额为逾期产品金额30%）。',
              '赔付以全场通用优惠券形式发放到您的账户。'
            ]
          },
          {
            title: '三包售后服务',
            icon: service_ic_after,
            content: [
              {
                title: null,
                content: [
                  '质保为期三年，首年免费。三包服务以产品实际签收日期为起始日。 质保期内，产品在正常使用和维护的情况下出现问题，经检测若属于产品质量问题，将提供维修，直至问题解决。',
                  '质保期内，第二年起，将根据实际情况提供服务，并收取原材料成本、上门维修费等合理费用，具体金额会在每次服务发生前与顾客商定。',
                  '商品退换 ,“三包”质保服务范围内，若产品在正常使用过程中出现质量问题，我们将按照以下标准解决问题：'
                ],
                subcontent: [
                  'a. 维修：在“三包”期限内，产品出现质量问题，造作将负责维修；',
                  'b. 更换：在“三包”期限内，若同一问题经两次维修后仍未能解决，我们将更换产品；',
                  'c. 退货：在“三包”期限内， 同一产品经两次更换后，仍无法达到质量标准的，您可以选择更换其他同类产品或退货。'
                ]
              },
              {
                title: '非三包范围',
                content: [
                  '因拍摄设备、显示器、光线等原因产生的色差，不属于商品质量问题。',
                  '因商品测量标准不一致导致的尺寸问题，在相关标准规定的尺寸误差内，不属于商品质量问题。',
                  '材料，工艺产生的天然瑕疵，不属于商品质量问题',
                  '未按照造作标准收货程序签收，拆包不当造成的损坏；由于不正当使用产品或部件而造成的人身和财产损失。',
                  '未按照造作产品组装说明书操作，错误组装造成的产品损坏；未按照组装说明书要求，自行更换部件造成的损坏；',
                  '客户自行拆装、调换产品，或在错误的环境使用造成的损坏。',
                  '不正确的维护保养，或未按照造作“产品使用和保养手册”操作导致的损坏；非专业人士修理导致的损坏其它使用，维    护，保管不当及人为损坏的情况。',
                  '客户不能提供购买发票与保修卡，或者擅自涂改保修卡。',
                  '因其它不可抗拒力（地震，火灾）等造成的产品损坏。',
                  '玻璃镜子发生霉变和雾光的三包期限为六个月，处理家具商品只享受包修服务。'
                ]
              }
            ]
          },
          {
            title: '投诉与受理',
            icon: service_ic_complain,
            link: true,
            content: [
              '如因为瓴里的产品或服务让您产生不愉快的感受,我们深表歉意,也请您一定与我们联系,让我们以最快的速度为您解决问题。',
              '服务电话: 4008190101'
            ]
          }
        ]
      };
    },
    mounted(){
      let that = this;
      that.response = parseUrl();
      that.isTencent = os().isWechat || os().isQQ;
    }
  };
</script>
<style lang="scss" scoped>
 @import '../../../../assets/scss/_base.scss';

  .profession-services {
    .services-content {
      padding: 0.4rem 0.3rem;
      background-color: #fff;
      >li {
        margin-bottom: 0.4rem;
        &:last-child {
          margin-bottom: 0;
        }
        h3 {
          display: flex;
          align-items: center;
          margin-bottom: 0.3rem;
          font-size: 0.34rem;
          font-weight: 500;
          color: $themeColor;
          img {
            width: 0.48rem;
            margin-right: 0.1rem;
          }
        }
        h4 {
          margin-bottom: 0.25rem;
          font-size: 0.32rem;
          font-weight: 400;
          color: $themeColor;
        }
        p {
          margin-bottom: 0.2rem;
          &:last-child {
            margin-bottom: 0;
          }
          font-size: 0.3rem;
          color: $themeColor;
        }
        a {
          font-size: 0.3rem;
          color: $darkBlue;
        }
        .desc {
          padding-left: 0.3rem;
          li {
            margin-bottom: 0.2rem;
          }
          p {
            font-size: 0.3rem;
            color: $subColor;
          }
        }
      }
    }
  }
</style>

