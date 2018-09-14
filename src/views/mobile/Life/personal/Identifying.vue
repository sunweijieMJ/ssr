<template>
  <div class="identify">
    <public-title :pageTitle="'标识说明'" v-if="!(response.__platform === 'app' || isTencent)"></public-title>
    <main>
      <h3>
        <img v-if="user_type == 2" src="../../../../../static/mobile/svg/list_ic_talent_52.svg" alt="">
        <img v-if="user_type == 3" src="../../../../../static/mobile/svg/list_ic_lanehuber_52.svg" alt="">
        <span>{{user_type == 3 ? L.title : V.title}}</span>
      </h3>
      <p v-for="(val,index) in (user_type == 3 ? L.content : V.content)" :key="index" v-html="val"></p>
      <div class="v-step" v-if="user_type == 2">
        <h4>{{step.title}}</h4>
        <p v-for="(val,index) in step.content" :key="index">{{val}}</p>
      </div>
      <p>如有相关问题，请联系</p>
      <a :href="response.__platform === 'app' ? 'javascript:;' : 'tel: 4008190101'">400-819-0101</a>
    </main>
    <p>本页面内容仅供参考，最终解释权属上海尉合信息技术有限公司</p>
  </div>
</template>
<script>
  import {PublicTitle} from '../../../../components/mobile/business';
  import {os} from '../../../../utils/business/judge.js';
  import {parseUrl} from '../../../../utils/business/tools.js';
  import v from '../../../../../static/mobile/svg/list_ic_talent_52.svg';
  import l from '../../../../../static/mobile/svg/list_ic_lanehuber_52.svg';

  export default {
    title() {
      return '标识说明';
    },
    meta() {
      return `<meta name="description" content="标识说明">
      <meta name="keywords" content="标识说明">`;
    },
    components: {
      PublicTitle
    },
    data(){
      return {
        response: {},
        isTencent: false,
        user_type: this.$route.query.type,
        L: {
          title: '瓴里员工',
          content: [
            `瓴里内部员工的标识，每位内部员工都会在个人详细资料页及个人头像旁显示标识 <img style="width:0.32rem;display:inline-block" src="${l}"/>。`,
            '瓴里伙伴是我们用户的贴心助手，若在使用瓴里App中出现问题，请在小伙伴的动态下留言，我们会第一时间与您沟通。',
            '感谢您加入瓴里，我们期待与您一起创造愉悦的生活方式。'
          ]
        },
        V: {
          title: '瓴里达人',
          content: [
            `经瓴里认证在垂直领域中专业达人，即可获得「瓴里认证达人」标识，并在个人详细资料页及个人头像旁显示标识 <img style="width:0.32rem;display:inline-block" src="${v}"/>。`,
            '我们欢迎各个领域里，和我们有相同品味和价值观的达人们入驻瓴里，分享精致生活，提升更多人的生活品质。',
            '若您也想成为「瓴里认证达人」请发送邮件至Hello@Lanehubinc.com'
          ]
        },
        step: {
          title: '邮件内容中请留下您的注册信息：',
          content: [
            '1.用户名',
            '2.注册电话号码',
            '3.申请达人的领域'
          ]
        }
      };
    },
    mounted() {
      this.response = parseUrl();
      this.isTencent = os().isWechat || os().isQQ;
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../assets/scss/_base.scss';

  .identify{
    width: 100%;
    main{
      padding: 0 0.3rem;
      h3{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.4rem 0 0.3rem;
        img{
          width: 0.52rem;
        }
        span{
          font-size: 0.32rem;
          line-height: 0.32rem;
          text-align: left;
          color: $themeColor;
          margin-left: 0.2rem;
        }
      }
      >p{
        font-size: 0.32rem;
        line-height: 0.48rem;
        color: $themeColor;
        margin-bottom: 0.5rem;
        &:last-of-type{
          margin: 0;
        }
      }
      .v-step{
        margin-bottom: 0.5rem;
        h4{
          font-size: 0.32rem;
          font-weight: 300;
          line-height: 0.48rem;
          color: $themeColor;
        }
        p{
          font-size:  0.32rem;
          line-height: 0.48rem;
          color: $themeColor;
        }
      }
      a{
        font-size: 0.3rem;
        font-weight: 100;
        line-height: 0.5rem;
        color: $darkBlue;
      }
    }
    >p{
      font-size: 0.22rem;
      text-align: center;
      color: $subColor;
      padding: 1.5rem 0 0.5rem;
    }
  }
</style>

