<template>
  <div class="lane-day">
    <div class="distr">
      <div class="header">
        <span>设计与品质至上的品牌</span>
      </div>
      <div class="dis-img">
        <img src="../../../../../static/mobile/img/personal/Group6.png" alt="">
      </div>
      <div class="content">
        <p>瓴里是生活方式新零售品牌，在米兰成立设计中心，与全球优秀设计师合作，提供生活方式全新选择。</p>
      </div>
      <div class="address">
        <div class="add-title">体验店地址：</div>
        <div class="add-blue"><span class="iconfont icon-location_lb_normal"></span><span>上海虹口区东大名路 501 号 L1-09</span></div>
      </div>
    </div>
    <div class="img">
      <div>
        <img src="../../../../../static/mobile/img/personal/Group3.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/Group1.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/Group2.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/Group4.png" alt="">
      </div>
    </div>
    <div class="add-bg">

    </div>
  </div>
</template>
<script>
export default {
  name: 'laneday',
  data(){
    return {
      
    };
  }
};
</script>
<style lang="scss" scoped>
.lane-day{
  .distr{
    padding: 0.4rem 0.3rem 0 0.3rem;
    .dis-img{
      margin-top: 0.4rem;
      width: 6.9rem;
      height: 3.89rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .header{
      margin-top: 0.05rem;
      font-size: 0.4rem;
      font-weight: 400;
      color: #222222;
    }
    .content{
      margin-top: 0.33rem;
      p{
        font-size: 0.3rem;
        color: #222222;
        line-height: 0.48rem;
      }
    }
    .address{
      font-size: 0.3rem;
      color: #222222;
      .add-title{
        margin-top: 0.3rem;
        font-weight:300;
        line-height: 0.32rem;
      }
      .add-blue{
        margin-top: 0.19rem;
        font-weight:400;
        color: #0072DD;
        line-height: 0.42rem;
        .iconfont{
          margin-right: 0.1rem;
        }
      }
    }
  }
  .img{
    margin-top: 0.6rem;
    width: 100%;
    div{
      width: 6.9rem;
      height: 2.4rem;
      margin: 0 auto 0.2rem auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .add-bg{
    margin-top: 0.5rem;
    width: 100%;
    height: 0.2rem;
    background-color: #F5F5F5;
    border-radius: 1px;
  }
}
</style>
