<template>
  <div class="partner">
    <ul>
      <li v-for="(item,index) in image_content" :key="index">
        <img :src="item.img" alt="简介图">
        <h4>{{item.title}}</h4>
        <p v-for="(val,index) in item.desc" :key="index">{{val}}</p>
      </li>
    </ul>
    <div class="contact">
      <p>联系我们</p>
      <a href="mailto:wmzeng@lanehubinc.com">wmzeng@lanehubinc.com</a>
    </div>
  </div>
</template>
<script>
  import cooperate_img_01 from '../../../assets/web/img/cooperate_img_01.jpg';
  import cooperate_img_02 from '../../../assets/web/img/cooperate_img_02.jpg';
  import cooperate_img_03 from '../../../assets/web/img/cooperate_img_03.jpg';

  export default {
    data(){
      return {
        image_content: [
          {
            img: cooperate_img_01,
            title: '设计师',
            desc: ['如果你有改变世界的想法，', '如果有足够的能量支撑你改变世界，', '瓴里有许多跟你一样的人，', '期待你为这个团队增添更多色彩。']
          },
          {
            img: cooperate_img_02,
            title: '供应链',
            desc: ['建立依托中国，全球化的供应链体系。', '如果你在家具、家居产品领域有优秀的生产能力，或在仓储物流领域有领先实力，我们愿意和你共同成长。']
          },
          {
            img: cooperate_img_03,
            title: '高端物业',
            desc: ['计划 2019 年覆盖全国一、二线城市，建成体验中心 20 家。', '期待与新颖高端、有品位、追求更好用户互动的商业空间，共创全新体验。']
          }
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @media screen and(max-width:1440px){
    .partner{
      min-width: 1280px;
      ul{
        margin: 123px auto 0;
        width: 1180px;
        overflow: hidden;
        li{
          float: left;
          width: 380px;
          margin-right: 20px;
          &:last-child{
            margin-right: 0;
          }
          img{
            display: block;
            width: 380px;
            height: 380px;
          }
          h4{
            font-size: 34px;
            font-weight: 300;
            line-height: 34px;
            letter-spacing: 2px;
            text-align: left;
            color: #000000;
            margin: 40px 0 36px;
          }
          p{
            font-size: 18px;
            font-weight: 300;
            line-height: 32px;
            letter-spacing: 1.5px;
            text-align: left;
            color: #000000;
          }
        }
      }
      .contact{
        padding-top: 130px;
        margin: auto;
        p{
          font-size: 22px;
          line-height: 22px;
          letter-spacing: 1.8px;
          text-align: center;
          font-weight: 300;
          color: #000000;
        }
        a{
          font-size: 22px;
          font-weight: 300;
          line-height: 22px;
          letter-spacing: 1.8px;
          margin: 20px auto 0;
          color: #197bce;
          position: absolute;
          left:50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
        }
      }
    }
  }
  @media screen and(min-width:1440px){
    .partner{
      min-width: 1280px;
      ul{
        margin: 123px auto 0;
        width: 1180px;
        overflow: hidden;
        li{
          float: left;
          width: 380px;
          margin-right: 20px;
          &:last-child{
            margin-right: 0;
          }
          img{
            display: block;
            width: 380px;
            height: 380px;
          }
          h4{
            font-size: 40px;
            font-weight: 300;
            line-height: 40px;
            letter-spacing: 2px;
            text-align: left;
            color: #000000;
            margin: 40px 0 36px;
          }
          p{
            font-size: 20px;
            font-weight: 300;
            line-height: 36px;
            letter-spacing: 1.5px;
            text-align: left;
            color: #000000;
          }
        }
      }
      .contact{
        padding-top: 130px;
        margin: auto;
        p{
          font-size: 24px;
          line-height: 24px;
          letter-spacing: 1.8px;
          text-align: center;
          font-weight: 300;
          color: #000000;
        }
        a{
          font-size: 24px;
          font-weight: 300;
          line-height: 24px;
          letter-spacing: 1.8px;
          margin: 20px auto 0;
          color: #197bce;
          position: absolute;
          left:50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
        }
      }
    }
  }
</style>
