<template>
  <div class="lane-day">
    <div class="distr">
      <div class="header">
        <span class="iconfont icon-download_ic_logo"></span>
        <!-- <span class="iconfont icon-footer_ic_logo"></span> -->
        <span class="lanehub"> LANEHUB </span>
        <span>Make Your Day</span>
      </div>
      <div class="content">
        <p>LANEHUB 是生活方式新零售品牌，整合全球设计资源，在米兰成立设计中心，
          并与丹麦、日本等全球各地优秀设计师合作，提供生活方式全新选择，创造超越期待的多维度体验。</p>
      </div>
    </div>
    <div class="img">
      <div>
        <img src="../../../../../static/mobile/img/personal/img1.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/member_02.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/member_03.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/member_04.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/member_05.png" alt="">
      </div>
      <div>
        <img src="../../../../../static/mobile/img/personal/member_06.png" alt="">
      </div>
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
    padding: 0.8rem 0.3rem 0 0.3rem;
    .header{
      margin-top: 0.05rem;
      font-size:0.4rem;
      font-weight:400;
      color: #222222;
      .iconfont{
        font-size: 0.4rem;
        // margin-right: 0.09rem;
      }
      span{
        line-height: 1;
      }
      .lanehub{
        font-weight: 500;
      }
    }
    .content{
      margin-top: 0.33rem;
      p{
        font-size: 0.28rem;
        color: #222222;
        line-height: 0.42rem;
      }
    }
  }
  .img{
    width: 100%;
    overflow-x: scroll;
    margin-top: 0.3rem;

    display: flex;
    justify-content: flex-start;
    &::-webkit-scrollbar {display:none}
    div{
      width: 5rem;
      height: 2.81rem;
      margin-left: 0.3rem;
    }
    img{
      width: 5rem;
      height: 2.81rem;
      border-radius:0.1rem;
    }
  }
}
</style>
