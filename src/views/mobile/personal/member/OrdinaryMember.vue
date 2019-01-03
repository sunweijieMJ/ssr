<template>
  <div class="ordinary">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-Graphics_CustomIc3"></use>
      </svg>
      <span>
        现金购物返瓴里值
        <p>例如实付 100 元，可得 50 瓴里值</p>
      </span>
    </div>
    <div class="intro">
      <div class="distr">
        如何升级至悦蓝会员？
      </div>
      <div class="ul">
        <div class="li">
          <div>
            <span class="iconfont icon-personal_ic_save"></span>
            <span>现金购物</span>
          </div>
          <div>
            <span class="iconfont icon-personal_ic_save"></span>
            <span>动态被选为精华</span>
          </div>
          <div>
            <span class="iconfont icon-personal_ic_save"></span>
            <span>有价值的意见反馈</span>
          </div>
        </div>
        <div class="li">
          <div>
            <span class="iconfont icon-personal_ic_save"></span>
            <span>连续签到</span>
          </div>
          <div>
            <span class="iconfont icon-personal_ic_save"></span>
            <span>维护资料</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OrdinaryMember',
  data(){
    return {
    };
  },
  title() {
    return '普通会员';
  },
  meta() {
    return `<meta name="description" content="普通会员">
    <meta name="keywords" content="普通会员">`;
  }
};
</script>
<style lang="scss" scoped>
.ordinary{
  padding: 0.38rem 0;
  background-color: white;
  .item{
    padding: 0 0.44rem;
    font-size:0.34rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(34,34,34,1);
    line-height:0.46rem;
    display: flex;
    // align-items: center;
    span{
      margin-left: 0.44rem;
    }
    p{
      margin-top: 0.16rem;
      font-size:0.28rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(119,119,119,1);
      line-height: 1;
    }
  }
  .icon {
    font-size: 0.46rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .intro{
    margin-top: 1rem;
    padding: 0.4rem 0.44rem;
    border-top: 0.01rem solid #e8e8e8;
    .distr{
      font-size:0.32rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(34,34,34,1);
      padding-bottom: 0.03rem;
      line-height: 1;
    }
    .ul{
      display: flex;
      justify-content: flex-start;
      .li{
        div{
          display: flex;
          align-items: center;
          margin-top: 0.39rem;
          font-family:PingFangSC-Light;
          font-weight:300;
          color:rgba(34,34,34,1);
          span{
            line-height: 1;
            font-size:0.3rem;
          }
          .iconfont{
            margin-right: 0.1rem;
            font-size: 0.24rem;
          }
        }
      }
      .li:nth-child(2){
        margin-left: 0.45rem;
      }
    }
  }
}

</style>
